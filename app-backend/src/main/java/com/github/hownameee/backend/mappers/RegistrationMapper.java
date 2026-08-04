package com.github.hownameee.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

import com.github.hownameee.backend.dtos.RegistrationResponse;
import com.github.hownameee.backend.entities.RegistrationEntity;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface RegistrationMapper {

    @Mapping(target = "workshopId", source = "workshop.workshopId")
    RegistrationResponse toResponse(RegistrationEntity entity);
}
