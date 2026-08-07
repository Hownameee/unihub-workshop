package com.github.hownameee.gateway.config;

import jakarta.annotation.PostConstruct;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ConfigurationProperties("app.gateway.rate-limit")
public class RateLimitConfig {

    private int replenishRate;
    private int burstCapacity;
    private int requestedTokens;

    @PostConstruct
    void validateRateLimitConfiguration() {
        if (burstCapacity < replenishRate) {
            throw new IllegalArgumentException(
                    "burstCapacity must be greater than or equal to replenishRate");
        }
        if (requestedTokens > burstCapacity) {
            throw new IllegalArgumentException("requestedTokens must not exceed burstCapacity");
        }
    }
}
