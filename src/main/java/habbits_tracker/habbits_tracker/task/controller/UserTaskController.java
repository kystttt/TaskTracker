package habbits_tracker.habbits_tracker.task.controller;

import habbits_tracker.habbits_tracker.task.dto.Task;
import habbits_tracker.habbits_tracker.task.service.TaskService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/tasks")
public class UserTaskController {
    private final TaskService taskService;
    private static final Logger log = LoggerFactory.getLogger(UserTaskController.class);


    public UserTaskController(TaskService taskService){
        this.taskService = taskService;
    }

    /**
     * Контроллер, который делает get-запрос для вывода задачи по id
     * @param id задачи
     * @return возвращает 200 код, если задача найдена
     *         возвращает 404 код, если задача не найден
     */
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable("id") Long id
    ){
        Long userId = jwt.getClaim("userId");
        log.info("Called getTaskById with id{}", id);
        try {
            return ResponseEntity.ok(taskService.getTaskByIdForUser(id, userId));
        }
        catch (NoSuchElementException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .build();
        }
    }

    /**
     * Контроллер, который делает get-запрос для вывода всех задач
     * @return возвращает 200 код
     *         в случае какой-либо ошибки вернет 500 код
     */
    @GetMapping()
    public ResponseEntity<List<Task>> getAllTasks(
            @AuthenticationPrincipal Jwt jwt
    ){
        log.info("Called getAllTasks");
        Long userId = jwt.getClaim("userId");
        return ResponseEntity.ok(taskService.getAllTasksForUser(userId));
    }

    /**
     * Контроллер, который делает post-запрос для создания задачи
     * @param taskToCreate доменное представление задачи
     * @return возвращает 201 код в случае успеха
     *         возвращает 400 код в случает, если возникла проблема
     */
    @PostMapping()
    public ResponseEntity<Task> createTask(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody @Valid Task taskToCreate
    ){
        log.info("Called method createTask");
        Long userId = jwt.getClaim("userId");
        Task fixed = new Task(
                null,
                taskToCreate.title(),
                taskToCreate.description(),
                userId,
                taskToCreate.assignedUserId(),
                taskToCreate.status(),
                taskToCreate.createDateTime(),
                taskToCreate.deadlineDate(),
                taskToCreate.priority()
        );
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(taskService.createTask(fixed));
    }

    /**
     * Контроллер, который обновляет сущность задачи
     * @param id задачи, которую меняем
     * @param taskToUpdate новое содержимое задачи
     * @return возвращает 200 код в случае успеха
     *         возвращает 400 код, если задача не существует
     */
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable("id") Long id,
            @RequestBody @Valid Task taskToUpdate
    ){
        log.info("Called methode updateTask");
        Long userId = jwt.getClaim("userId");
        var updatedTask = taskService.updateTaskForUser(id, userId, taskToUpdate);
        return ResponseEntity.ok(updatedTask);
    }

    /**
     * Контроллер, который удаляет задачу
     * @param id задачи
     * @return возвращает 200 код, если операция прошла успешно
     *         возвращает 404 код, если айди не существующей задачи
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable("id") Long id
    ){
        Long userId = jwt.getClaim("userId");
        try{
            taskService.deleteTaskForUser(id, userId);
            return ResponseEntity.ok()
                    .build();
        } catch (NoSuchElementException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .build();
        }
    }
}
