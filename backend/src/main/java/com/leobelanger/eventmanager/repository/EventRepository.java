package com.leobelanger.eventmanager.repository;

import com.leobelanger.eventmanager.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {}
