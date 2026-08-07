package com.github.hownameee.gateway.routes;

import java.net.URI;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

import com.github.hownameee.gateway.config.RateLimitConfig;
import com.github.hownameee.gateway.ratelimit.UserRateLimitFilter;

import static org.springframework.cloud.gateway.server.mvc.filter.BeforeFilterFunctions.uri;
import static org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions.route;
import static org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions.http;
import static org.springframework.web.servlet.function.RequestPredicates.path;

@Configuration
@EnableConfigurationProperties(RateLimitConfig.class)
public class GatewayRoutesConfig {

    @Bean
    RouterFunction<ServerResponse> backendRoute(
            @Value("${BACKEND_SERVICE_URL}") URI backendServiceUri,
            UserRateLimitFilter userRateLimitFilter) {
        return route("backend-service")
                .route(path("/api/**"), http())
                .before(uri(backendServiceUri))
                .filter(userRateLimitFilter)
                .build();
    }
}
