import style from './header.module.css'
import logo from '../../img/logo.jpg';
import {NavLink} from "react-router-dom";
import React, {ReactNode} from "react";
import {AuthType, logoutTC} from "../../reducers/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, AppStateType} from "../../redux/redux-store";
import {authSelector} from "../../selectors/selectors";

type HeaderPropsType = {
    auth: AuthType
}

export const Header = React.memo(({auth}: HeaderPropsType) => {
    const isAuth = useSelector(authSelector)
    const dispatch = useDispatch<AppDispatchType>()
    const onCLickHandler = () => {
        dispatch(logoutTC())
    }
    return (
        <header className={style.header}>
            <img src={''} alt="Логотип."/>
            {isAuth ? <NavLink onClick={onCLickHandler} to={'/login'}>LOGOUT</NavLink>
                    : <NavLink to={'/login'}>LOGIN</NavLink>}
            {auth.isAuth
                ? <span className={style.text}>{auth.login}</span>
                : <span className={style.text}>ВЫ НЕ АВТОРИЗИРОВАНЫ</span>}
        </header>
    )
})
