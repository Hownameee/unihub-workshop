package com.github.hownameee.backend.exceptions;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.github.hownameee.backend.dtos.ErrorResponse;
import com.github.hownameee.backend.utils.TimeUtils;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice
@Slf4j
@AllArgsConstructor
public class GlobalExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleEntityNotFound(
            EntityNotFoundException ex, HttpServletRequest request) {
        log.warn(
                "[404 Not Found] Resource not found at {} {}. Details: {}",
                request.getMethod(),
                request.getRequestURI(),
                ex.getMessage());

        return buildError(
                HttpStatus.NOT_FOUND, "Resource Not Found", "resource_not_found", ex.getMessage());
    }

    @ExceptionHandler(RegistrationNotOpenException.class)
    public ResponseEntity<ErrorResponse> handleRegistrationNotOpen(
            RegistrationNotOpenException ex, HttpServletRequest request) {
        log.warn(
                "[409 Conflict] Registration is not open at {} {}. Details: {}",
                request.getMethod(),
                request.getRequestURI(),
                ex.getMessage());

        return buildError(
                HttpStatus.CONFLICT,
                "Registration Not Open",
                "registration_not_open",
                ex.getMessage());
    }

    @ExceptionHandler(WorkshopFullException.class)
    public ResponseEntity<ErrorResponse> handleWorkshopFull(
            WorkshopFullException ex, HttpServletRequest request) {
        log.warn(
                "[409 Conflict] Workshop is full at {} {}. Details: {}",
                request.getMethod(),
                request.getRequestURI(),
                ex.getMessage());

        return buildError(HttpStatus.CONFLICT, "Workshop Full", "workshop_full", ex.getMessage());
    }

    private ResponseEntity<ErrorResponse> buildError(
            HttpStatus status, String error, String code, String message) {
        ErrorResponse response = new ErrorResponse(TimeUtils.now(), error, code, message);

        return ResponseEntity.status(status).body(response);
    }
}
