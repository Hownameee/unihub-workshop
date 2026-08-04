package com.github.hownameee.backend.entities.enums;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum PaymentTransactionStatus {
    PENDING("Pending"),
    SUCCESS("Success"),
    FAILED("Failed"),
    REFUNDED("Refunded");

    private final String name;
}
