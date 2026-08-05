package com.github.hownameee.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.hownameee.backend.dtos.workshop.WorkshopRequest;
import com.github.hownameee.backend.dtos.workshop.WorkshopResponse;
import com.github.hownameee.backend.entities.WorkshopEntity;
import com.github.hownameee.backend.mappers.WorkshopMapper;
import com.github.hownameee.backend.repositories.WorkshopRepository;
import com.github.hownameee.backend.repositories.WorkshopSlotRedisRepository;
import com.github.hownameee.backend.utils.TimeUtils;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class WorkshopService {

    private final WorkshopRepository workshopRepository;
    private final WorkshopSlotRedisRepository workshopSlotRedisRepository;
    private final WorkshopMapper workshopMapper;

    @Transactional(readOnly = true)
    public List<WorkshopResponse> getAllWorkshops() {
        return workshopRepository.findAllByDeletedAtIsNull().stream()
                .map(workshopMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public WorkshopResponse getWorkshopById(Long id) {
        WorkshopEntity entity =
                workshopRepository
                        .findByWorkshopId(id)
                        .filter(w -> w.getDeletedAt() == null)
                        .orElseThrow(() -> new EntityNotFoundException("Workshop not found"));
        return workshopMapper.toResponse(entity);
    }

    @Transactional
    public WorkshopResponse createWorkshop(WorkshopRequest request) {
        WorkshopEntity entity = workshopMapper.toEntity(request);
        entity.setRegisteredSeats(0);

        WorkshopEntity saved = workshopRepository.save(entity);

        workshopSlotRedisRepository.initializeSlots(
                saved.getWorkshopId(), saved.getTotalCapacity());

        return workshopMapper.toResponse(saved);
    }

    @Transactional
    public WorkshopResponse updateWorkshop(Long id, WorkshopRequest request) {
        WorkshopEntity entity =
                workshopRepository
                        .findByWorkshopId(id)
                        .filter(w -> w.getDeletedAt() == null)
                        .orElseThrow(() -> new EntityNotFoundException("Workshop not found"));

        workshopMapper.updateEntity(request, entity);
        entity.setUpdatedAt(TimeUtils.now());

        WorkshopEntity updated = workshopRepository.save(entity);

        int remainingSlots = updated.getTotalCapacity() - updated.getRegisteredSeats();
        workshopSlotRedisRepository.initializeSlots(updated.getWorkshopId(), remainingSlots);

        return workshopMapper.toResponse(updated);
    }

    @Transactional
    public void deleteWorkshop(Long id) {
        WorkshopEntity entity =
                workshopRepository
                        .findByWorkshopId(id)
                        .filter(w -> w.getDeletedAt() == null)
                        .orElseThrow(() -> new EntityNotFoundException("Workshop not found"));

        entity.setDeletedAt(TimeUtils.now());
        workshopRepository.save(entity);
    }
}
