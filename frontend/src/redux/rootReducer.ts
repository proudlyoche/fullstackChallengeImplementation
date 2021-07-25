import userSlice from "./userSlice"
import { combineReducers } from "@reduxjs/toolkit"

const rootReducer = combineReducers({
  user: userSlice,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
