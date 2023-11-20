import style from './header.module.css'
import logo from '../../img/logo.jpg';
import {NavLink} from "react-router-dom";
import React, {ReactNode} from "react";

type HeaderPropsType = {
    login: string
}

export const Header = (props: HeaderPropsType) => {
    return (
        <header className={style.header}>
            <img src={''} alt="Логотип."/>
            <NavLink to={'/login'}>LOGIN</NavLink>
            <span>{props.login}</span>
        </header>
    )
}
