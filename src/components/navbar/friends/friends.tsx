import React from 'react';
import s from './friends.module.css'
import {FriendsPropsType} from "../navbar";
import {Friend} from "./friend/friend";

export const Friends = (props: FriendsPropsType) => {
    return (
        <div className={s.friends}>
            {props.friends.map(f => <Friend sex={f.sex} key={f.id} name={f.name} id={f.id}/>)}
        </div>
    );
};
