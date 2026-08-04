package com.github.hownameee.backend.mappers;

import com.github.hownameee.backend.dtos.RegistrationResponse;
import com.github.hownameee.backend.entities.RegistrationEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

@Mapper(
        componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface RegistrationMapper {

    @Mapping(target = "workshopId", source = "workshop.workshopId")
    RegistrationResponse toResponse(RegistrationEntity entity);
}
