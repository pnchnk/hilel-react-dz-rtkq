import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const postsApi = createApi({
    reducerPath:'postsApi',
    baseQuery: fetchBaseQuery({baseUrl:"https://jsonplaceholder.typicode.com/"}),
    endpoints: (builder) => ({
        getAllPosts: builder.query({
            query: () => 'posts',
            transformResponse:(response) => {
                return response.sort((a,b)=> b.id - a.id)
            }
        }),
    }) 

})

export const {useGetAllPostsQuery} = postsApi;

export default postsApi;