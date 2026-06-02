package com.github.hownameee.backend.dtos;

import java.io.Serializable;
import java.time.OffsetDateTime;

public record WorkshopCacheDto(
        Long workshopId,
        Integer totalCapacity,
        OffsetDateTime registrationStartAt,
        OffsetDateTime registrationEndAt) implements Serializable {

    public boolean isRegistrationOpen() {
        OffsetDateTime now = OffsetDateTime.now();
        return now.isAfter(registrationStartAt) && now.isBefore(registrationEndAt);
    }
}
