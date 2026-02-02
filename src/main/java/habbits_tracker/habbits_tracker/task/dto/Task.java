package habbits_tracker.habbits_tracker.task.dto;

import habbits_tracker.habbits_tracker.task.utils.TaskPriority;
import habbits_tracker.habbits_tracker.task.utils.TaskStatus;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record Task(

        @Null
        Long id,

        @NotBlank
        @Size(max = 120)
        String title,

        @Size(max = 1024)
        String description,

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
) {
}
