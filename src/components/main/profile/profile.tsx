import s from './profile.module.css';
import React, {useEffect, useState} from 'react';
import {changePhotoTC, getStatusUserTC, ProfileType, setProfileInfoTC} from "../../../reducers/profileReducer";
import {ProfileStatus} from "./profileStatus/ProfileStatus";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../redux/redux-store";
import {useForm} from "react-hook-form";
import lostImage from "../../../img/anonim.jpeg";
import vk from "../../../img/icons8-vk-48.png"
import gh from "../../../img/github-icon.png"

export type ProfilePropsType = {
    profile: ProfileType
    userId: number
}

export type PhotoType = {
    lastModified: number
    lastModifiedDate: string
    name: string
    size: number
    type: string
    webkitRelativePath: string
}

export type Profile = {
    vk: null | string,
    github: null | string,
    lookingForAJob: boolean,
    lookingForAJobDescription: null | string,
}

export function Profile({userId, profile}: ProfilePropsType) {
    const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch<AppDispatchType>()
    const isOwner = userId === 30118

    const onChangePhoto = (e: any) => {
        if (e.target.files.length) {
            dispatch(changePhotoTC(e.target.files[0]))
        }
    }

    const onClickEdit = () => {
        setEditMode(true)
    }

    useEffect(() => {
        dispatch(getStatusUserTC(userId))
    }, []);

    const { register, handleSubmit} = useForm(
            //     // AboutMe: '',
            //     // FullName: '',
            //     // lookingForAJobDescription: '',
            //     // vk: '',
            //     // github: ''
            //     lookingForAJob: profile.lookingForAJob,
            //     AboutMe: profile.aboutMe,
            //     FullName: profile.fullName,
            //     lookingForAJobDescription: profile.lookingForAJobDescription,
            //     vk: profile.contacts.vk,
            //     github: profile.contacts.github
            // },
        // }
    )
    const onSubmit = (data: any) => {
        setEditMode(false)
        dispatch(setProfileInfoTC(data))
    }

    console.log(profile.lookingForAJob)

    return (
        <>
            <div className={s.title}>
                PROFILE
            </div>
            <div>
                {profile
                    ? <>
                        <div className={s.avatarAndName}>
                            <img className={s.avatar} src={profile.photos.large || lostImage}
                                 alt=""/>
                            {isOwner && <input type='file' onChange={onChangePhoto}/>}
                            <span>{profile.fullName}</span>
                        </div>
                        <ProfileStatus mainStatus={profile.status} id={profile.userId}/>
                        {isOwner &&
                          <>
                              {editMode ? null :
                                  <button onClick={onClickEdit}>edit</button>}
                          </>
                        }
                        {!editMode
                            ?
                            <div className={s.infoProfile}>
                                <div>
                                    <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
                                    <div>
                                        <b>Description:</b> {profile.lookingForAJobDescription ?
                                        <span>{profile.lookingForAJobDescription}</span> : '-'}
                                    </div>
                                </div>
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
                            </div>
                            :
                            // EDIT MODE -----------------------------------
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <b>Looking for a job:</b>
                                    <input type="checkbox" {...register("lookingForAJob")} />
                                    <div>
                                        <b>Description:</b>
                                        <input {...register("lookingForAJobDescription")}/>
                                    </div>
                                </div>
                                <div className={s.infoSocial}>
                                    <img className={s.icon} src={vk} alt=""/>
                                    <input {...register('vk')} type="text"
                                           defaultValue={profile.contacts.vk ? profile.contacts.vk : ''}
                                    />
                                </div>
                                <div className={s.infoSocial}>
                                    <img className={s.icon} src={gh} alt=""/>
                                    <input {...register('github')} type="text"
                                           defaultValue={profile.contacts.github ? profile.contacts.github : ''}
                                    />
                                </div>
                                <input type='submit'/>
                            </form>
                        }
                    </>
                    : <div className={s.loader}></div>}
            </div>
        </>
    )
}

// const onClickHandler = () => {
//       if (newPostElement.current) {
//             let text = newPostElement.current.value
//             props.dispatch(postsReducerAC(text))
//             newPostElement.current.value = ''
//         }
// }

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