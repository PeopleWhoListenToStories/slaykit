import { Extension } from "@slaykit/core";
import { TaskList, type TaskListOptions } from "./task-list";
import { TaskItem, type TaskItemOptions } from "./task-item";

export interface TaskKitOptions {
  taskList: Partial<TaskListOptions> | false;
  taskItem: Partial<TaskItemOptions> | false;
}

export const TaskKit = Extension.create<TaskKitOptions>({
  name: "taskKit",

  addExtensions() {
    const extensions = [];

    if (this.options.taskList !== false) {
      extensions.push(TaskList.configure(this.options?.taskList));
    }

    if (this.options.taskItem !== false) {
      extensions.push(TaskItem.configure(this.options?.taskItem));
    }

    return extensions;
  },
});
