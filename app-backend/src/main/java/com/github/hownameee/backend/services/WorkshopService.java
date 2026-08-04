package com.github.hownameee.backend.services;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.github.hownameee.backend.dtos.WorkshopRequest;
import com.github.hownameee.backend.dtos.WorkshopResponse;
import com.github.hownameee.backend.entities.WorkshopEntity;
import com.github.hownameee.backend.mappers.WorkshopMapper;
import com.github.hownameee.backend.repositories.WorkshopRepository;

@Service
public class WorkshopService {

    private final WorkshopRepository workshopRepository;
    private final RedisService redisService;
    private final WorkshopMapper workshopMapper;

    @Autowired
    public WorkshopService(
            WorkshopRepository workshopRepository,
            RedisService redisService,
            WorkshopMapper workshopMapper) {
        this.workshopRepository = workshopRepository;
        this.redisService = redisService;
        this.workshopMapper = workshopMapper;
    }

    @Transactional(readOnly = true)
    public List<WorkshopResponse> getAllWorkshops() {
        return workshopRepository.findAllByDeletedAtIsNull().stream()
                .map(workshopMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public WorkshopResponse getWorkshopById(Long id) {
        WorkshopEntity entity = workshopRepository.findByWorkshopId(id)
                .filter(w -> w.getDeletedAt() == null)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Workshop not found"));
        return workshopMapper.toResponse(entity);
    }

    @Transactional
    public WorkshopResponse createWorkshop(WorkshopRequest request) {
        WorkshopEntity entity = workshopMapper.toEntity(request);
        entity.setRegisteredSeats(0);

        WorkshopEntity saved = workshopRepository.save(entity);

        redisService.initializeSlots(
                saved.getWorkshopId(), saved.getTotalCapacity());

        return workshopMapper.toResponse(saved);
    }

    @Transactional
    public WorkshopResponse updateWorkshop(Long id, WorkshopRequest request) {
        WorkshopEntity entity = workshopRepository.findByWorkshopId(id)
                .filter(w -> w.getDeletedAt() == null)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Workshop not found"));

        workshopMapper.updateEntity(request, entity);
        entity.setUpdatedAt(OffsetDateTime.now());

        WorkshopEntity updated = workshopRepository.save(entity);

        int remainingSlots =
                updated.getTotalCapacity() - updated.getRegisteredSeats();
        redisService.initializeSlots(updated.getWorkshopId(), remainingSlots);

        return workshopMapper.toResponse(updated);
    }

    @Transactional
    public void deleteWorkshop(Long id) {
        WorkshopEntity entity = workshopRepository.findByWorkshopId(id)
                .filter(w -> w.getDeletedAt() == null)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Workshop not found"));

        entity.setDeletedAt(OffsetDateTime.now());
        workshopRepository.save(entity);
    }

}
