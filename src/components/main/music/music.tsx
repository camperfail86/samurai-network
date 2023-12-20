import style from "./music.module.css";
import React from "react";
import {WithAuthRedirect} from "../../../hoc/withAuthRedirect";

function Music() {
  return (
    <>
      <ul className={style.list}>
        <li>appledream - Я Кристина</li>
        <li>f0lk - Шоссе</li>
        <li>вышел покурить - вопрос</li>
        <li>тринадцать Карат - утонуть</li>
        <li>КУОК - Quvi</li>
        <li>Big Baby Tape - Hokage</li>
        <li>playingtheangel - Акула в формалине</li>
        <li>тринадцать карат - Давай расскажем</li>
        <li>ATL - Танцуйте</li>
        <li>Pharaoh - Одинокая звезда</li>
      </ul>
    </>
  )
}

export default WithAuthRedirect(Music)
