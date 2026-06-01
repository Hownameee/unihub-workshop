package com.github.hownameee.backend.repositories;

import com.github.hownameee.backend.entities.WorkshopEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkshopRepository extends JpaRepository<WorkshopEntity, Long> {
    List<WorkshopEntity> findAllByDeletedAtIsNull();
}
