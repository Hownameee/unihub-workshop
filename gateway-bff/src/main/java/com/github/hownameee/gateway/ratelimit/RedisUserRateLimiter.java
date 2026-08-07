package com.github.hownameee.gateway.ratelimit;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.stereotype.Service;

import com.github.hownameee.gateway.config.RateLimitConfig;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RedisUserRateLimiter {

    private static final DefaultRedisScript<Long> RATE_LIMIT_SCRIPT = createRateLimitScript();

    private final StringRedisTemplate redisTemplate;
    private final RateLimitConfig properties;

    public RateLimitDecision tryConsume(String subject) {
        Long scriptResult =
                redisTemplate.execute(
                        RATE_LIMIT_SCRIPT,
                        bucketKeys(subject),
                        String.valueOf(properties.getReplenishRate()),
                        String.valueOf(properties.getBurstCapacity()),
                        String.valueOf(properties.getRequestedTokens()));

        if (scriptResult == null) {
            throw new IllegalStateException("Redis rate-limit script returned no result");
        }
        return rateLimitDecision(scriptResult);
    }

    static RateLimitDecision rateLimitDecision(long scriptResult) {
        if (scriptResult >= 0) {
            return new RateLimitDecision(true, scriptResult);
        }
        return new RateLimitDecision(false, -scriptResult - 1);
    }

    static List<String> bucketKeys(String subject) {
        String encodedSubject =
                Base64.getUrlEncoder()
                        .withoutPadding()
                        .encodeToString(subject.getBytes(StandardCharsets.UTF_8));
        String bucket = "gateway:rate-limit:{" + encodedSubject + "}";
        return List.of(bucket);
    }

    private static DefaultRedisScript<Long> createRateLimitScript() {
        DefaultRedisScript<Long> script = new DefaultRedisScript<>();
        script.setScriptText(
                """
                local tatKey = KEYS[1]
                local rate = tonumber(ARGV[1])
                local capacity = tonumber(ARGV[2])
                local requestedTokens = tonumber(ARGV[3])
                local time = redis.call('TIME')
                local now = tonumber(time[1]) * 1000 + tonumber(time[2]) / 1000
                local emissionIntervalMs = 1000.0 / rate
                local delayToleranceMs = capacity * emissionIntervalMs
                local tat = tonumber(redis.call('GET', tatKey)) or now
                local newTat = math.max(now, tat) + requestedTokens * emissionIntervalMs
                local allowAt = newTat - delayToleranceMs

                if allowAt > now then
                  local remainingTokens = math.max(0, math.floor(
                    (now - math.max(0, tat - delayToleranceMs)) / emissionIntervalMs))
                  return -(remainingTokens + 1)
                end

                local remainingTokens = math.max(0, math.floor(
                  (now - math.max(0, newTat - delayToleranceMs)) / emissionIntervalMs))
                local ttl = math.max(1, math.ceil((newTat - now) / 1000))
                redis.call('SETEX', tatKey, ttl, newTat)
                return remainingTokens
                """);
        script.setResultType(Long.class);
        return script;
    }
}
