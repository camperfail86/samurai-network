import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import { setStatusUserTC} from "../../../../reducers/profileReducer";
import s from "../profile.module.css"

type ProfileType = {
    id: number
    mainStatus: string | null
}

export const ProfileStatus = ({id, mainStatus}: ProfileType) => {
    const [editMode, setEditMode] = useState(false)
    // const mainStatus = useSelector(statusSelector)
    const [status, setStatus] = useState(mainStatus)
    const dispatch = useDispatch()

    const activateEditMode = () => {
        setEditMode(true)
    }

    const disActivateEditMode = () => {
        setEditMode(false)
        dispatch(setStatusUserTC(status))
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    useEffect(() => {
        setStatus(mainStatus)
    }, [mainStatus]);

    return (
        <div className={s.profile}>
            <span className={s.status}>Статус:</span>
            {!editMode ?
                <div>
                        <span onDoubleClick={activateEditMode}>
                            {mainStatus || '-'}
                        </span>
                </div>
                :
                <div>
                    <input onChange={onStatusChange}
                           autoFocus={true} value={'' + status}
                           onBlur={disActivateEditMode}
                           type="text"/>
                </div>
            }
        </div>
    );
};