import React from 'react';
import s from "./users.module.css";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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

    const onClickButton = (activePage: number) => {
        props.onClickHandler(activePage)
    }

    return (
        <div className={s.paginator}>
            {/*<button onClick={() => onClickButton(props.activePage - 1)}>prev</button>*/}
            {/*{pages.map((p, index) => {*/}
            {/*    return (*/}
            {/*        <span key={index} className={props.activePage === p ? s.active : s.page}*/}
            {/*              onClick={() => props.onClickHandler(p)}>{p}</span>*/}
            {/*    )*/}
            {/*})}*/}
            {/*<button onClick={() => onClickButton(props.activePage + 1)}>next</button>*/}
            <Stack spacing={2}>
                <Pagination
                    className={s.pagination}
                    count={countSize}
                    page={props.activePage}
                    onChange={(e, num) => onClickButton(num)}
                    showFirstButton showLastButton
                />
            </Stack>
        </div>
    )
}
