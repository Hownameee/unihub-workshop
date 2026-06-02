package com.github.hownameee.backend.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.hownameee.backend.dtos.WorkshopCacheDto;
import com.github.hownameee.backend.entities.RegistrationEntity;
import com.github.hownameee.backend.entities.WorkshopEntity;
import com.github.hownameee.backend.entities.enums.RegistrationPaymentStatus;
import com.github.hownameee.backend.repositories.RegistrationRepository;
import com.github.hownameee.backend.repositories.WorkshopRepository;

import org.springframework.context.annotation.Lazy;

@Service
public class RegistrationService {
    @Autowired
    private RegistrationRepository registrationRepository;

    @Autowired
    private WorkshopRepository workshopRepository;

    @Autowired
    private RedisService redisService;

    @Autowired
    @Lazy
    private RegistrationService self;

    @Transactional
    public RegistrationEntity registerWorkshop(Long workshopId, UUID userId, String fullName, String email) {
        // self for Proxy of Spring Cache
        WorkshopCacheDto workshopCache = self.getWorkshopFromCache(workshopId);
        if (workshopCache == null) {
            throw new IllegalArgumentException("Workshop not found");
        }

        if (!workshopCache.isRegistrationOpen()) {
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

    @Cacheable(value = "workshops", key = "#workshopId", unless = "#result == null")
    public WorkshopCacheDto getWorkshopFromCache(Long workshopId) {
        return workshopRepository.findById(workshopId)
                .map(w -> new WorkshopCacheDto(
                        w.getWorkshopId(),
                        w.getTotalCapacity(),
                        w.getRegistrationStartAt(),
                        w.getRegistrationEndAt()))
                .orElse(null);
    }
}
