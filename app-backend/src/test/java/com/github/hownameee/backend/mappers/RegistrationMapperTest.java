package com.github.hownameee.backend.mappers;

import java.time.OffsetDateTime;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import com.github.hownameee.backend.dtos.RegistrationResponse;
import com.github.hownameee.backend.entities.RegistrationEntity;
import com.github.hownameee.backend.entities.WorkshopEntity;
import com.github.hownameee.backend.entities.enums.RegistrationPaymentStatus;

import static org.assertj.core.api.Assertions.assertThat;

class RegistrationMapperTest {

    private static final OffsetDateTime CREATED_AT =
            OffsetDateTime.parse("2026-08-01T09:00:00+07:00");
    private static final OffsetDateTime UPDATED_AT =
            OffsetDateTime.parse("2026-08-04T09:00:00+07:00");

    private final RegistrationMapper mapper =
            Mappers.getMapper(RegistrationMapper.class);

    @Test
    void mapsRegistrationEntityToResponseWithWorkshopId() {
        UUID userId = UUID.fromString("123e4567-e89b-12d3-a456-426614174000");
        WorkshopEntity workshop = new WorkshopEntity();
        workshop.setWorkshopId(10L);

        RegistrationEntity entity = new RegistrationEntity();
        entity.setRegistrationId(20L);
        entity.setWorkshop(workshop);
        entity.setUserId(userId);
        entity.setFullName("Nam Nguyen");
        entity.setEmail("nam@example.com");
        entity.setPaymentStatus(RegistrationPaymentStatus.PENDING);
        entity.setCreatedAt(CREATED_AT);
        entity.setUpdatedAt(UPDATED_AT);

        RegistrationResponse response = mapper.toResponse(entity);

        assertThat(response).isEqualTo(new RegistrationResponse(
                20L,
                10L,
                userId,
                "Nam Nguyen",
                "nam@example.com",
                RegistrationPaymentStatus.PENDING,
                CREATED_AT,
                UPDATED_AT));
    }
}
