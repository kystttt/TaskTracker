package habbits_tracker.habbits_tracker;

import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    private final TaskService taskService;
    private static final Logger log = LoggerFactory.getLogger(TaskService.class);


    public TaskController(TaskService taskService){
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
            @PathVariable("id") Long id
    ){
        log.info("Called getTaskById with id{}", id);
        try {
            return ResponseEntity.ok(taskService.getTaskById(id));
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
    public ResponseEntity<List<Task>> getAllTasks(){
        log.info("Called getAllTasks");
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    /**
     * Контроллер, который делает post-запрос для создания задачи
     * @param taskToCreate доменное представление задачи
     * @return возвращает 201 код в случае успеха
     *         возвращает 400 код в случает, если возникла проблема
     */
    @PostMapping()
    public ResponseEntity<Task> createTask(
            @RequestBody @Valid Task taskToCreate
    ){
        log.info("Called method createTask");
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(taskService.createTask(taskToCreate));
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
            @PathVariable("id") Long id,
            @RequestBody @Valid Task taskToUpdate
    ){
        log.info("Called methode updateTask");
        var updatedTak = taskService.updateTask(id, taskToUpdate);
        return ResponseEntity.ok(updatedTak);
    }

    /**
     * Контроллер, который удаляет задачу
     * @param id задачи
     * @return возвращает 200 код, если операция прошла успешно
     *         возвращает 404 код, если айди не существующей задачи
     */
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<Void> deleteTask(
            @PathVariable("id") Long id
    ){
        try{
            taskService.deleteTask(id);
            return ResponseEntity.ok()
                    .build();
        } catch (NoSuchElementException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .build();
        }
    }
}
