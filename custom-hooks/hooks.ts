import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "../src/redux/redux-store";

export const AppThunkDispatch = useDispatch<ThunkDispatch<AppStateType, any, any>>()