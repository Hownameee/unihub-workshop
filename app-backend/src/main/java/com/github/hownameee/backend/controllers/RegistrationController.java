package com.github.hownameee.backend.controllers;

import com.github.hownameee.backend.dtos.RegistrationRequest;
import com.github.hownameee.backend.dtos.RegistrationResponse;
import com.github.hownameee.backend.entities.RegistrationEntity;
import com.github.hownameee.backend.services.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/registrations")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @PostMapping
    public ResponseEntity<RegistrationResponse> register(@RequestBody RegistrationRequest request) {
        try {
            RegistrationEntity entity = registrationService.registerWorkshop(
                    request.workshopId(),
                    request.userId(),
                    request.fullName(),
                    request.email()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(mapToResponse(entity));
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (IllegalStateException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }
    }

    private RegistrationResponse mapToResponse(RegistrationEntity entity) {
        return new RegistrationResponse(
                entity.getRegistrationId(),
                entity.getWorkshop().getWorkshopId(),
                entity.getUserId(),
                entity.getFullName(),
                entity.getEmail(),
                entity.getPaymentStatus(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }
}
