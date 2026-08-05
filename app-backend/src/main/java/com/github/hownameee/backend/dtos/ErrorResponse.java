package com.github.hownameee.backend.dtos;

import java.time.OffsetDateTime;

public record ErrorResponse(
        OffsetDateTime timestamp,
        String error,
        String code,
        String message
        ) {}
