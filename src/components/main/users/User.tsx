import React from 'react';
import s from "./users.module.css";
import {followAndUnfollowTC} from "../../../reducers/usersReducer";
import lostImage from "../../../img/anonim.jpeg";
import {UsersType} from "./UsersAPI";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../redux/redux-store";
import {Paginator} from "./Paginator";

export type UsersPropsType = {
    u: UsersType
    // totalUsersCount: number
    // pageSize: number
    // activePage: number
    // onClickHandler: (p: number) => void
    follow: ()=>void
    isDisabledArray: number[]
}

export const User = React.memo(({u, isDisabledArray, follow}: UsersPropsType) => {
    return (
        <div>
            <div>
                <NavLink to={`/profile/${u.id}`}>
                    <img className={s.avatar} src={u.photos.small ? u.photos.small : lostImage}></img>
                </NavLink>
                <div>{u.name}</div>
                {u.followed ? <button
                        disabled={isDisabledArray.some(el => el === u.id)}
                        onClick={follow}>FOLLOW</button>
                    : <button
                        disabled={isDisabledArray.some(el => el === u.id)}
                        onClick={follow}>UNFOLLOW</button>}
            </div>
            <div>
                {u.id}
            </div>
        </div>)
});
