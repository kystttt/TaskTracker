import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Layout } from '../components/layout/Layout';
import { Spinner } from '../components/ui/Spinner';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { TaskForm, type TaskFormValues } from '../components/tasks/TaskForm';
import { TaskCard } from '../components/tasks/TaskCard';
import { getMyTasks, createTask, deleteTask, updateTask } from '../api/taskApi';
import type { Task, TaskPriority, TaskStatus } from '../types/task';
import { Select } from '../components/ui/Select';

type StatusFilter = TaskStatus | 'ALL';
type PriorityFilter = TaskPriority | 'ALL';

export function TasksPage() {
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('ALL');

  const queryClient = useQueryClient();

  const tasksQuery = useQuery({
    queryKey: ['tasks', 'me'],
    queryFn: getMyTasks,
  });

  const createMutation = useMutation({
    mutationFn: (values: TaskFormValues) =>
      createTask({
        title: values.title,
        description: values.description || null,
        assignedUserId: values.assignedUserId,
        createDateTime: values.createDateTime,
        deadlineDate: values.deadlineDate,
        priority: values.priority ?? 'LOW',
        status: null,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', 'me'] });
      setCreateOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: { id: number; task: TaskFormValues & { id: number } }) => {
      const full: Task = {
        id: payload.id,
        title: payload.task.title,
        description: payload.task.description || null,
        creatorId: editingTask?.creatorId ?? null,
        assignedUserId: payload.task.assignedUserId,
        createDateTime: payload.task.createDateTime,
        deadlineDate: payload.task.deadlineDate,
        priority: payload.task.priority ?? 'LOW',
        status: payload.task.status ?? 'CREATED',
      };
      return updateTask(payload.id, full);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', 'me'] });
      setEditingTask(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', 'me'] });
    },
  });

  const filteredTasks =
    tasksQuery.data?.filter((t) => {
      if (statusFilter !== 'ALL' && t.status !== statusFilter) return false;
      if (priorityFilter !== 'ALL' && t.priority !== priorityFilter) return false;
      return true;
    }) ?? [];

  return (
    <Layout>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-slate-100">My tasks</h1>
        <Button onClick={() => setCreateOpen(true)}>Create task</Button>
      </div>

      <div className="mb-4 flex flex-wrap gap-3">
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
          label="Status"
        >
          <option value="ALL">All</option>
          <option value="CREATED">CREATED</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
        </Select>
        <Select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as PriorityFilter)}
          label="Priority"
        >
          <option value="ALL">All</option>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HARD">HARD</option>
        </Select>
      </div>

      {tasksQuery.isLoading && <Spinner />}

      {tasksQuery.isError && (
        <div className="text-sm text-red-400">Failed to load tasks.</div>
      )}

      {!tasksQuery.isLoading && !tasksQuery.isError && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id ?? Math.random()}
              task={task}
              onOpen={() => (window.location.href = `/tasks/${task.id}`)}
              onEdit={() => {
                if (task.status === 'DONE') return;
                setEditingTask(task);
              }}
              onDelete={() => {
                if (task.id != null) deleteMutation.mutate(task.id);
              }}
            />
          ))}
        </div>
      )}

      <Modal
        open={isCreateOpen}
        onClose={() => setCreateOpen(false)}
        title="Create task"
      >
        <TaskForm
          mode="create"
          onSubmit={(values) => createMutation.mutate(values)}
          submitting={createMutation.isPending}
        />
      </Modal>

      <Modal
        open={!!editingTask}
        onClose={() => setEditingTask(null)}
        title="Edit task"
      >
        {editingTask && (
          <TaskForm
            mode="edit"
            defaultValues={editingTask}
            submitting={updateMutation.isPending}
            onSubmit={(values) =>
              editingTask?.id &&
              updateMutation.mutate({
                id: editingTask.id,
                task: { ...values, id: editingTask.id },
              })
            }
          />
        )}
      </Modal>
    </Layout>
  );
}

