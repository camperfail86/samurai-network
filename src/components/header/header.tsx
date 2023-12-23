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
            {auth.isAuth
                ?
                <div>
                    <div className={style.text}>{auth.login}</div>
                </div>
                : <span className={style.text}>ВЫ НЕ АВТОРИЗИРОВАНЫ</span>}
            {isAuth
                ? <NavLink className={style.login} onClick={onCLickHandler} to={'/login'}>LOGOUT</NavLink>
                : <NavLink className={style.login} to={'/login'}>LOGIN</NavLink>}
        </header>
    )
})
