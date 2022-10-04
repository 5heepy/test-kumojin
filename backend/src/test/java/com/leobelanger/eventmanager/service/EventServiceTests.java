package com.leobelanger.eventmanager.service;

import com.leobelanger.eventmanager.controller.EventController;
import com.leobelanger.eventmanager.model.Event;
import com.leobelanger.eventmanager.repository.EventRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertIterableEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class EventServiceTests {

    private final EventRepository eventRepository = Mockito.mock(EventRepository.class);

    private EventService eventService;

    @BeforeEach
    public void beforeEach() {
        eventService = new EventService(eventRepository);
    }

    @Test
    @DisplayName("When listing all events, should call EventRepository correct method")
    public void testWhenListingAllEventsServiceCalled() {
        eventService.getEvents();

        verify(eventRepository).findAll();
    }

    @Test
    @DisplayName("When listing all events, should return EventRepository result")
    public void testWhenListingAllEventsReturnServiceResult() {
        final var events = List.of(
                createEvent(1L),
                createEvent(2L)
        );

        when(eventRepository.findAll()).thenReturn(events);

        final var returnedEvents = eventService.getEvents();

        assertIterableEquals(events, returnedEvents);
    }

    @Test
    @DisplayName("When creating an event, should call EventRepository correct method with correct parameters")
    public void testWhenCreatingEventServiceCalledWithCorrectParameters() {
        final var event = createEvent(1L);

        eventService.createEvent(event);

        verify(eventRepository).save(event);
    }

    @Test
    @DisplayName("When creating an event, should return EventRepository result")
    public void testWhenCreatingEventReturnServiceResult() {
        final var event = createEvent(1L);

        when(eventRepository.save(event)).thenReturn(event);

        final var returnedEvent = eventService.createEvent(event);

        assertEquals(event, returnedEvent);
    }

    private Event createEvent(Long id) {
        return Event.builder()
                .id(id)
                .build();
    }
}
