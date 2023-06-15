import React, { ChangeEvent, useRef , useState  } from 'react';
import { useTaskManager } from '../store/useTaskManager';

interface Task {
  id: number,
  title: string,
  completed: boolean,
}

const TaskManager = () => {
  const {
    tasks,
    searchTask,
    addTask,
    updateTask,
    deleteTask,
    setSearchTask,
  } = useTaskManager();

  const createTaskRef = useRef<HTMLInputElement>(null);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState('');

  const handleAddTask = () => {
    if (createTaskRef.current && createTaskRef.current.value) {
      const title = createTaskRef.current.value;
      const newTask = {
        id: Date.now(),
        title,
        completed: false,
      };
      addTask(newTask);
      createTaskRef.current.value = '';
    }
  };

  const handleUpdateTask = (taskId: number, updatedTask: Partial<Task>) => {
    updateTask(taskId, updatedTask);
    setEditingTaskId(null);
    setEditedTaskTitle('');
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTask(e.target.value);
  };

  const filteredTasks = tasks.filter((task) =>
  task.title.toLowerCase().includes(searchTask.toLowerCase())
);

  // See! I already give you everything!
  // const filteredTasks = tasks.filter((task) =>
  //   task.title.toLowerCase().includes(searchTask.toLowerCase())
  // );

  return (
    <div>
      <h1>Task Manager</h1>

      <input type="text" ref={createTaskRef} />

      <button onClick={handleAddTask}>Add Task</button>

      <input
        type="text"
        value={searchTask}
        onChange={handleSearch}
        placeholder="Search Task"
      />

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="text"
              value={task.title}
              onChange={(e) =>
                handleUpdateTask(task.id, { title: e.target.value })
              }
            />
           <button onClick={() => handleUpdateTask(task.id, { title: task.title })}>Edit</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
