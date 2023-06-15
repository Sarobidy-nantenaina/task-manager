import create from 'zustand';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  searchTask: string;
  addTask: (newTask: Task) => void;
  updateTask: (taskId: number, updatedTask: Partial<Task>) => void;
  deleteTask: (taskId: number) => void;
  setSearchTask: (search: string) => void;
}

const useTaskManager = create<TaskState>((set) => ({
  tasks: [],
  searchTask: '',
  addTask: (newTask: Task) =>
    set((state) => ({
      tasks: [...state.tasks, newTask],
    })),
  updateTask: (taskId: number, updatedTask: Partial<Task>) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      ),
    })),
  deleteTask: (taskId: number) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
  setSearchTask: (search: string) =>
    set(() => ({
      searchTask: search,
    })),
}));

export { useTaskManager };
