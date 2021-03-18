import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import taskReader from "./TaskReader";
import CalendarTask from "../CalendarTasks/CalendarTask";

export const taskSlice = createSlice({
    name: 'tasks',
    initialState: taskReader.getTasks(),
    reducers: {
        removeTask(state, action: PayloadAction<CalendarTask>) {
            return state.filter((task) => task !== action.payload);
        },
        addTask(state, action: PayloadAction<CalendarTask>) {
            state.push(action.payload);
        },
        updateTask(state, action: PayloadAction<CalendarTask>) {
            let newTaskList: CalendarTask[] = state;
            newTaskList = newTaskList.map(task => {
                if (task.getId() === action.payload.getId()) {
                    return action.payload;
                }
                return task
            });
            return newTaskList;
        }
    },
});

export const selectTasks = (state: any) => state.tasks;

export const {removeTask, addTask, updateTask} = taskSlice.actions

export default taskSlice.reducer;
