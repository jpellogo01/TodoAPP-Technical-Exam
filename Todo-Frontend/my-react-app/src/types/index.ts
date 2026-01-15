export interface TaskType {
  id: number;
  description: string;
  status: string;
  image?: string;
  taskOrder?: number;

}

export interface TodoType {
  id?: number;
  title: string;
  status: string;
  tasks: TaskType[];
}