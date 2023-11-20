import {combineReducers, legacy_createStore} from "redux";
import {messageReducer} from "../reducers/messageReducer";
import {postsReducer} from "../reducers/postsReducer";
import {friendsReducer} from "../reducers/friendsReducer";
import {usersReducer} from "../reducers/usersReducer";
import {profileReducer} from "../reducers/profileReducer";
import {authReducer} from "../reducers/authReducer";

const rootReducer = combineReducers({
    messages: messageReducer,
    friends: friendsReducer,
    posts: postsReducer,
    usersInit: usersReducer,
    profile: profileReducer,
    auth: authReducer
})
export const store = legacy_createStore(rootReducer)
export type AppStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store