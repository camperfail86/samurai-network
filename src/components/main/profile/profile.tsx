import s from './profile.module.css';
import {Posts} from '../posts/posts';
import React, {RefObject, useEffect, useRef} from 'react';
import {ActionType, PostsType} from "../../../App";
import {postsReducerAC} from "../../../reducers/postsReducer";
import {getStatusUserTC, ProfileType, setStatusUserTC} from "../../../reducers/profileReducer";
import {ProfileStatus} from "./profileStatus/ProfileStatus";
import {ProfileStatusClass} from "./profileStatus/ProfileStatusClass";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../redux/redux-store";

export type ProfilePropsType = {
    // posts: PostsType[]
    dispatch: (action: ActionType) => void
    // newPostElement: RefObject<HTMLTextAreaElement>
    // onClickHandler:() => void
    profile: ProfileType

    userId: number
}

export function Profile(props: ProfilePropsType) {
    let newPostElement = useRef<HTMLTextAreaElement>(null)
    const dispatch = useDispatch<AppDispatchType>()
    useEffect(() => {
        dispatch(getStatusUserTC(props.userId))
    }, []);
    const onClickHandler = () => {
        if (newPostElement.current) {
            let text = newPostElement.current.value
            props.dispatch(postsReducerAC(text))
            newPostElement.current.value = ''
        }
    }

    return (
        <>
            <div className={s.title}>
                ПРОФИЛЬ
            </div>
            <div>
                {props.profile ? <>
                        <img className={s.avatar} src={props.profile.photos.small ? props.profile.photos.small : ''}
                             alt=""/>
                        <span>{props.profile.fullName}</span>
                        <ProfileStatusClass status={props.profile.status} id={props.profile.userId} dispatch={dispatch}/>
                    </>
                    : <div className={s.loader}></div>}

            </div>
            {/*<Posts posts={props.posts}/>*/}
            {/*<div>*/}
            {/*    <textarea ref={newPostElement}></textarea>*/}
            {/*    <button onClick={onClickHandler}>+</button>*/}
            {/*</div>*/}
        </>
    )
}
