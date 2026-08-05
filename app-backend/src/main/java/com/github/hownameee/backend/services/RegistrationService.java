package com.github.hownameee.backend.services;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.hownameee.backend.entities.RegistrationEntity;
import com.github.hownameee.backend.entities.WorkshopEntity;
import com.github.hownameee.backend.entities.enums.RegistrationPaymentStatus;
import com.github.hownameee.backend.exceptions.RegistrationNotOpenException;
import com.github.hownameee.backend.exceptions.WorkshopFullException;
import com.github.hownameee.backend.repositories.RegistrationRepository;
import com.github.hownameee.backend.repositories.WorkshopRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RegistrationService {
    final private RegistrationRepository registrationRepository;
    final private WorkshopRepository workshopRepository;
    final private RedisService redisService;

    @Transactional
    public RegistrationEntity registerWorkshop(
            Long workshopId, UUID userId, String fullName, String email) {
        WorkshopEntity workshop =
                workshopRepository.findByWorkshopId(workshopId)
                        .orElseThrow(() -> new IllegalArgumentException(
                                "Workshop not found"));

        if (!workshop.isRegistrationOpen()) {
            throw new RegistrationNotOpenException(workshopId);
        }

        boolean reserved = redisService.reserveSlot(workshopId, userId);
        if (!reserved) {
            throw new WorkshopFullException(workshopId);
        }

        WorkshopEntity workshopRef =
                workshopRepository.getReferenceById(workshopId);

        RegistrationEntity registration = new RegistrationEntity();
        registration.setUserId(userId);
        registration.setWorkshop(workshopRef);
        registration.setFullName(fullName);
        registration.setEmail(email);
        registration.setPaymentStatus(RegistrationPaymentStatus.PENDING);

        return registrationRepository.save(registration);
    }

}
