import { apiSlice } from "@/store/api/apiSlice";

export const shopApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProposals: builder.query({
      query: () => "proposals",
    }),
    getProposal: builder.query({
      query: (id) => `/proposals/${id}`,
    }),
  }),
});
export const { useGetProposalsQuery, useGetProposalQuery } = shopApi;
