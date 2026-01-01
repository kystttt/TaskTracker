package habbits_tracker.habbits_tracker;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
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
     * @param id задачи
     * @return возвращает доменное представление задачи
     */
    public Task getTaskById(Long id) {
        var existing = taskRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Not found reservation by id = "  + id));
        return toDomainTask(existing);
    }

    /**
     * Вытастаскивает все задачи, которые есть в бд
     * @return возвращает доменное представление задачи
     */
    public List<Task> getAllTasks() {
        List<TaskEntity> allEntities = taskRepository.findAll();
        return allEntities.stream()
                .map(this::toDomainTask
                ).toList();
    }

    private Task toDomainTask(
            TaskEntity task
    ){
        return new Task(
                task.getId(),
                task.creatorId,
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
        return toDomainTask(savedEntity);
    }
}
