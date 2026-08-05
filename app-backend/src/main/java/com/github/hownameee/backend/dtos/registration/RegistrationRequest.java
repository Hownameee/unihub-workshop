package com.github.hownameee.backend.dtos.registration;

import java.util.UUID;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record RegistrationRequest(
        @NotNull(message = "workshopId is required")
                @Positive(message = "workshopId must be positive")
                Long workshopId,
        @NotNull(message = "userId is required") UUID userId,
        @NotBlank(message = "fullName is required")
                @Size(max = 255, message = "fullName must not exceed 255 characters")
                String fullName,
        @NotBlank(message = "email is required")
                @Email(message = "email must be valid")
                @Size(max = 100, message = "email must not exceed 100 characters")
                String email) {}
