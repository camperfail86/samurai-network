import s from './profile.module.css';
import React, {useEffect} from 'react';
import {postsReducerAC} from "../../../reducers/postsReducer";
import {getStatusUserTC, ProfileType, setStatusUserTC} from "../../../reducers/profileReducer";
import {ProfileStatus} from "./profileStatus/ProfileStatus";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType} from "../../../redux/redux-store";
import {useForm} from "react-hook-form";
import {postsSelector} from "../../../selectors/selectors";
import lostImage from "../../../img/anonim.jpeg";
import vk from "../../../img/icons8-vk-48.png"
import gh from "../../../img/github-icon.png"

export type ProfilePropsType = {
    profile: ProfileType
    userId: number
}

export function Profile({userId, profile}: ProfilePropsType) {

    const posts = useSelector(postsSelector)
    const dispatch = useDispatch<AppDispatchType>()

    useEffect(() => {
        dispatch(getStatusUserTC(userId))
    }, []);

    // const onClickHandler = () => {
    //       if (newPostElement.current) {
    //             let text = newPostElement.current.value
    //             props.dispatch(postsReducerAC(text))
    //             newPostElement.current.value = ''
    //         }
    // }

    const {formState: {errors}, register, handleSubmit} = useForm(
        {
            defaultValues: {
                newPostElement: '',
            },
        }
    )
    const onSubmit = (data: any) => {
        console.log(data)
        if (data.newPostElement) {
            dispatch(postsReducerAC(data.newPostElement))
            data.newPostElement = ''
        }
    }

    return (
        <>
            <div className={s.title}>
                ПРОФИЛЬ
            </div>
            <div>
                {profile
                    ? <>
                        <div className={s.avatarAndName}>
                            <img className={s.avatar} src={profile.photos.large ? profile.photos.large : lostImage}
                                 alt=""/>
                            <span>{profile.fullName}</span>
                        </div>
                        <ProfileStatus mainStatus={profile.status} id={profile.userId}/>
                        {profile.contacts.vk &&
                          <div className={s.infoSocial}>
                            <img className={s.icon} src={vk} alt=""/>
                            <a className={s.link} href={profile.contacts.vk}>{profile.contacts.vk}</a>
                          </div>
                        }
                        {profile.contacts.github &&
                          <div className={s.infoSocial}>
                            <img className={s.icon} src={gh} alt=""/>
                            <a className={s.link} href={profile.contacts.github}>{profile.contacts.github}</a>
                          </div>
                        }
                    </>
                    : <div className={s.loader}></div>}
            </div>
        </>
    )
}

{/*<Posts posts={posts}/>*/
}
{/*<div>*/
}
{/*    <form onSubmit={handleSubmit(onSubmit)}>*/
}
{/*        <textarea {...register('newPostElement', {*/
}
{/*            validate: (value: any) => {*/
}
{/*                if (value.length < 5) {*/
}
{/*                    return 'login must be more than 6 characters'*/
}
{/*                }*/
}
{/*            }*/
}
{/*        })}></textarea>*/
}
{/*        /!*<input type='submit' value='Добавить пост'/>*!/*/
}
{/*        /!*<span> {errors.newPostElement && <span>{errors.newPostElement.message}</span>}</span>*!/*/
}
{/*    </form>*/
}
{/*</div>*/
}