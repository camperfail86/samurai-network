import s from './profile.module.css';
import {Posts} from '../posts/posts';
import {useRef} from 'react';
import {PostsType} from "../../../App";

export type ProfilePropsType = {
    posts: PostsType[]
    addPost: (post: string) => void
}

export function Profile(props: ProfilePropsType) {
    // const [value, setValue] = useState('')
    let newPostElement = useRef<HTMLTextAreaElement>(null)
    const onClickHandler = () => {
        // props.addPost(value)
        // setValue('')
        if (newPostElement.current) {
            let text = newPostElement.current.value
            props.addPost(text)
            newPostElement.current.value = ''
        }
    }
    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setValue(e.currentTarget.value)
    // }

    return (
        <>
            <img src="" alt=""/>
            <div className={s.title}>
                ПРОФИЛЬ
            </div>
            <Posts posts={props.posts}/>
            <div>
                {/*<input onChange={onChangeHandler} title={value}></input>*/}
                <textarea ref={newPostElement}></textarea>
                <button onClick={onClickHandler}>+</button>
            </div>
        </>
    )
}
