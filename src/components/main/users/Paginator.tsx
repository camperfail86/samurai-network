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
