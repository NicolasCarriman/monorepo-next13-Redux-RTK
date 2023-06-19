import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { ITask } from "../../../models";

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  tagTypes: ['task'],
  endpoints: (builder) => ({
    search: builder.query<ITask[], string>({
      query: (q) => `tasks?taskName=${q}`,
      providesTags: (result, error, search) => [{ type: 'task', search }],
    }),
    priority: builder.query<ITask[], string>({
      query: (q) => `tasks?taskPriority=${q}`,
      providesTags: (result, error, priority) => [{ type: 'task', priority }],
    }),
    filter: builder.query<ITask[], ITask>({
      query: (f) => `tasks?${f}`,
      providesTags: (result, error, filter) => [{ type: 'task', filter }],
    }) 
  }),
});
