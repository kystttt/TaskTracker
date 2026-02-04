import api from './httpClient';
import type { Task } from '../types/task';

export async function getMyTasks(): Promise<Task[]> {
  const res = await api.get<Task[]>('/tasks');
  return res.data;
}

export async function getTask(id: number): Promise<Task> {
  const res = await api.get<Task>(`/tasks/${id}`);
  return res.data;
}

export async function createTask(payload: Omit<Task, 'id' | 'creatorId'>): Promise<Task> {
  const body: Task = {
    id: null,
    creatorId: null,
    ...payload,
    status: null,
  };
  const res = await api.post<Task>('/tasks', body);
  return res.data;
}

export async function updateTask(id: number, payload: Task): Promise<Task> {
  const res = await api.put<Task>(`/tasks/${id}`, payload);
  return res.data;
}

export async function deleteTask(id: number): Promise<void> {
  await api.delete(`/tasks/${id}`);
}

export async function getAllTasksAdmin(): Promise<Task[]> {
  const res = await api.get<Task[]>('/admin/tasks/');
  return res.data;
}

