import s from './profile.module.css';
import {Posts} from '../posts/posts';
import React, {RefObject, useEffect, useRef} from 'react';
import {ActionType, PostsType} from "../../../App";
import {postsReducerAC} from "../../../reducers/postsReducer";
import {getStatusUserTC, ProfileType, setStatusUserTC} from "../../../reducers/profileReducer";
import {ProfileStatus} from "./profileStatus/ProfileStatus";
import {ProfileStatusClass} from "./profileStatus/ProfileStatusClass";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, AppStateType} from "../../../redux/redux-store";
import {SubmitHandler, useForm} from "react-hook-form";
import {postsSelector} from "../../../selectors/selectors";

export type ProfilePropsType = {
    // posts: PostsType[]
    dispatch: (action: ActionType) => void
    // newPostElement: RefObject<HTMLTextAreaElement>
    // onClickHandler:() => void
    profile: ProfileType

    userId: number
}

export function Profile(props: ProfilePropsType) {

    const posts = useSelector(postsSelector)
    // let newPostElement = useRef<HTMLTextAreaElement>(null)
    const dispatch = useDispatch<AppDispatchType>()

    useEffect(() => {
        dispatch(getStatusUserTC(props.userId))
    }, []);

    // const onClickHandler = () => {
    //       if (newPostElement.current) {
    //             let text = newPostElement.current.value
    //             props.dispatch(postsReducerAC(text))
    //             newPostElement.current.value = ''
    //         }
    // }

    const {formState: {errors}, register, handleSubmit } = useForm(
        {
            defaultValues: {
                newPostElement: '',
            },
        }
    )
    const onSubmit = (data: any) => {
        console.log(data)
        if (data.newPostElement) {
            props.dispatch(postsReducerAC(data.newPostElement))
            data.newPostElement = ''
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
            <Posts posts={posts}/>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <textarea {...register('newPostElement', {
                        validate: (value: any) => {
                            if (value.length < 5) {
                                return 'login must be more than 6 characters'
                            }
                        }
                    })}></textarea>
                    {/*ref={newPostElement}*/}
                    <input type='submit' value='+'/>
                    <span> {errors.newPostElement && <span>{errors.newPostElement.message}</span>}</span>
                    {/*onClick={onClickHandler}*/}
                </form>
            </div>
        </>
    )
}
