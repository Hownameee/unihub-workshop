package com.github.hownameee.backend.dtos;

import com.github.hownameee.backend.entities.enums.RegistrationPaymentStatus;
import java.time.OffsetDateTime;
import java.util.UUID;

public record RegistrationResponse(
    Long registrationId,
    Long workshopId,
    UUID userId,
    String fullName,
    String email,
    RegistrationPaymentStatus paymentStatus,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt
) {}
