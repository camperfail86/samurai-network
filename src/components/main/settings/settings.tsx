import React from "react";
import {WithAuthRedirect} from "../../../hoc/withAuthRedirect";

const Settings = () => {
    return (
        <>
            <div>Изменить тему</div>
            <button>click</button>
        </>
    )
}
export default WithAuthRedirect(Settings);