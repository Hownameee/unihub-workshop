package com.github.hownameee.backend.dtos.workshop;

import java.time.OffsetDateTime;

public record WorkshopResponse(
        Long workshopId,
        String title,
        String description,
        String coverImageUrl,
        Integer totalCapacity,
        Integer registeredSeats,
        OffsetDateTime registrationStartAt,
        OffsetDateTime registrationEndAt,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt) {}
