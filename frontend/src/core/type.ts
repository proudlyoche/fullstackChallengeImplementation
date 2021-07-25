export interface UserSliceState {
  users: Array<UserType>
  user: UserType | null
  creating: "idle" | "loading" | "succeeded" | "failed"
  updating: "idle" | "loading" | "succeeded" | "failed"
  deleting: "idle" | "loading" | "succeeded" | "failed"
  status: "idle" | "loading" | "succeeded" | "failed"
  message: string
  action: "create" | "update" | "get" | null
  modalState: {
    status: boolean
    type: "create" | "update"
  }
}

export interface UserType {
  _id: string
  name: string
  email: string
  role: string
}

export interface UserParamType {
  _id?: string
  name?: string
  email?: string
  role?: string
}

export interface UserCreateParamType {
  name: string
  email: string
  role: string
}
