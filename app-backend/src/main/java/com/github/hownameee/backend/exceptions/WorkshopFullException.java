package com.github.hownameee.backend.exceptions;

public final class WorkshopFullException extends RuntimeException {

    public WorkshopFullException(Long workshopId) {
        super("Workshop is full: " + workshopId);
    }
}
