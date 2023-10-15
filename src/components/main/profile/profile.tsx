import s from './profile.module.css';
import {Posts} from '../posts/posts';
import {ChangeEvent, useState} from 'react';
import {PostsType} from "../../../App";
import {state, subscribe} from "../../../redux/state";

export type ProfilePropsType = {
    posts: PostsType[]
    addPost: (post: string) => void
}

export function Profile(props: ProfilePropsType) {
    const [value, setValue] = useState('')
    const onClickHandler = () => {
        props.addPost(value)
        setValue('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        <>
            <img src="" alt=""/>
            <div className={s.title}>
                ПРОФИЛЬ
            </div>
            <Posts posts={props.posts}/>
            <div>
                <textarea onChange={onChangeHandler} title={value} cols={20} rows={3}></textarea>
                <button onClick={onClickHandler}>+</button>
            </div>
        </>
    )
}
