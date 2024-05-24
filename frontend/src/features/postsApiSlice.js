import { apiSlice } from "./apiSlice";

const POSTS_URL = "/api/posts/";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: `${POSTS_URL}`,
        method: "GET",
      }),
      providesTags: ["POSTS"]
    }),

    getPostbyId: builder.query({
      query: (id) => ({
        url: `${POSTS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["POSTS"]
    }),

    updatePost: builder.mutation({
      query: ({data, id}) => ({
        url: `${POSTS_URL}${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["POSTS"]
    }),

    createPost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/post`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["POSTS"],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `${POSTS_URL}${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["POSTS"],
    }),
   
  }),
});

export const { useGetPostsQuery , useGetPostbyIdQuery , useUpdatePostMutation, useDeletePostMutation, useCreatePostMutation} = postsApiSlice;
