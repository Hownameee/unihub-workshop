package com.github.hownameee.backend.dtos;

import java.util.UUID;

public record RegistrationRequest(
    Long workshopId,
    UUID userId,
    String fullName,
    String email
) {}
