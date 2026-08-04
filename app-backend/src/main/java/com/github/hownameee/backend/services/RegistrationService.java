package com.github.hownameee.backend.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.hownameee.backend.entities.RegistrationEntity;
import com.github.hownameee.backend.entities.WorkshopEntity;
import com.github.hownameee.backend.entities.enums.RegistrationPaymentStatus;
import com.github.hownameee.backend.repositories.RegistrationRepository;
import com.github.hownameee.backend.repositories.WorkshopRepository;

@Service
public class RegistrationService {
    final private RegistrationRepository registrationRepository;
    final private WorkshopRepository workshopRepository;
    final private RedisService redisService;

    @Autowired
    public RegistrationService(RegistrationRepository registrationRepository, WorkshopRepository workshopRepository, RedisService redisService) {
        this.redisService = redisService;
        this.registrationRepository = registrationRepository;
        this.workshopRepository = workshopRepository;
    }

    @Transactional
    public RegistrationEntity registerWorkshop(Long workshopId, UUID userId, String fullName, String email) {
        WorkshopEntity workshop = workshopRepository.findByWorkshopId(workshopId)
                .orElseThrow(() -> new IllegalArgumentException("Workshop not found"));

        if (!workshop.isRegistrationOpen()) {
            throw new IllegalArgumentException("Registration is not open");
        }

        boolean reserved = redisService.reserveSlot(workshopId, userId);
        if (!reserved) {
            throw new IllegalArgumentException("Registration is full");
        }

        WorkshopEntity workshopRef = workshopRepository.getReferenceById(workshopId);

        RegistrationEntity registration = new RegistrationEntity();
        registration.setUserId(userId);
        registration.setWorkshop(workshopRef);
        registration.setFullName(fullName);
        registration.setEmail(email);
        registration.setPaymentStatus(RegistrationPaymentStatus.PENDING);

        return registrationRepository.save(registration);
    }

}
