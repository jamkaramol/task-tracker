import { createSlice } from '@reduxjs/toolkit';
import { SWIM_LANE_TYPES, DEFAULT_LANES } from './constants';

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

function createInitialState() {
    let allLanes: any = getLocalStorageOnLoad("all_lanes");
    if (!allLanes.length) {
        localStorage.setItem("all_lanes", JSON.stringify(DEFAULT_LANES));
        allLanes = DEFAULT_LANES;
    }
    let map: any = {};
    allLanes.forEach((lane: string) => {
        map[lane] = getLocalStorageOnLoad(lane);
    });
    return map;
};

export const taskDetailsSlice = createSlice({
    name: 'tasksDetails',
    initialState: createInitialState(),
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
        },
        addNewLane: (state: any, action) => {
            const { laneName } = action.payload;
            const all_lanes = getLocalStorageOnLoad("all_lanes");
            all_lanes.push(laneName);
            localStorage.setItem("all_lanes", JSON.stringify(all_lanes));
            state[laneName] = [];
        },
        deleteLane: (state: any, action) => {
            const { laneName } = action.payload;
            console.log(laneName);
            const all_lanes = getLocalStorageOnLoad("all_lanes");
            const index = all_lanes.findIndex((name: string) => laneName === name);
            all_lanes.splice(index, 1);
            localStorage.setItem("all_lanes", JSON.stringify(all_lanes));
            localStorage.removeItem(laneName);
            delete state[laneName];
        }
    },
})

export const getAllTasks = (state: any) => state.taskDetails;

export const { addItem, likeItem, updateItemDetails, deleteItem, addNewLane, deleteLane } = taskDetailsSlice.actions

export default taskDetailsSlice.reducer;