import { createSlice } from '@reduxjs/toolkit';
import { SWIM_LANE_TYPES } from './constants';

export interface TaskType {
    id: number,
    details: string,
    type: SWIM_LANE_TYPES,
    likes: number,
    comments: string[]
};

const getLocalStorageOnLoad = (taskType: any) => {
    const item = localStorage.getItem(taskType);
    if (!!item) {
        return JSON.parse(item);
    }
    return [];
};

const saveToLocalStorage = (type: SWIM_LANE_TYPES, data: string) => {
    return localStorage.setItem(type, data);
};

const getIndexById = (taskList: TaskType[], id: number) => {
    return taskList.findIndex((item: TaskType) => item.id === id);
};

export const taskDetailsSlice = createSlice({
    name: 'tasksDetails',
    initialState: {
        [SWIM_LANE_TYPES.WENT_WELL]: getLocalStorageOnLoad(SWIM_LANE_TYPES.WENT_WELL),
        [SWIM_LANE_TYPES.TO_IMPROVE]: getLocalStorageOnLoad(SWIM_LANE_TYPES.TO_IMPROVE),
        [SWIM_LANE_TYPES.ACTION_ITEMS]: getLocalStorageOnLoad(SWIM_LANE_TYPES.ACTION_ITEMS)
    },
    reducers: {
        addItem: (state: any, action) => {
            const { payload, type }: { payload: TaskType, type: any } = action.payload;
            state[type].push(payload);
            saveToLocalStorage(type, JSON.stringify(state[type]));
        },
        deleteItem: (state: any, action) => {
            const { id, type } = action.payload;
            const data = state[type];
            const index = getIndexById(data, id);
            state[type].splice(index, 1);
            saveToLocalStorage(type, JSON.stringify(state[type]));
        },
        likeItem: (state: any, action) => {
            const { id, type } = action.payload;
            const data = state[type];
            const index = getIndexById(data, id);
            state[type][index].likes++;
            saveToLocalStorage(type, JSON.stringify(state[type]));
        },
        updateItemDetails: (state: any, action) => {
            const { id, type, details } = action.payload;
            const data = state[type];
            const index = getIndexById(data, id);
            state[type][index].details = details;
            saveToLocalStorage(type, JSON.stringify(state[type]));
        }
    },
})

export const getAllTasks = (state: any) => state.taskDetails;

export const { addItem, likeItem, updateItemDetails, deleteItem} = taskDetailsSlice.actions

export default taskDetailsSlice.reducer;