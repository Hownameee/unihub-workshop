package com.github.hownameee.gateway.ratelimit;

import java.security.Principal;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.function.HandlerFilterFunction;
import org.springframework.web.servlet.function.HandlerFunction;
import org.springframework.web.servlet.function.ServerRequest;
import org.springframework.web.servlet.function.ServerResponse;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class UserRateLimitFilter implements HandlerFilterFunction<ServerResponse, ServerResponse> {

    private static final String REMAINING_TOKENS_HEADER = "X-RateLimit-Remaining";

    private final RedisUserRateLimiter rateLimiter;

    @Override
    public ServerResponse filter(ServerRequest request, HandlerFunction<ServerResponse> next)
            throws Exception {
        Principal principal = request.servletRequest().getUserPrincipal();
        if (!(principal instanceof JwtAuthenticationToken jwtAuthentication)) {
            return ServerResponse.status(HttpStatus.UNAUTHORIZED).build();
        }

        String subject = jwtAuthentication.getToken().getSubject();
        if (!StringUtils.hasText(subject)) {
            return ServerResponse.status(HttpStatus.FORBIDDEN).build();
        }

        RateLimitDecision decision;
        try {
            decision = rateLimiter.tryConsume(subject);
        } catch (DataAccessException | IllegalStateException ex) {
            return ServerResponse.status(HttpStatus.SERVICE_UNAVAILABLE).build();
        }

        if (!decision.allowed()) {
            return ServerResponse.status(HttpStatus.TOO_MANY_REQUESTS)
                    .header(REMAINING_TOKENS_HEADER, String.valueOf(decision.remainingTokens()))
                    .build();
        }

        return next.handle(request);
    }
}
