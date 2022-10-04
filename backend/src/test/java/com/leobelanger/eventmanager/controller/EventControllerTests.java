package com.leobelanger.eventmanager.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.leobelanger.eventmanager.model.Event;
import com.leobelanger.eventmanager.service.EventService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

public class EventControllerTests {

    private final EventService eventService = Mockito.mock(EventService.class);

    private EventController eventController;

    @BeforeEach
    public void beforeEach() {
        eventController = new EventController(eventService);
    }

    @Test
    @DisplayName("When listing all events, should call EventService correct method")
    public void testWhenListingAllEventsServiceCalled() {
        eventController.getEvents();

        verify(eventService).getEvents();
    }

    @Test
    @DisplayName("When listing all events, should return EventService result")
    public void testWhenListingAllEventsReturnServiceResult() {
        final var events = List.of(
                createEvent(1L),
                createEvent(2L)
        );

        when(eventService.getEvents()).thenReturn(events);

        final var returnedEvents = eventController.getEvents();

        assertIterableEquals(events, returnedEvents);
    }

    @Test
    @DisplayName("When creating an event, should call EventService correct method with correct parameters")
    public void testWhenCreatingEventServiceCalledWithCorrectParameters() {
        final var event = createEvent(1L);

        eventController.createEvent(event);

        verify(eventService).createEvent(event);
    }

    @Test
    @DisplayName("When creating an event, should return EventService result")
    public void testWhenCreatingEventReturnServiceResult() {
        final var event = createEvent(1L);

        when(eventService.createEvent(event)).thenReturn(event);

        final var returnedEvent = eventController.createEvent(event);

        assertEquals(event, returnedEvent);
    }

    private Event createEvent(Long id) {
        return Event.builder()
                .id(id)
                .build();
    }
}
