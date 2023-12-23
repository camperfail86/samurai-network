import style from "./music.module.css";
import React from "react";
import {WithAuthRedirect} from "../../../hoc/withAuthRedirect";

function Music() {
  return (
    <>
      ВЫ НЕ ДОБАВИЛИ НИ ОДНОГО ТРЕКА
    </>
  )
}

export default WithAuthRedirect(Music)
