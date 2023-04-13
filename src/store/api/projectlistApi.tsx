import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

interface State{
    projectModalOpen: boolean;
}

const initialState:State={
    projectModalOpen: false
}

export const projectListApi = createSlice({
    name:'projectListApi',
    initialState,
    reducers:{
        openProjectModal(state){
            state.projectModalOpen=true
        },
        closeProjectModal(state){state.projectModalOpen=false}
    }
    
})
export const projectListActions=projectListApi.actions;

export const selectProjectModalOpen=(state:RootState)=>state.projectListApi.projectModalOpen;