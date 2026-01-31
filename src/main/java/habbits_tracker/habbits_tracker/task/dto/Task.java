package habbits_tracker.habbits_tracker.task.dto;

import habbits_tracker.habbits_tracker.task.utils.TaskPriority;
import habbits_tracker.habbits_tracker.task.utils.TaskStatus;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record Task(

        @Null
        Long id,

        @Null
        Long creatorId,

        @NotNull
        Long assignedUserId,

        TaskStatus status,

        @NotNull
        LocalDate createDateTime,

        @FutureOrPresent
        @NotNull
        LocalDate deadlineDate,

        TaskPriority priority
) { }
