import { useQuery } from '@tanstack/react-query';
import { Layout } from '../components/layout/Layout';
import { Spinner } from '../components/ui/Spinner';
import { getAllTasksAdmin } from '../api/taskApi';
import { Badge } from '../components/ui/Badge';

export function AdminTasksPage() {
  const query = useQuery({
    queryKey: ['tasks', 'admin'],
    queryFn: getAllTasksAdmin,
  });

  return (
    <Layout>
      <h1 className="mb-4 text-xl font-semibold text-slate-100">All tasks (admin)</h1>
      {query.isLoading && <Spinner />}
      {query.isError && (
        <div className="text-sm text-red-400">Failed to load tasks.</div>
      )}
      {query.data && (
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/70">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-900 text-slate-400">
              <tr>
                <th className="px-3 py-2 text-left">ID</th>
                <th className="px-3 py-2 text-left">Title</th>
                <th className="px-3 py-2 text-left">Creator</th>
                <th className="px-3 py-2 text-left">Assigned</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-left">Priority</th>
                <th className="px-3 py-2 text-left">Created</th>
                <th className="px-3 py-2 text-left">Deadline</th>
              </tr>
            </thead>
            <tbody>
              {query.data.map((t) => (
                <tr key={t.id} className="border-t border-slate-800">
                  <td className="px-3 py-2">{t.id}</td>
                  <td className="px-3 py-2">{t.title}</td>
                  <td className="px-3 py-2">{t.creatorId}</td>
                  <td className="px-3 py-2">{t.assignedUserId}</td>
                  <td className="px-3 py-2">
                    <Badge
                      variant={
                        t.status === 'DONE'
                          ? 'success'
                          : t.status === 'IN_PROGRESS'
                          ? 'warning'
                          : 'default'
                      }
                    >
                      {t.status ?? 'NEW'}
                    </Badge>
                  </td>
                  <td className="px-3 py-2">{t.priority ?? 'LOW'}</td>
                  <td className="px-3 py-2">{t.createDateTime}</td>
                  <td className="px-3 py-2">{t.deadlineDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}

