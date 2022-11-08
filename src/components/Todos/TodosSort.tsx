import React, { FC } from 'react';
import { ITodoSortProps } from './types';

const TodosSort: FC<ITodoSortProps> = ({ userSort, onSelect, userIdArr }) => {
    return (
        <select value={userSort} onChange={onSelect}>
            <option selected value={'all'}>All</option>
            {
                [...userIdArr]?.map(id => <option key={id} value={id}>UserId:{id}</option>)
            }
        </select>
    )
};

export default TodosSort;