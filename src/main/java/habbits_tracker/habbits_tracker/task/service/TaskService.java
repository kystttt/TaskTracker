package habbits_tracker.habbits_tracker.task.service;

import habbits_tracker.habbits_tracker.task.dto.Task;
import habbits_tracker.habbits_tracker.task.entity.TaskEntity;
import habbits_tracker.habbits_tracker.task.utils.TaskPriority;
import habbits_tracker.habbits_tracker.task.utils.TaskStatus;
import habbits_tracker.habbits_tracker.task.repository.TaskRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

/**
 * Сервис для взаимодействия с контроллером привычек
 */
@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private static final Logger log = LoggerFactory.getLogger(TaskService.class);


    public TaskService(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }

    /**
     * Вытаескивает задачу из бд по ее айдишнику
     * @param taskId задачи
     * @return возвращает доменное представление задачи
     */
    public Task getTaskByIdForUser(Long taskId, Long currentUserId) {
        var task = taskRepository.findByIdAndCreatorId(taskId, currentUserId)
                .orElseThrow(() -> new NoSuchElementException("Task not found"));
        return toDomainTask(task);
    }

    /**
     * Вытастаскивает все задачи, которые есть в бд для конкретного пользователя
     * @return возвращает доменное представление задачи
     */
    public List<Task> getAllTasksForUser(Long currentUserId) {
        return taskRepository.findAllByCreatorId(currentUserId)
                .stream().map(this::toDomainTask).toList();
    }

    private Task toDomainTask(
            TaskEntity task
    ){
        return new Task(
                task.getId(),
                task.getCreatorId(),
                task.getAssignedUserId(),
                task.getStatus(),
                task.getCreateDateTime(),
                task.getDeadlineDate(),
                task.getPriority()
        );
    }

    public Task createTask(Task taskToCreate) {
        if (taskToCreate.status() != null){
            throw new IllegalArgumentException("Status should be empty");
        }
        if (!taskToCreate.deadlineDate().isAfter(taskToCreate.createDateTime())){
            throw new IllegalArgumentException("Start date most be 1 day earlier than end date");
        }
        var entityToSave = new TaskEntity(
                null,
                taskToCreate.creatorId(),
                taskToCreate.assignedUserId(),
                TaskStatus.CREATED,
                taskToCreate.createDateTime(),
                taskToCreate.deadlineDate(),
                TaskPriority.LOW
        );
        var savedEntity = taskRepository.save(entityToSave);
        log.info("Task created successful");
        return toDomainTask(savedEntity);
    }

    public Task updateTaskForUser(Long taskId, Long currentUserId, Task taskToUpdate) {
        var existing = taskRepository.findByIdAndCreatorId(taskId, currentUserId)
                .orElseThrow(() -> new NoSuchElementException("Task not found"));

        if (existing.getStatus() == TaskStatus.DONE) {
            throw new IllegalStateException("The completed task cannot be changed");
        }

        if (!taskToUpdate.deadlineDate().isAfter(taskToUpdate.createDateTime())) {
            throw new IllegalArgumentException("Start date must be earlier than end date");
        }

        var updated = new TaskEntity(
                existing.getId(),
                existing.getCreatorId(),
                taskToUpdate.assignedUserId(),
                taskToUpdate.status(),
                taskToUpdate.createDateTime(),
                taskToUpdate.deadlineDate(),
                taskToUpdate.priority()
        );

        taskRepository.save(updated);
        return toDomainTask(updated);
    }

    @Transactional
    public void deleteTaskForUser(Long taskId, Long currentUserId) {
        var existing = taskRepository.findByIdAndCreatorId(taskId, currentUserId)
                .orElseThrow(() -> new NoSuchElementException("Task not found"));
        taskRepository.deleteById(existing.getId());
    }
}
