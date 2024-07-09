import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const localURL = "http://localhost:8050/api/projet";
export const projetsApi = createApi({
    reducerPath: "projetsApi",
    baseQuery: fetchBaseQuery({ baseUrl: localURL }),
    endpoints: (builder) => ({
        getProjets: builder.query({
            query: () => "/",
            providesTags: ["Projet"],
        }),
        getProjetById: builder.query({
            query: (id) => `projet/${id}`,
            providesTags: ["Projet"],
        }),
        addProjet: builder.mutation({
            query: (projet) => ({
                url: "/",
                method: "POST",
                body: projet,
            }),
            invalidatesTags: ["Projet"],
        }),
        updateProjet: builder.mutation({
            query: ({ id, ...projet }) => ({
                url: `projet/${id}`,
                method: "PUT",
                body: projet,
            }),
            invalidatesTags: ["Projet"],
        }),
        deleteProjet: builder.mutation({
            query: (id) => ({
                url: `projet/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Projet"],
        }),
    }),
});

export const {
    useGetProjetsQuery,
    useGetProjetByIdQuery,
    useAddProjetMutation,
    useUpdateProjetMutation,
    useDeleteProjetMutation,
} = projetsApi;