import s from './profile.module.css';
import React, {useRef} from 'react';
import {ActionType, PostsType} from "../../../App";
import {postsReducerAC} from "../../../reducers/postsReducer";
import {Profile} from "./profile";
import axios from "axios";
import {addProfileInfoAC, ProfileType} from "../../../reducers/profileReducer";

export type ProfilePropsType = {
    posts: PostsType[]
    dispatch: (action: ActionType) => void
    profile: ProfileType
}

export class ProfileContainer extends React.Component<ProfilePropsType, {}> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${this.props.profile.userId}`).then((res) =>
            this.props.dispatch(addProfileInfoAC(res.data))
        )
    }

    render()
    {
        return (
            <>
                <Profile
                    profile={this.props.profile}
                    posts={this.props.posts} dispatch={this.props.dispatch}/>
            </>
        )
    }
}
