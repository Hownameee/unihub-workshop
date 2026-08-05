package com.github.hownameee.backend.dtos.registration;

import java.time.OffsetDateTime;
import java.util.UUID;

import com.github.hownameee.backend.entities.enums.RegistrationPaymentStatus;

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
