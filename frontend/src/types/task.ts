export type TaskStatus = 'CREATED' | 'IN_PROGRESS' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HARD';

export interface Task {
  id: number | null;
  title: string;
  description: string | null;
  creatorId: number | null;
  assignedUserId: number;
  status: TaskStatus | null;
  createDateTime: string;
  deadlineDate: string;
  priority: TaskPriority | null;
}

