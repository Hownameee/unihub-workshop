package com.github.hownameee.gateway.ratelimit;

public record RateLimitDecision(boolean allowed, long remainingTokens) {}
