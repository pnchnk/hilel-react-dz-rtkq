import {useMemo} from "react";
import { ITodo } from "../types";

const useFilterTodos = (page: number, sortedList: ITodo[]): ITodo[] => {
    return useMemo(() => {
        const start = (page - 1) * 20;
        const end = start + 20;
        return sortedList.slice(start, end).sort((a,b)=> a.id - b.id);
    }, [page, sortedList])
}

export default useFilterTodos;