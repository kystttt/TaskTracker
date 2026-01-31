package habbits_tracker.habbits_tracker.task.repository;

import habbits_tracker.habbits_tracker.task.entity.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<TaskEntity, Long> {
    Optional<TaskEntity> findByIdAndCreatorId(Long id, Long creatorId);
    List<TaskEntity> findAllByCreatorId(Long creatorId);
}
