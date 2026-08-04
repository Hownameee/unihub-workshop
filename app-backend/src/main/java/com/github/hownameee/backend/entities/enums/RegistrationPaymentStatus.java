package com.github.hownameee.backend.entities.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum RegistrationPaymentStatus {
    PENDING("Pending"),
    PAID("Paid"),
    FAILED("Failed"),
    CANCELLED("Cancelled");

    private final String name;
}
