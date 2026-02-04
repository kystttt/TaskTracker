import type { Task } from '../../types/task';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface Props {
  task: Task;
  onOpen: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskCard({ task, onOpen, onEdit, onDelete }: Props) {
  const statusVariant =
    task.status === 'DONE'
      ? 'success'
      : task.status === 'IN_PROGRESS'
      ? 'warning'
      : 'default';

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="truncate text-base font-semibold">{task.title}</h3>
        <Badge variant={statusVariant}>{task.status ?? 'NEW'}</Badge>
      </div>
      {task.description && (
        <p className="line-clamp-2 text-sm text-slate-300">{task.description}</p>
      )}
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
        <span>Priority: {task.priority ?? 'LOW'}</span>
        <span>Created: {task.createDateTime}</span>
        <span>Deadline: {task.deadlineDate}</span>
        <span>Assigned: {task.assignedUserId}</span>
      </div>
      <div className="mt-1 flex gap-2">
        <Button variant="secondary" className="flex-1" onClick={onOpen}>
          Open
        </Button>
        <Button
          variant="primary"
          className="flex-1"
          onClick={onEdit}
          disabled={task.status === 'DONE'}
        >
          Edit
        </Button>
        <Button variant="danger" onClick={onDelete} disabled={task.status === 'DONE'}>
          Delete
        </Button>
      </div>
    </div>
  );
}

