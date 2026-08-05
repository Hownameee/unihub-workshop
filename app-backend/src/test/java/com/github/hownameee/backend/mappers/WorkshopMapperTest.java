package com.github.hownameee.backend.mappers;

import java.time.OffsetDateTime;

import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import com.github.hownameee.backend.dtos.workshop.WorkshopRequest;
import com.github.hownameee.backend.dtos.workshop.WorkshopResponse;
import com.github.hownameee.backend.entities.WorkshopEntity;

import static org.assertj.core.api.Assertions.assertThat;

class WorkshopMapperTest {

    private static final OffsetDateTime REGISTRATION_START =
            OffsetDateTime.parse("2026-08-05T09:00:00+07:00");
    private static final OffsetDateTime REGISTRATION_END =
            OffsetDateTime.parse("2026-08-05T17:00:00+07:00");
    private static final OffsetDateTime CREATED_AT =
            OffsetDateTime.parse("2026-08-01T09:00:00+07:00");
    private static final OffsetDateTime UPDATED_AT =
            OffsetDateTime.parse("2026-08-04T09:00:00+07:00");
    private static final OffsetDateTime DELETED_AT =
            OffsetDateTime.parse("2026-08-04T10:00:00+07:00");

    private final WorkshopMapper mapper = Mappers.getMapper(WorkshopMapper.class);

    @Test
    void mapsEntityToResponse() {
        WorkshopEntity entity = new WorkshopEntity();
        entity.setWorkshopId(10L);
        entity.setTitle("Spring Workshop");
        entity.setDescription("Learn Spring");
        entity.setCoverImageUrl("https://example.com/cover.png");
        entity.setTotalCapacity(50);
        entity.setRegisteredSeats(12);
        entity.setRegistrationStartAt(REGISTRATION_START);
        entity.setRegistrationEndAt(REGISTRATION_END);
        entity.setCreatedAt(CREATED_AT);
        entity.setUpdatedAt(UPDATED_AT);

        WorkshopResponse response = mapper.toResponse(entity);

        assertThat(response)
                .isEqualTo(
                        new WorkshopResponse(
                                10L,
                                "Spring Workshop",
                                "Learn Spring",
                                "https://example.com/cover.png",
                                50,
                                12,
                                REGISTRATION_START,
                                REGISTRATION_END,
                                CREATED_AT,
                                UPDATED_AT));
    }

    @Test
    void mapsRequestToNewEntityWithoutOverwritingLifecycleFields() {
        WorkshopEntity entity = mapper.toEntity(workshopRequest());

        assertThat(entity.getWorkshopId()).isNull();
        assertThat(entity.getTitle()).isEqualTo("Spring Workshop");
        assertThat(entity.getDescription()).isEqualTo("Learn Spring");
        assertThat(entity.getCoverImageUrl()).isEqualTo("https://example.com/cover.png");
        assertThat(entity.getTotalCapacity()).isEqualTo(50);
        assertThat(entity.getRegistrationStartAt()).isEqualTo(REGISTRATION_START);
        assertThat(entity.getRegistrationEndAt()).isEqualTo(REGISTRATION_END);
        assertThat(entity.getRegisteredSeats()).isZero();
        assertThat(entity.getCreatedAt()).isNotNull();
        assertThat(entity.getUpdatedAt()).isNotNull();
        assertThat(entity.getDeletedAt()).isNull();
    }

    @Test
    void updatesOnlyRequestOwnedFields() {
        WorkshopEntity entity = new WorkshopEntity();
        entity.setWorkshopId(10L);
        entity.setRegisteredSeats(12);
        entity.setCreatedAt(CREATED_AT);
        entity.setUpdatedAt(UPDATED_AT);
        entity.setDeletedAt(DELETED_AT);

        mapper.updateEntity(workshopRequest(), entity);

        assertThat(entity.getWorkshopId()).isEqualTo(10L);
        assertThat(entity.getRegisteredSeats()).isEqualTo(12);
        assertThat(entity.getCreatedAt()).isEqualTo(CREATED_AT);
        assertThat(entity.getUpdatedAt()).isEqualTo(UPDATED_AT);
        assertThat(entity.getDeletedAt()).isEqualTo(DELETED_AT);
        assertThat(entity.getTitle()).isEqualTo("Spring Workshop");
        assertThat(entity.getDescription()).isEqualTo("Learn Spring");
        assertThat(entity.getCoverImageUrl()).isEqualTo("https://example.com/cover.png");
        assertThat(entity.getTotalCapacity()).isEqualTo(50);
        assertThat(entity.getRegistrationStartAt()).isEqualTo(REGISTRATION_START);
        assertThat(entity.getRegistrationEndAt()).isEqualTo(REGISTRATION_END);
    }

    private WorkshopRequest workshopRequest() {
        return new WorkshopRequest(
                "Spring Workshop",
                "Learn Spring",
                "https://example.com/cover.png",
                50,
                REGISTRATION_START,
                REGISTRATION_END);
    }
}
