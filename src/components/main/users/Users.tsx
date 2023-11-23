import React from 'react';
import s from "./users.module.css";
import {followUserAC, toggleDisabledAC} from "../../../reducers/usersReducer";
import lostImage from "../../../img/anonim.jpeg";
import {ActionType, config} from "../../../App";
import {UsersType} from "./UsersAPI";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {userApi} from "../../../api/users-api";

export type UsersPropsType = {
    users: UsersType[]
    dispatch: (action: ActionType) => void
    totalUsersCount: number
    pageSize: number
    activePage: number
    onClickHandler: (p: number) => void
    isDisabled: boolean
}

const Users = (props: UsersPropsType) => {

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
                    props.dispatch(toggleDisabledAC(true))
                    u.followed ?
                        // axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {} ,config)
                        userApi.unfollow(u.id)
                            .then((res) => {
                                    props.dispatch(followUserAC(false, u.id))
                                    props.dispatch(toggleDisabledAC(false))
                                }
                            ) :
                        userApi.follow(u.id)
                            .then((res) => {
                                props.dispatch(followUserAC(true, u.id))
                                props.dispatch(toggleDisabledAC(false))
                            })

                }
                return (<div key={u.id}>
                    <div>
                        <NavLink to={`/profile/${u.id}`}>
                            <img className={s.avatar} src={u.photos.small ? u.photos.small : lostImage}></img>
                        </NavLink>
                        <div>{u.name}</div>
                        {u.followed ? <button
                                disabled={props.isDisabled}
                                onClick={follow}>FOLLOW</button>
                            : <button
                                disabled={props.isDisabled}
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