import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '../components/layout/Layout';
import { Spinner } from '../components/ui/Spinner';
import { getTask } from '../api/taskApi';
import { Badge } from '../components/ui/Badge';

export function TaskDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const query = useQuery({
    queryKey: ['task', id],
    queryFn: () => getTask(id),
    enabled: Number.isFinite(id),
  });

  return (
    <Layout>
      {query.isLoading && <Spinner />}
      {query.isError && (
        <div className="text-sm text-red-400">Failed to load task.</div>
      )}
      {query.data && (
        <div className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-xl font-semibold">{query.data.title}</h1>
            <Badge
              variant={
                query.data.status === 'DONE'
                  ? 'success'
                  : query.data.status === 'IN_PROGRESS'
                  ? 'warning'
                  : 'default'
              }
            >
              {query.data.status ?? 'NEW'}
            </Badge>
          </div>
          {query.data.description && (
            <p className="text-sm text-slate-200">{query.data.description}</p>
          )}
          <div className="grid grid-cols-1 gap-2 text-sm text-slate-300 md:grid-cols-2">
            <span>
              <span className="font-medium">Creator ID: </span>
              {query.data.creatorId}
            </span>
            <span>
              <span className="font-medium">Assigned user ID: </span>
              {query.data.assignedUserId}
            </span>
            <span>
              <span className="font-medium">Create date: </span>
              {query.data.createDateTime}
            </span>
            <span>
              <span className="font-medium">Deadline: </span>
              {query.data.deadlineDate}
            </span>
            <span>
              <span className="font-medium">Priority: </span>
              {query.data.priority ?? 'LOW'}
            </span>
          </div>
        </div>
      )}
    </Layout>
  );
}

