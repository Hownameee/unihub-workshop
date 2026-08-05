package com.github.hownameee.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

import com.github.hownameee.backend.dtos.workshop.WorkshopRequest;
import com.github.hownameee.backend.dtos.workshop.WorkshopResponse;
import com.github.hownameee.backend.entities.WorkshopEntity;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface WorkshopMapper {

    WorkshopResponse toResponse(WorkshopEntity entity);

    @Mapping(target = "workshopId", ignore = true)
    @Mapping(target = "registeredSeats", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "deletedAt", ignore = true)
    WorkshopEntity toEntity(WorkshopRequest request);

    @Mapping(target = "workshopId", ignore = true)
    @Mapping(target = "registeredSeats", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "deletedAt", ignore = true)
    void updateEntity(WorkshopRequest request, @MappingTarget WorkshopEntity entity);
}
