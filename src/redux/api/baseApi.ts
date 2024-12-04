import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://wesoftin-backend.vercel.app",
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => {
        return {
          url: `users?sort=asc`,
          method: "GET",
        };
      },
      providesTags: ["users"],
    }),
    addUsers: builder.mutation({
      query: (data) => {
        return { url: "/users", method: "POST", body: data };
      },
      invalidatesTags: ["users"],
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});
export const {
  useGetUsersQuery,
  useAddUsersMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
  useDeleteUserMutation
} = baseApi;
