package com.github.hownameee.backend.dtos;

import java.util.List;

public record WorkshopsResponse(
    List<WorkshopResponse> workshops
) {}
