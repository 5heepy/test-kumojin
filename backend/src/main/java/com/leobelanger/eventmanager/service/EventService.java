package com.leobelanger.eventmanager.service;

import com.leobelanger.eventmanager.model.Event;
import com.leobelanger.eventmanager.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository repository;

    public List<Event> getEvents() {
        return repository.findAll();
    }

    public Event createEvent(Event event) {
        return repository.save(event);
    }
}
