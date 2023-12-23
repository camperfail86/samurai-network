import React from "react";
import {WithAuthRedirect} from "../../../hoc/withAuthRedirect";

function News() {
    return (
        <>
            <div>
                НОВОСТЕЙ ПОКА НЕТ
            </div>
        </>
    )
}

export default WithAuthRedirect(News);