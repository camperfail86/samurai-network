import React from "react";
import {WithAuthRedirect} from "../../../hoc/withAuthRedirect";

function News() {
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