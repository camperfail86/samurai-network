import React, {useState} from 'react';
import lostImage from './../../../img/anonim.jpeg';
import s from './users.module.css'
import {ActionType, config} from "../../../App";
import {
    addUsersAC,
    followUserAC,
    setTotalCountAC,
    ToggleActivePageAC,
    toggleFetchingAC
} from "../../../reducers/usersReducer";
import axios from "axios";
import Users from "./Users";

export type UsersType = {
    followed: boolean
    id: number
    name: string
    photos: { small: null, large: null }
    status: null,
    uniqueUrlName: null
}

export type UsersAPITypeProps = {
    users: UsersType[]
    dispatch: (action: ActionType) => void
    totalUsersCount: number
    pageSize: number
    activePage: number
    isFetching: boolean
}

// export const Users = ({users, dispatch}: UsersTypeProps) => {
//
//     return (
//         <div>
//             {users.map(u => {
//                 const follow = ()=> {
//                     dispatch(followUserAC(u.id))
//                 }
//                 return (<div key={u.id}>
//                     <div>
//                         <img className={s.avatar} src={lostImage}></img>
//                         <div>{u.name}</div>
//                         {u.followed ? <button onClick={follow}>FOLLOW</button>
//                                   : <button onClick={follow}>UNFOLLOW</button>}
//                     </div>
//                     <div>
//                         {u.id}
//                     </div>
//                 </div>)
//             })
//             }
//         </div>
//     );
// };

export class UsersAPI extends React.Component<UsersAPITypeProps, {}> {
    componentDidMount() {
        // axios.get('https://social-network.samuraijs.com/api/1.0/users', config)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.activePage}&count=${this.props.pageSize}`, config)
            .then(res => {
                this.props.dispatch(addUsersAC(res.data.items))
                // this.props.dispatch(setTotalCountAC(res.data.totalCount))
                this.props.dispatch(toggleFetchingAC(false))
            })
    }

    onClickHandler = (p: number) => {
        this.props.dispatch(ToggleActivePageAC(p))
        this.props.dispatch(toggleFetchingAC(true))
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.pageSize}`, config)
            .then(res => {
                this.props.dispatch(addUsersAC(res.data.items))
                this.props.dispatch(toggleFetchingAC(false))
            })
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <div className={s.loader}></div> :
                    <Users
                        totalUsersCount={this.props.totalUsersCount}
                        pageSize={this.props.pageSize}
                        users={this.props.users}
                        activePage={this.props.activePage}
                        dispatch={this.props.dispatch}
                        onClickHandler={this.onClickHandler}
                    />}
            </>
        )
    }
};
