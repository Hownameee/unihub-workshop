package com.github.hownameee.backend.schedulers;

import com.github.hownameee.backend.entities.RegistrationEntity;
import com.github.hownameee.backend.entities.enums.RegistrationPaymentStatus;
import com.github.hownameee.backend.repositories.RegistrationRepository;
import com.github.hownameee.backend.services.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;

@Component
public class RegistrationCleanupScheduler {

    @Autowired
    private RegistrationRepository registrationRepository;

    @Autowired
    private RedisService redisService;

    @Scheduled(fixedRate = 5000) // Runs every 5 seconds
    @Transactional
    public void cleanupExpiredRegistrations() {
        OffsetDateTime threshold = OffsetDateTime.now().minusMinutes(15);
        List<RegistrationEntity> expiredRegistrations = registrationRepository
                .findAllByPaymentStatusAndCreatedAtBeforeAndDeletedAtIsNull(
                        RegistrationPaymentStatus.PENDING,
                        threshold);

        for (RegistrationEntity registration : expiredRegistrations) {
            // 1. Mark status as CANCELLED in Database
            registration.setPaymentStatus(RegistrationPaymentStatus.CANCELLED);
            registration.setUpdatedAt(OffsetDateTime.now());

            // 2. Release slots in Redis (reclaim slot counter and delete user locks)
            redisService.releaseSlot(registration.getWorkshop().getWorkshopId(), registration.getUserId());
        }
    }
}
