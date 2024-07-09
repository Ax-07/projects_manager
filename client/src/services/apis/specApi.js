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
            query: (id) => `/${id}`,
            providesTags: ["Spec"],
        }),
        addSpec: builder.mutation({
            query: (spec) => ({
                url: "/",
                method: "POST",
                body: spec,
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
} = specApi;