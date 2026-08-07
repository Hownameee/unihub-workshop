package com.github.hownameee.gateway.ratelimit;

import java.util.List;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class RedisUserRateLimiterTest {

    private static final double NOW_MS = 1_700_000_000_000D;

    @Test
    void createsOneClusterCompatibleKeyPerUserBucket() {
        List<String> keys = RedisUserRateLimiter.bucketKeys("keycloak-user-123");

        assertThat(keys).containsExactly("gateway:rate-limit:{a2V5Y2xvYWstdXNlci0xMjM}");
    }

    @Test
    void decodesAllowedAndRejectedScriptResults() {
        assertThat(RedisUserRateLimiter.rateLimitDecision(19))
                .isEqualTo(new RateLimitDecision(true, 19));
        assertThat(RedisUserRateLimiter.rateLimitDecision(-1))
                .isEqualTo(new RateLimitDecision(false, 0));
        assertThat(RedisUserRateLimiter.rateLimitDecision(-3))
                .isEqualTo(new RateLimitDecision(false, 2));
    }

    @Test
    void permitsTheConfiguredBurstThenRejectsUntilTheNextEmissionInterval() {
        GcraReference limiter = new GcraReference(10, 20, 1);

        for (int request = 0; request < 20; request++) {
            assertThat(limiter.tryConsume(NOW_MS))
                    .isEqualTo(new RateLimitDecision(true, 19L - request));
        }

        assertThat(limiter.tryConsume(NOW_MS)).isEqualTo(new RateLimitDecision(false, 0));
        assertThat(limiter.tryConsume(NOW_MS + 99)).isEqualTo(new RateLimitDecision(false, 0));
        assertThat(limiter.tryConsume(NOW_MS + 100)).isEqualTo(new RateLimitDecision(true, 0));
    }

    @Test
    void restoresTheBurstAfterAnIdlePeriod() {
        GcraReference limiter = new GcraReference(10, 20, 1);

        for (int request = 0; request < 20; request++) {
            limiter.tryConsume(NOW_MS);
        }

        assertThat(limiter.tryConsume(NOW_MS + 3_000)).isEqualTo(new RateLimitDecision(true, 19));
    }

    private static final class GcraReference {

        private final double emissionIntervalMs;
        private final double delayToleranceMs;
        private final int requestedTokens;
        private double tat = Double.NaN;

        private GcraReference(int rate, int capacity, int requestedTokens) {
            emissionIntervalMs = 1_000D / rate;
            delayToleranceMs = capacity * emissionIntervalMs;
            this.requestedTokens = requestedTokens;
        }

        private RateLimitDecision tryConsume(double nowMs) {
            double previousTat = Double.isNaN(tat) ? nowMs : tat;
            double newTat = Math.max(nowMs, previousTat) + requestedTokens * emissionIntervalMs;
            if (newTat - delayToleranceMs > nowMs) {
                long remainingTokens =
                        Math.max(
                                0,
                                (long)
                                        Math.floor(
                                                (nowMs
                                                                - Math.max(
                                                                        0,
                                                                        previousTat
                                                                                - delayToleranceMs))
                                                        / emissionIntervalMs));
                return new RateLimitDecision(false, remainingTokens);
            }

            tat = newTat;
            long remainingTokens =
                    Math.max(
                            0,
                            (long)
                                    Math.floor(
                                            (nowMs - Math.max(0, newTat - delayToleranceMs))
                                                    / emissionIntervalMs));
            return new RateLimitDecision(true, remainingTokens);
        }
    }
}
