package com.leobelanger.eventmanager.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    private static final int MAX_NAME_LENGTH = 32;

    @Id
    @GeneratedValue
    private Long id;

    @Column(length = MAX_NAME_LENGTH)
    @Size(max = MAX_NAME_LENGTH)
    @NotBlank(message = "Event name is required.")
    private String name;

    @NotBlank(message = "Event name is required.")
    private String description;

    @NotNull(message = "Event start date is required.")
    private Date startDate;

    @NotNull(message = "Event end date is required.")
    private Date endDate;
}
