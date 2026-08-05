package com.github.hownameee.backend.exceptions;

public final class RegistrationNotOpenException extends RuntimeException {

    public RegistrationNotOpenException(Long workshopId) {
        super("Registration is not open for workshop: " + workshopId);
    }
}
