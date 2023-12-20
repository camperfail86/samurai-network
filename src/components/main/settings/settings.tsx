import React from "react";
import {WithAuthRedirect} from "../../../hoc/withAuthRedirect";

const Settings = () => {
    return (
        <>
            <div>Настройки приватности</div>
        </>
    )
}
export default WithAuthRedirect(Settings);