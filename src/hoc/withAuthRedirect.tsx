import React, {ComponentType} from 'react';
import {Navigate} from "react-router-dom";
import {connect, useSelector} from "react-redux";
import {AppStateType} from "../redux/redux-store";
import {AuthType} from "../reducers/authReducer";
import {isArray} from "util";

type mapStateToPropsType = {
    auth: AuthType
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    // isAuth: state.auth.isAuth
    return {
        auth: state.auth
    }
}

export function WithAuthRedirect<T>(Component: ComponentType<T>) {
    const withAuthComponent = (props: mapStateToPropsType) => {
        const {auth, ...restProps} = props
        if (!props.auth.isAuth) {return <Navigate to='/login'/>}
        return <Component {...restProps as T}/>
    }
    const connectWithAuthComponent = connect(mapStateToProps)(withAuthComponent)
    return connectWithAuthComponent
};
