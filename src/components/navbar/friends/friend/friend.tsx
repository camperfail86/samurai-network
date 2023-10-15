import React from 'react';
import s from './../friends.module.css'
import {FriendsType} from "../../../../App";

export const Friend = (props: FriendsType) => {
    return (
        <div className={`${s.friend} ${ props.sex !== 'male' ? s.male : s.female }`}>{props.name}</div>
    );
};
