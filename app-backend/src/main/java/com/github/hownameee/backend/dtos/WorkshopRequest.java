package com.github.hownameee.backend.dtos;

import java.time.OffsetDateTime;

public record WorkshopRequest(
    String title,
    String description,
    String coverImageUrl,
    Integer totalCapacity,
    OffsetDateTime registrationStartAt,
    OffsetDateTime registrationEndAt
) {}
