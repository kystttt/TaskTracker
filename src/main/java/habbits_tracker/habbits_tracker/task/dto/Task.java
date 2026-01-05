package habbits_tracker.habbits_tracker.task.dto;

import habbits_tracker.habbits_tracker.task.utils.TaskPriority;
import habbits_tracker.habbits_tracker.task.utils.TaskStatus;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;

import java.time.LocalDate;

public record Task(

        @Null
        Long id,

        @NotNull
        Long creatorId,

        @NotNull
        Long assignedUserId,

        TaskStatus status,

        @FutureOrPresent
        @NotNull
        LocalDate createDateTime,

        @FutureOrPresent
        @NotNull
        LocalDate deadlineDate,

        TaskPriority priority
) { }
