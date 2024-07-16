import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const localURL = "http://localhost:8050/api/specification";

export const specApi = createApi({
    reducerPath: "specApi",
    baseQuery: fetchBaseQuery({ baseUrl: localURL }),
    endpoints: (builder) => ({
        getSpecs: builder.query({
            query: () => "/",
            providesTags: ["Spec"],
        }),
        getSpecById: builder.query({
            query: (specification_id) => `/${specification_id}`,
            providesTags: ["Spec"],
        }),
        getSpecByProjectId: builder.query({
            query: (projet_id) => `/${projet_id}`,
            providesTags: ["Spec"],
        }),
        createSpec: builder.mutation({
            query: (body) => ({
                url: "/",
                method: "POST",
                body
            }),
            invalidatesTags: ["Spec"],
        }),
        updateSpec: builder.mutation({
            query: ({ id, ...spec }) => ({
                url: `/${id}`,
                method: "PUT",
                body: spec,
            }),
            invalidatesTags: ["Spec"],
        }),
        deleteSpec: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Spec"],
        }),
    }),
});

export const {
    useGetSpecsQuery,
    useGetSpecByIdQuery,
    useGetSpecByProjectIdQuery,
    useCreateSpecMutation,
    useUpdateSpecMutation,
    useDeleteSpecMutation,
} = specApi;