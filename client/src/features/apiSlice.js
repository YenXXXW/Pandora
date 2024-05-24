import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  credentials:"include"
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["POSTS"],
  prepareHeaders(headers) {
    return headers;
  },
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({}),
});
