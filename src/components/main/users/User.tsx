import React from 'react';
import s from "./users.module.css";
import lostImage from "../../../img/anonim.jpeg";
import {UsersType} from "./UsersAPI";
import {NavLink} from "react-router-dom";

export type UsersPropsType = {
    u: UsersType
    follow: ()=>void
    isDisabledArray: number[]
}

export const User = React.memo(({u, isDisabledArray, follow}: UsersPropsType) => {
    return (
        <div className={s.user}>
            <div>
                <NavLink to={`/profile/${u.id}`}>
                    <img alt='Аватар' className={s.avatar} src={u.photos.small ? u.photos.small : lostImage}/>
                </NavLink>
                <div className={s.userName}>{u.name}</div>
                <div>
                {u.followed ? <button
                        disabled={isDisabledArray.some(el => el === u.id)}
                        onClick={follow}>FOLLOW</button>
                    : <button
                        disabled={isDisabledArray.some(el => el === u.id)}
                        onClick={follow}>UNFOLLOW</button>}
                </div>
            </div>
            <div>
                {u.id}
            </div>
        </div>)
});
