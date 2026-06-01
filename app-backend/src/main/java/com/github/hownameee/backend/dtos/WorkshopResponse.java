package com.github.hownameee.backend.dtos;

import java.time.OffsetDateTime;

public record WorkshopResponse(
    Long workshopId,
    String title,
    String description,
    String coverImageUrl,
    Integer totalCapacity,
    Integer registeredSeats,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt
) {}
