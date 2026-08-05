package com.github.hownameee.backend.services;

import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.hownameee.backend.entities.RegistrationEntity;
import com.github.hownameee.backend.entities.WorkshopEntity;
import com.github.hownameee.backend.entities.enums.RegistrationPaymentStatus;
import com.github.hownameee.backend.exceptions.RegistrationNotOpenException;
import com.github.hownameee.backend.exceptions.WorkshopFullException;
import com.github.hownameee.backend.repositories.RegistrationRepository;
import com.github.hownameee.backend.repositories.WorkshopRepository;
import com.github.hownameee.backend.repositories.WorkshopSlotRedisRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RegistrationService {
    private final RegistrationRepository registrationRepository;
    private final WorkshopRepository workshopRepository;
    private final WorkshopSlotRedisRepository workshopSlotRedisRepository;

    @Transactional
    public RegistrationEntity registerWorkshop(
            Long workshopId, UUID userId, String fullName, String email) {
        WorkshopEntity workshop =
                workshopRepository
                        .findByWorkshopId(workshopId)
                        .filter(candidate -> candidate.getDeletedAt() == null)
                        .orElseThrow(() -> new EntityNotFoundException("Workshop not found"));

        if (!workshop.isRegistrationOpen()) {
            throw new RegistrationNotOpenException(workshopId);
        }

        boolean reserved = workshopSlotRedisRepository.reserveSlot(workshopId, userId);
        if (!reserved) {
            throw new WorkshopFullException(workshopId);
        }

        RegistrationEntity registration = new RegistrationEntity();
        registration.setUserId(userId);
        registration.setWorkshop(workshop);
        registration.setFullName(fullName);
        registration.setEmail(email);
        registration.setPaymentStatus(RegistrationPaymentStatus.PENDING);

        return registrationRepository.save(registration);
    }
}
