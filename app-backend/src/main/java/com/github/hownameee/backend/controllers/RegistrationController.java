package com.github.hownameee.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.github.hownameee.backend.dtos.RegistrationRequest;
import com.github.hownameee.backend.dtos.RegistrationResponse;
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
    public ResponseEntity<RegistrationResponse> register(
            @RequestBody RegistrationRequest request) {
        try {
            RegistrationEntity entity = registrationService.registerWorkshop(
                    request.workshopId(),
                    request.userId(),
                    request.fullName(),
                    request.email()
            );
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(registrationMapper.toResponse(entity));
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (IllegalStateException e) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, e.getMessage());
        }
    }

}
