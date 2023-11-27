import {AuthType} from "../../../reducers/authReducer";
import {Navigate} from "react-router-dom";
import React from "react";
import {WithAuthRedirect} from "../../../hoc/withAuthRedirect";

type PropsType = {
    auth: AuthType
}

function News(props: PropsType) {
    // if (!props.auth.isAuth) {
    //     return <Navigate to='/login'/>
    // }
    return (
        <>
            <div>
                1 Пост
                Собаки бабубаки
            </div>
            <div>
                2 Пост
                Купил новый автомобиль
            </div>
        </>
    )
}

export default WithAuthRedirect(News);