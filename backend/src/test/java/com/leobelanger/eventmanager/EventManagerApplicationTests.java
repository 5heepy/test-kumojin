package com.leobelanger.eventmanager;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.leobelanger.eventmanager.model.Event;
import com.leobelanger.eventmanager.repository.EventRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.util.NestedServletException;

import java.util.Date;

@SpringBootTest
@AutoConfigureMockMvc
class EventManagerApplicationTests {

	@Autowired
	private MockMvc mvc;

	@Autowired
	private EventRepository eventRepository;

	@AfterEach
	public void afterEach() {
		eventRepository.deleteAll();
	}

	@Test
	@DisplayName("When fetching events with no events, should return empty list")
	void testWhenFetchingEventsWithNoEventsShouldReturnEmptyList() throws Exception {
		final var result = mvc.perform(get("/events").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
				.andReturn()
				.getResponse()
				.getContentAsString();

		assertEquals("[]", result);
	}

	@Test
	@DisplayName("When creating event, should return created event")
	void testWhenCreatingEventShouldReturnEvent() throws Exception {
		final var eventName = "My test event";

		final var event = createEventFromName(eventName);

		mvc.perform(post("/events").content(eventToJson(event)).contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.name", is(eventName)))
				.andExpect(jsonPath("$.id", notNullValue()));
	}

	@Test
	@DisplayName("When creating event with very long name, should throw exception")
	void testWhenCreatingEventWithLongNameShouldThrowException() {
		final var eventName = "This is a very long name trying to break the 32 characters barrier";

		final var event = createEventFromName(eventName);

		assertThrows(NestedServletException.class, () -> {
			mvc.perform(post("/events").content(eventToJson(event)).contentType(MediaType.APPLICATION_JSON));
		});
	}

	@Test
	@DisplayName("When fetching events with some events, should return all events")
	void testWhenFetchingEventsWithSomeEventsShouldReturnAllEvents() throws Exception {
		final var eventName1 = "My test event 1";
		final var eventName2 = "My test event 2";

		final var event1 = createEventFromName(eventName1);
		final var event2 = createEventFromName(eventName2);

		mvc.perform(post("/events").content(eventToJson(event1)).contentType(MediaType.APPLICATION_JSON));
		mvc.perform(post("/events").content(eventToJson(event2)).contentType(MediaType.APPLICATION_JSON));

		mvc.perform(get("/events").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$[0].name", is(eventName1)))
				.andExpect(jsonPath("$[0].id", notNullValue()))
				.andExpect(jsonPath("$[1].name", is(eventName2)))
				.andExpect(jsonPath("$[1].id", notNullValue()));
	}

	private String eventToJson(Event event) throws Exception {
		final var objectWriter = new ObjectMapper().writer().withDefaultPrettyPrinter();

		return objectWriter.writeValueAsString(event);
	}

	private Event createEventFromName(String name) {
		return Event.builder()
			.name(name)
			.build();
	}
}
