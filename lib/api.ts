import axios from "axios";

const instance = axios.create({
  baseURL: "https://lehlehka.b.goit.study",
  headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_LELEKHA_TOKEN}` },
});

export interface Task {
  _id: string;
  name: string;
  date: string;
  isDone: boolean;
}

export interface NewTask {
  name: string;
  date: string;
}

export const createTask = async (note: NewTask): Promise<Task> => {
  const response = await instance.post<Task>(`/tasks`, note);
  return response.data;
};
