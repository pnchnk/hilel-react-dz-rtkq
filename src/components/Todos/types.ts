import { ITodo } from "../../types"

export interface ITodoSortProps {
    userSort: string,
    onSelect: (e : React.ChangeEvent<HTMLSelectElement>) => void,
    userIdArr: Set<number>
}

export interface ITodoPaginationProps {
    sortedList: ITodo[],
    page: number, 
    setPage: (page: number) => void
}