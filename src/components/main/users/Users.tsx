import React from 'react';
import s from "./users.module.css";
import {followAndUnfollowTC, followUserAC, toggleDisabledAC} from "../../../reducers/usersReducer";
import lostImage from "../../../img/anonim.jpeg";
import {ActionType, config} from "../../../App";
import {UsersType} from "./UsersAPI";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {userApi} from "../../../api/users-api";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../redux/redux-store";

export type UsersPropsType = {
    users: UsersType[]
    // dispatch: (action: ActionType) => void
    totalUsersCount: number
    pageSize: number
    activePage: number
    onClickHandler: (p: number) => void
    isDisabledArray: number[]
    // isDisabled: boolean
}

const Users = (props: UsersPropsType) => {

    const dispatch = useDispatch<AppDispatchType>()
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
            {props.users.map(u => {
                const follow = () => {
                    dispatch(followAndUnfollowTC(u))
                }
                return (<div key={u.id}>
                    <div>
                        <NavLink to={`/profile/${u.id}`}>
                            <img className={s.avatar} src={u.photos.small ? u.photos.small : lostImage}></img>
                        </NavLink>
                        <div>{u.name}</div>
                        {u.followed ? <button
                                disabled={props.isDisabledArray.some(el => el === u.id)}
                                onClick={follow}>FOLLOW</button>
                            : <button
                                disabled={props.isDisabledArray.some(el => el === u.id)}
                                onClick={follow}>UNFOLLOW</button>}
                    </div>
                    <div>
                        {u.id}
                    </div>
                </div>)
            })
            }
        </div>
    );
};

export default Users;