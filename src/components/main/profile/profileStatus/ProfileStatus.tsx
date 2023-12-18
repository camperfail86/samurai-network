import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getStatusUserTC, setStatusUserTC} from "../../../../reducers/profileReducer";
import {stateSelector, statusSelector} from "../../../../selectors/selectors";

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
        <div>
            {!editMode ?
                <div>
                        <span onDoubleClick={activateEditMode}>
                            {mainStatus || '123'}
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