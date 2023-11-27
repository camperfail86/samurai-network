import style from './header.module.css'
import logo from '../../img/logo.jpg';
import {NavLink} from "react-router-dom";
import React, {ReactNode} from "react";
import {AuthType} from "../../reducers/authReducer";

type HeaderPropsType = {
    auth: AuthType
}

export const Header = ({auth}: HeaderPropsType) => {
    return (
        <header className={style.header}>
            <img src={''} alt="Логотип."/>
            <NavLink to={'/login'}>LOGIN</NavLink>
            {auth.isAuth ? <span>{auth.login}</span> : <span>ВЫ НЕ АВТОРИЗИРОВАНЫ</span>}
        </header>
    )
}
