package habbits_tracker.habbits_tracker.task.entity;

import habbits_tracker.habbits_tracker.task.utils.TaskPriority;
import habbits_tracker.habbits_tracker.task.utils.TaskStatus;
import jakarta.persistence.*;


import java.time.LocalDate;

@Table(name = "tasks")
@Entity
public class TaskEntity {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "title", nullable = false, length = 120)
    String title;

    @Column(name = "description", length = 1024)
    String description;

    @Column(name = "creator_id", nullable = false)
    Long creatorId;

    @Column(name = "worker_id", nullable = false)
    Long assignedUserId;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    TaskStatus status;

    @Column(name = "create_date", nullable = false)
    LocalDate createDateTime;

    @Column(name = "deadline_date", nullable = false)
    LocalDate deadlineDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "priority", nullable = false)
    TaskPriority priority;

    public TaskEntity(Long id, String title, String description, Long creatorId, Long assignedUserId, TaskStatus status, LocalDate createDateTime, LocalDate deadlineDate, TaskPriority priority) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.creatorId = creatorId;
        this.assignedUserId = assignedUserId;
        this.status = status;
        this.createDateTime = createDateTime;
        this.deadlineDate = deadlineDate;
        this.priority = priority;
    }

    public TaskEntity() {
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Long creatorId) {
        this.creatorId = creatorId;
    }

    public Long getAssignedUserId() {
        return assignedUserId;
    }

    public void setAssignedUserId(Long assignedUserId) {
        this.assignedUserId = assignedUserId;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public LocalDate getCreateDateTime() {
        return createDateTime;
    }

    public void setCreateDateTime(LocalDate createDateTime) {
        this.createDateTime = createDateTime;
    }

    public LocalDate getDeadlineDate() {
        return deadlineDate;
    }

    public void setDeadlineDate(LocalDate deadlineDate) {
        this.deadlineDate = deadlineDate;
    }

    public TaskPriority getPriority() {
        return priority;
    }

    public void setPriority(TaskPriority priority) {
        this.priority = priority;
    }
}
