import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {MessageActionType, messageReducer} from "../reducers/messageReducer";
import {postsReducer, postsReduceType} from "../reducers/postsReducer";
import {friendsReducer} from "../reducers/friendsReducer";
import {UserActionType, usersReducer} from "../reducers/usersReducer";
import {ProfileActionType, profileReducer} from "../reducers/profileReducer";
import {authActionType, authReducer} from "../reducers/authReducer";
import thunk, {ThunkDispatch} from "redux-thunk";

const rootReducer = combineReducers({
    messages: messageReducer,
    friends: friendsReducer,
    posts: postsReducer,
    usersInit: usersReducer,
    profile: profileReducer,
    auth: authReducer
})
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export type AppStateType = ReturnType<typeof rootReducer>
export type AppDispatchType = ThunkDispatch<AppStateType, unknown, AppActionType>
export type AppActionType = UserActionType | ProfileActionType | postsReduceType | MessageActionType | authActionType

// @ts-ignore
window.store = store