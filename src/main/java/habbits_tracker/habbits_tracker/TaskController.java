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
     * @return возвращает код 200
     */
    @GetMapping()
    public ResponseEntity<List<Task>> getAllTasks(){
        log.info("Called getAllTasks");
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @PostMapping()
    public ResponseEntity<Task> createTask(
            @RequestBody @Valid Task taskToCreate
    ){
        log.info("Called method createTask");
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(taskService.createTask(taskToCreate));
    }
}
