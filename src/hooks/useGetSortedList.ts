import {useMemo} from "react";
import { ITodo } from "../types";

const useGetSortedList = (
    showCompleted: boolean,
    posts: ITodo[],
    userSort: any,

) : ITodo[] => {
    return useMemo(() => {
        const sortList = showCompleted ? posts.filter(item=> item.completed) : posts;
        if(userSort === 'all'){
            return sortList;
        }
        return sortList.filter(item => item.userId === +userSort).sort((a,b)=> a.id - b.id)
    }, [posts, userSort, showCompleted])
};

export default useGetSortedList;