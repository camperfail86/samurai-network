import {AppStateType} from "../redux/redux-store";

export const initializedSelector = (state: AppStateType) => state.app.initialized
export const stateSelector = (state: AppStateType) => state
export const profileSelector = (state: AppStateType) => state.profile
export const authSelector = (state: AppStateType)=> state.auth.isAuth
export const postsSelector = (state: AppStateType) => state.posts
export const friendsSelector = (state: AppStateType) => state.friends
export const messagesSelector = (state: AppStateType) => state.messages
