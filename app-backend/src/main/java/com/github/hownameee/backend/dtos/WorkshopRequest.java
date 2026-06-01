package com.github.hownameee.backend.dtos;

public record WorkshopRequest(
    String title,
    String description,
    String coverImageUrl,
    Integer totalCapacity
) {}
