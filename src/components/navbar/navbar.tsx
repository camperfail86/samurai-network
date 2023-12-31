import style from './navbar.module.css';
import {NavLink} from 'react-router-dom';
import {FriendsType} from "../../App";
import React from "react";

export type FriendsPropsType = {
    friends: FriendsType[]
}

export const Navbar = React.memo(({friends}: FriendsPropsType) => {
    return (
        <nav className={style.nav}>
            <ul className={style.list}>
                <li className={style.item}>
                    <NavLink className={({isActive}) => (isActive ? style.active : '')}
                             to="/profile">Profile</NavLink>
                </li>
                <li className={style.item}>
                    <NavLink className={({isActive}) => (isActive ? style.active : '')}
                             to="/dialogs">Dialogs</NavLink>
                </li>
                <li className={style.item}>
                    <NavLink className={({isActive}) => (isActive ? style.active : '')}
                             to="/news">News</NavLink>
                </li>
                <li className={style.item}>
                    <NavLink className={( {isActive}) => (isActive ? style.active : '')}
                             to="/music">Music</NavLink>
                </li>
                <li className={style.item}>
                    <NavLink className={({isActive}) => (isActive ? style.active : '')}
                             to="/settings">Settings</NavLink>
                </li>
                <li className={style.item}>
                    <NavLink className={({isActive}) => (isActive ? style.active : '')}
                             to="/users">Users</NavLink>
                </li>
            </ul>
        </nav>
    )
})

