import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const postsApi = createApi({
    reducerPath:'postsApi',
    baseQuery: fetchBaseQuery({baseUrl:"https://jsonplaceholder.typicode.com/"}),
    endpoints: (builder) => ({
        getAllPosts: builder.query({
            query: () => 'todos',
            transformResponse:(response) => {
                return response.sort((a,b)=> a.id - b.id)
            }
        }),
    }) 

})

export const {useGetAllPostsQuery} = postsApi;

export default postsApi;