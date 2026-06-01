package com.github.hownameee.backend.services;

import com.github.hownameee.backend.dtos.WorkshopRequest;
import com.github.hownameee.backend.dtos.WorkshopResponse;
import com.github.hownameee.backend.entities.WorkshopEntity;
import com.github.hownameee.backend.repositories.WorkshopRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkshopService {

    private final WorkshopRepository workshopRepository;

    public WorkshopService(WorkshopRepository workshopRepository) {
        this.workshopRepository = workshopRepository;
    }

    @Transactional(readOnly = true)
    public List<WorkshopResponse> getAllWorkshops() {
        return workshopRepository.findAllByDeletedAtIsNull().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public WorkshopResponse getWorkshopById(Long id) {
        WorkshopEntity entity = workshopRepository.findById(id)
                .filter(w -> w.getDeletedAt() == null)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Workshop not found"));
        return mapToResponse(entity);
    }

    @Transactional
    public WorkshopResponse createWorkshop(WorkshopRequest request) {
        WorkshopEntity entity = new WorkshopEntity();
        entity.setTitle(request.title());
        entity.setDescription(request.description());
        entity.setCoverImageUrl(request.coverImageUrl());
        entity.setTotalCapacity(request.totalCapacity());
        entity.setRegisteredSeats(0);

        WorkshopEntity saved = workshopRepository.save(entity);
        return mapToResponse(saved);
    }

    @Transactional
    public WorkshopResponse updateWorkshop(Long id, WorkshopRequest request) {
        WorkshopEntity entity = workshopRepository.findById(id)
                .filter(w -> w.getDeletedAt() == null)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Workshop not found"));

        entity.setTitle(request.title());
        entity.setDescription(request.description());
        entity.setCoverImageUrl(request.coverImageUrl());
        entity.setTotalCapacity(request.totalCapacity());
        entity.setUpdatedAt(OffsetDateTime.now());

        WorkshopEntity updated = workshopRepository.save(entity);
        return mapToResponse(updated);
    }

    @Transactional
    public void deleteWorkshop(Long id) {
        WorkshopEntity entity = workshopRepository.findById(id)
                .filter(w -> w.getDeletedAt() == null)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Workshop not found"));

        entity.setDeletedAt(OffsetDateTime.now());
        workshopRepository.save(entity);
    }

    private WorkshopResponse mapToResponse(WorkshopEntity entity) {
        return new WorkshopResponse(
                entity.getWorkshopId(),
                entity.getTitle(),
                entity.getDescription(),
                entity.getCoverImageUrl(),
                entity.getTotalCapacity(),
                entity.getRegisteredSeats(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }
}
