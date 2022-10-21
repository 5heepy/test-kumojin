package com.leobelanger.eventmanager.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.AssertTrue;
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
    public static final String NAME_MAX_LENGTH_ERROR = "Event name cannot be longer than 32 characters.";
    public static final String NAME_REQUIRED_ERROR = "Event name is required.";
    public static final String START_DATE_REQUIRED_ERROR = "Start date is required.";
    public static final String END_DATE_REQUIRED_ERROR = "End date is required.";
    public static final String END_DATE_AFTER_START_DATE_ERROR = "End date should be after start date.";

    private static final int MAX_NAME_LENGTH = 32;

    @Id
    @GeneratedValue
    private Long id;

    @Column(length = MAX_NAME_LENGTH)
    @Size(max = MAX_NAME_LENGTH, message = NAME_MAX_LENGTH_ERROR)
    @NotBlank(message = NAME_REQUIRED_ERROR)
    private String name;

    private String description;

    @NotNull(message = START_DATE_REQUIRED_ERROR)
    private Date startDate;

    @NotNull(message = END_DATE_REQUIRED_ERROR)
    private Date endDate;

    @AssertTrue(message = END_DATE_AFTER_START_DATE_ERROR)
    public boolean isEndDateAfterStartDate() {
        if (startDate == null || endDate == null) return true;

        return endDate.after(startDate);
    }
}
