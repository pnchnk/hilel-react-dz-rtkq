import React, { FC, useMemo } from 'react';
import { ITodoPaginationProps } from './types';

const TodosPagination:FC<ITodoPaginationProps> = ({ sortedList, page, setPage }) => {
    const paginationNumbers = useMemo(() => sortedList?.length > 20 ? Math.round(sortedList.length / 20) : 1, [sortedList]);

    return (
        <div className="todos__pagination">
            {
                [...Array(paginationNumbers)]?.map((_, idx) => {
                    return (
                        <button key={idx} className={`todos-pagination ${(page === idx + 1) && 'todos-pagination--active'}`}
                            onClick={() => setPage(idx + 1)}>
                            <span className="todos-pagination__num">{idx + 1}</span>
                        </button>
                    )
                })
            }
        </div>
    )
}

export default TodosPagination;