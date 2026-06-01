package com.github.hownameee.backend.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/workshops")
public class WorkshopController {

    @GetMapping
    public void getAllWorkshops() {

    }

    @GetMapping("/{id}")
    public void getWorkshopById() {

    }

    @PostMapping
    public void createWorkshop() {

    }

    @PutMapping()
    public void updateWorkshop() {

    }

    @DeleteMapping()
    public void deleteWorkshop() {

    }
}
