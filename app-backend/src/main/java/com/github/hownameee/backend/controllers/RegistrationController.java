package com.github.hownameee.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.hownameee.backend.dtos.registration.RegistrationRequest;
import com.github.hownameee.backend.dtos.registration.RegistrationResponse;
import com.github.hownameee.backend.entities.RegistrationEntity;
import com.github.hownameee.backend.mappers.RegistrationMapper;
import com.github.hownameee.backend.services.RegistrationService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/registrations")
@AllArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;
    private final RegistrationMapper registrationMapper;

    @PostMapping
    public ResponseEntity<RegistrationResponse> register(@RequestBody RegistrationRequest request) {
        RegistrationEntity entity =
                registrationService.registerWorkshop(
                        request.workshopId(),
                        request.userId(),
                        request.fullName(),
                        request.email());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(registrationMapper.toResponse(entity));
    }
}
