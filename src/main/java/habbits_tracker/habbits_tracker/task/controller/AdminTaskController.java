package habbits_tracker.habbits_tracker.task.controller;

import habbits_tracker.habbits_tracker.task.dto.Task;
import habbits_tracker.habbits_tracker.task.service.TaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin/tasks")
@PreAuthorize("hasRole('ADMIN')")
public class AdminTaskController {
    private final TaskService taskService;
    private static final Logger log = LoggerFactory.getLogger(AdminTaskController.class);


    public AdminTaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks(){
        log.info("Called gelAllTasks from ADMIN");
        return ResponseEntity.ok(taskService.getAllTasks());
    }


}
