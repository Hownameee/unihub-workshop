package com.github.hownameee.backend.repositories;

import java.time.OffsetDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.github.hownameee.backend.entities.RegistrationEntity;
import com.github.hownameee.backend.entities.enums.RegistrationPaymentStatus;

@Repository
public interface RegistrationRepository
        extends JpaRepository<RegistrationEntity, Long> {
    List<RegistrationEntity>
            findAllByPaymentStatusAndCreatedAtBeforeAndDeletedAtIsNull(
            RegistrationPaymentStatus paymentStatus,
            OffsetDateTime threshold
    );
}
