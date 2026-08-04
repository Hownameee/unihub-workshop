package com.github.hownameee.backend.controllers;

import com.github.hownameee.backend.dtos.WorkshopRequest;
import com.github.hownameee.backend.dtos.WorkshopResponse;
import com.github.hownameee.backend.dtos.WorkshopsResponse;
import com.github.hownameee.backend.services.WorkshopService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/workshops")
@AllArgsConstructor
public class WorkshopController {

    private final WorkshopService workshopService;

    @GetMapping
    public ResponseEntity<WorkshopsResponse> getAllWorkshops() {
        WorkshopsResponse response = new WorkshopsResponse(workshopService.getAllWorkshops());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkshopResponse> getWorkshopById(@PathVariable Long id) {
        WorkshopResponse response = workshopService.getWorkshopById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<WorkshopResponse> createWorkshop(@RequestBody WorkshopRequest request) {
        WorkshopResponse response = workshopService.createWorkshop(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkshopResponse> updateWorkshop(
            @PathVariable Long id,
            @RequestBody WorkshopRequest request) {
        WorkshopResponse response = workshopService.updateWorkshop(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkshop(@PathVariable Long id) {
        workshopService.deleteWorkshop(id);
        return ResponseEntity.noContent().build();
    }
}
