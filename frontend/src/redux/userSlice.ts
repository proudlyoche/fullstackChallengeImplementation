import { toast } from "react-toastify"
import { UserCreateParamType, UserParamType } from "../core/type"
import { get, deleteUser, update, create } from "../config/axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { UserSliceState } from "../core/type"

// to get all users

export const getUsers = createAsyncThunk("fetchUsers", async () => {
  try {
    const response = await get("users")
    return response.data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
})

// delete user record

export const deleteRecord = createAsyncThunk(
  "deleteUser",
  async (id: string) => {
    try {
      const response = await deleteUser(`user?userID=${id}`)
      return { response: response.data, id }
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }
)

// update users record

export const updateUser = createAsyncThunk(
  "updateUser",
  async (props: UserParamType) => {
    const { _id, ...rest } = props
    try {
      const response = await update("users", {
        userID: _id,
        ...rest,
      })
      return props
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }
)

// create new user

export const createUser = createAsyncThunk(
  "createUser",
  async (props: UserCreateParamType) => {
    try {
      const response = await create("users", {
        name: props.name,
        email: props.email,
        role: props.role,
      })
      return response.data
    } catch (error) {
      throw new Error(error.response.data.message)
    }
  }
)

const initialState: UserSliceState = {
  message: "",
  users: [],
  user: null,
  action: null,
  status: "idle",
  deleting: "idle",
  creating: "idle",
  updating: "idle",
  modalState: {
    status: false,
    type: "create",
  },
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleModal(state) {
      state.modalState.status = !state.modalState.status
      state.modalState.type = "create"
      state.message = ""
      state.user = null
    },
    showUpdateModal(state, action) {
      state.modalState.status = true
      state.modalState.type = "update"
      state.message = ""
      state.user = { ...action.payload }
    },
  },
  extraReducers: {
    // get all users

    [getUsers.pending.toString()]: (state) => {
      state.status = "loading"
    },
    [getUsers.fulfilled.toString()]: (state, action) => {
      state.status = "succeeded"
      state.users = [...action.payload.users]
    },
    [getUsers.rejected.toString()]: (state, action) => {
      state.status = "failed"
      state.message = action.error.message

      toast.error(
        "Error getting users, please check connection and try again",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      )
    },

    // create new user

    [createUser.pending.toString()]: (state) => {
      state.creating = "loading"
    },
    [createUser.fulfilled.toString()]: (state, action) => {
      state.creating = "succeeded"
      state.message = "user created"
      state.modalState.status = false
      state.users.push(action.payload.user)
      toast.success("user created", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    },
    [createUser.rejected.toString()]: (state, action) => {
      state.creating = "failed"
      state.message = action.error.message

      toast.error(action.error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    },

    // update user

    [updateUser.pending.toString()]: (state) => {
      state.updating = "loading"
    },
    [updateUser.fulfilled.toString()]: (state, action) => {
      state.updating = "succeeded"

      const index = state.users
        .map(function (e) {
          return e._id
        })
        .indexOf(action.payload._id)

      state.users[index] = { ...action.payload }

      toast.success("user information updated", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    },

    [updateUser.rejected.toString()]: (state, action) => {
      state.updating = "failed"
      state.message = action.error.message
      toast.error(action.error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    },

    // delete user

    [deleteRecord.pending.toString()]: (state) => {
      state.deleting = "loading"
    },
    [deleteRecord.fulfilled.toString()]: (state, action) => {
      state.deleting = "succeeded"

      const newData = state.users.filter(function (e) {
        return e._id !== action.payload.id
      })

      console.log(action.payload)

      state.users = [...newData]

      toast.success(action.payload.response.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    },
    [deleteRecord.rejected.toString()]: (state, action) => {
      state.deleting = "failed"
      state.message = action.error.message
      toast.error(action.error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    },
  },
})

export const { toggleModal, showUpdateModal } = userSlice.actions
export default userSlice.reducer
