package com.github.hownameee.backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.github.hownameee.backend.entities.WorkshopEntity;

@Repository
public interface WorkshopRepository
        extends JpaRepository<WorkshopEntity, Long> {
    List<WorkshopEntity> findAllByDeletedAtIsNull();

    Optional<WorkshopEntity> findByWorkshopId(Long workshopId);
}
