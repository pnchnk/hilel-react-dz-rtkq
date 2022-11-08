import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { ITodo } from '../../types';

export const postsApi = createApi({
    reducerPath:'postsApi',
    baseQuery: fetchBaseQuery({baseUrl:"https://jsonplaceholder.typicode.com/"}),
    endpoints: (builder) => ({
        getAllPosts: builder.query<ITodo[], void>({
            query: () => 'todos',
            transformResponse:(response : ITodo[]) => {
                return response.sort((a,b)=> a.id - b.id)
            }
        }),
    }) 

})

export const {useGetAllPostsQuery} = postsApi;

export default postsApi;