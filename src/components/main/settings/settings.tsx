// import style from './settings.module.css';

import {AuthType} from "../../../reducers/authReducer";
import {Navigate} from "react-router-dom";
import React from "react";
import {WithAuthRedirect} from "../../../hoc/withAuthRedirect";

// type PropsType = {
//     auth: AuthType
// }

const Settings = () => {
    return (
        <>
            <div>Настройки приватности</div>
        </>
    )
}
// export const ContainerSettings = WithAuthRedirect(Settings)
export default WithAuthRedirect(Settings);