import s from './profile.module.css';
import {Posts} from '../posts/posts';
import {RefObject, useRef} from 'react';
import {ActionType, PostsType} from "../../../App";
import {postsReducerAC} from "../../../reducers/postsReducer";
import {ProfileType} from "../../../reducers/profileReducer";

export type ProfilePropsType = {
    // posts: PostsType[]
    dispatch: (action: ActionType) => void
    // newPostElement: RefObject<HTMLTextAreaElement>
    // onClickHandler:() => void
    profile: ProfileType
}

export function Profile(props: ProfilePropsType) {
    let newPostElement = useRef<HTMLTextAreaElement>(null)
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
            <img className={s.avatar} src={props.profile.photos.small ? props.profile.photos.small : ''} alt=""/>
            <span>{props.profile.fullName}</span>
            {/*<Posts posts={props.posts}/>*/}
            <div>
                <textarea ref={newPostElement}></textarea>
                <button onClick={onClickHandler}>+</button>
            </div>
        </>
    )
}
