package com.github.hownameee.backend.entities;

import java.time.OffsetDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import com.github.hownameee.backend.utils.TimeUtils;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private OffsetDateTime createdAt = TimeUtils.now();

    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt = TimeUtils.now();

    @Column(name = "deleted_at")
    private OffsetDateTime deletedAt;

    public boolean isRegistrationOpen() {
        OffsetDateTime now = TimeUtils.now();
        return now.isAfter(this.registrationStartAt)
                && now.isBefore(this.registrationEndAt);
    }
}
