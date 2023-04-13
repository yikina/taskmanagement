import { configureStore } from "@reduxjs/toolkit"
import { projectListApi } from "./api/projectlistApi";

export const rootReducer={
    projectListApi:projectListApi.reducer
}

export const store=configureStore({
    reducer:rootReducer
})

export type AppDispatch=typeof store.dispatch;
export type RootState=ReturnType<typeof store.getState>;