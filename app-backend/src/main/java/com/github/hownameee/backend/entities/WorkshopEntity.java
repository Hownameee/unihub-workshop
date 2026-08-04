package com.github.hownameee.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;

@Entity
@Table(name = "workshops")
@Getter
@Setter
@NoArgsConstructor
public class WorkshopEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "workshop_id")
    private Long workshopId;

    @Column(nullable = false, length = 128)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "cover_image_url", columnDefinition = "TEXT")
    private String coverImageUrl;

    @Column(name = "total_capacity", nullable = false)
    private Integer totalCapacity;

    @Column(name = "registered_seats", nullable = false)
    private Integer registeredSeats = 0;

    @Column(name = "registration_start_at", nullable = false)
    private OffsetDateTime registrationStartAt;

    @Column(name = "registration_end_at", nullable = false)
    private OffsetDateTime registrationEndAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt = OffsetDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt = OffsetDateTime.now();

    @Column(name = "deleted_at")
    private OffsetDateTime deletedAt;

    public boolean isRegistrationOpen() {
        OffsetDateTime now = OffsetDateTime.now();
        return now.isAfter(this.registrationStartAt) && now.isBefore(this.registrationEndAt);
    }
}
