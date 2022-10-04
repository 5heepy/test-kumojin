package com.leobelanger.eventmanager.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private String description;

    private Date startDate;

    private Date endDate;
}
