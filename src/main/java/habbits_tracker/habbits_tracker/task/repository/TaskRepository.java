package habbits_tracker.habbits_tracker.task.repository;

import habbits_tracker.habbits_tracker.task.entity.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<TaskEntity, Long> {
}
