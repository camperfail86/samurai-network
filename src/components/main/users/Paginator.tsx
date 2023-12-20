import React from 'react';
import s from "./users.module.css";

type PaginatorPropsType = {
    totalUsersCount: number
    pageSize: number
    activePage: number
    onClickHandler: (p: number) => void
}

export const Paginator = (props: PaginatorPropsType) => {
    let pages = []
    let countSize = Math.ceil(props.totalUsersCount / props.pageSize)
    for (let i = 1; i < countSize + 2; i++) {
        pages.push(i)
    }
    return (
        <div>
            {pages.map(p => {
                return (
                    <span className={props.activePage === p ? s.active : s.page}
                          onClick={() => props.onClickHandler(p)}>{p}</span>
                )
            })}
        </div>
    )
}
