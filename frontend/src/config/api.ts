export const isDev = process.env.NODE_ENV === "development"

export const ApiUrl = isDev ? "http://127.0.0.1:4455/api/" : ""
