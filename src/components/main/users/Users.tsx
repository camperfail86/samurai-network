import React from 'react';
import s from "./users.module.css";
import {followAndUnfollowTC} from "../../../reducers/usersReducer";
import lostImage from "../../../img/anonim.jpeg";
import {UsersType} from "./UsersAPI";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../redux/redux-store";
import {Paginator} from "./Paginator";
import {User} from "./User";

export type UsersPropsType = {
    users: UsersType[]
    totalUsersCount: number
    pageSize: number
    activePage: number
    onClickHandler: (p: number) => void
    isDisabledArray: number[]
}

const Users = React.memo((props: UsersPropsType) => {

    const dispatch = useDispatch<AppDispatchType>()

    return (
        <div>
            <Paginator activePage={props.activePage} onClickHandler={props.onClickHandler}
                       pageSize={props.pageSize} totalUsersCount={props.totalUsersCount}/>
            {props.users.map(u => {
                const follow = () => {
                    dispatch(followAndUnfollowTC(u))
                }
                return <User key={u.id} u={u} isDisabledArray={props.isDisabledArray} follow={follow}/>
            })
            }
        </div>
    );
});

export default Users;

// <div key={u.id}>
//     <div>
//         <NavLink to={`/profile/${u.id}`}>
//             <img className={s.avatar} src={u.photos.small ? u.photos.small : lostImage}></img>
//         </NavLink>
//         <div>{u.name}</div>
//         {u.followed ? <button
//                 disabled={props.isDisabledArray.some(el => el === u.id)}
//                 onClick={follow}>FOLLOW</button>
//             : <button
//                 disabled={props.isDisabledArray.some(el => el === u.id)}
//                 onClick={follow}>UNFOLLOW</button>}
//     </div>
//     <div>
//         {u.id}
//     </div>
// </div>