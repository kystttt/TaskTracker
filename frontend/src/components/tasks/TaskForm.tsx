import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import type { Task } from '../../types/task';

const schema = z
  .object({
    title: z.string().min(1, 'Title is required').max(120),
    description: z.string().max(1024).optional().or(z.literal('')),
    assignedUserId: z.coerce.number().int().positive('Assigned user id is required'),
    createDateTime: z.string().min(1, 'Create date is required'),
    deadlineDate: z.string().min(1, 'Deadline is required'),
    priority: z.enum(['LOW', 'MEDIUM', 'HARD']).optional(),
    status: z.enum(['CREATED', 'IN_PROGRESS', 'DONE']).optional(),
  })
  .refine(
    (data) => {
      if (!data.createDateTime || !data.deadlineDate) return true;
      const c = new Date(data.createDateTime);
      const d = new Date(data.deadlineDate);
      return d.getTime() >= c.getTime();
    },
    {
      path: ['deadlineDate'],
      message: 'Deadline must be after or equal to create date',
    },
  );

export type TaskFormValues = z.infer<typeof schema>;

interface Props {
  defaultValues?: Task | null;
  mode: 'create' | 'edit';
  onSubmit: (values: TaskFormValues) => void;
  submitting?: boolean;
}

export function TaskForm({ defaultValues, mode, onSubmit, submitting }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues
      ? {
          title: defaultValues.title,
          description: defaultValues.description ?? '',
          assignedUserId: defaultValues.assignedUserId,
          createDateTime: defaultValues.createDateTime,
          deadlineDate: defaultValues.deadlineDate,
          priority: defaultValues.priority ?? 'LOW',
          status: defaultValues.status ?? 'CREATED',
        }
      : {
          priority: 'LOW',
          status: 'CREATED',
        },
  });

  const isEdit = mode === 'edit';

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit((values) => onSubmit(values))}
    >
      <Input
        label="Title"
        {...register('title')}
        error={errors.title?.message}
        placeholder="Task title"
      />
      <Input
        label="Description"
        {...register('description')}
        error={errors.description?.message}
        placeholder="Optional description"
      />
      <Input
        label="Assigned user ID"
        type="number"
        {...register('assignedUserId')}
        error={errors.assignedUserId?.message}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label="Create date"
          type="date"
          {...register('createDateTime')}
          error={errors.createDateTime?.message}
        />
        <Input
          label="Deadline date"
          type="date"
          {...register('deadlineDate')}
          error={errors.deadlineDate?.message}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Select label="Priority" {...register('priority')} error={errors.priority?.message}>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HARD">HARD</option>
        </Select>
        {isEdit && (
          <Select label="Status" {...register('status')} error={errors.status?.message}>
            <option value="CREATED">CREATED</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="DONE">DONE</option>
          </Select>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={submitting}>
          {isEdit ? 'Save changes' : 'Create task'}
        </Button>
      </div>
    </form>
  );
}

