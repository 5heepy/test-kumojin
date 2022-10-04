package com.leobelanger.eventmanager.controller;

import com.leobelanger.eventmanager.model.Event;
import com.leobelanger.eventmanager.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class EventController {
    private final EventService service;

    @GetMapping("/events")
    public List<Event> getEvents() {
        return service.getEvents();
    }

    @PostMapping("/events")
    public Event createEvent(@RequestBody Event event) {
        return service.createEvent(event);
    }
}
