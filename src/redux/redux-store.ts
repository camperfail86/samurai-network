import {combineReducers, legacy_createStore} from "redux";
import {messageReducer} from "../reducers/messageReducer";
import {postsReducer} from "../reducers/postsReducer";
import {friendsReducer} from "../reducers/friendsReducer";
import {usersReducer} from "../reducers/usersReducer";
import {profileReducer} from "../reducers/profileReducer";

const rootReducer = combineReducers({
    messages: messageReducer,
    friends: friendsReducer,
    posts: postsReducer,
    usersInit: usersReducer,
    profile: profileReducer
})
export const store = legacy_createStore(rootReducer)
export type AppStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store