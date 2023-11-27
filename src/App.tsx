import React from 'react';
import './App.css';
import {Navbar} from "./components/navbar/navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import News from "./components/main/news/news";
import Dialogs from "./components/main/dialogs/dialogs";
import Music from "./components/main/music/music";
import Settings from "./components/main/settings/settings";
import { postsReduceType} from "./reducers/postsReducer";
import {MessageActionType, messageObjType} from "./reducers/messageReducer";
import {UsersContainer} from "./components/main/users/UsersAPI";
import {InitStateType, UserActionType} from './reducers/usersReducer';
import ProfileContainer from "./components/main/profile/ProfileContainer";
import {addProfileInfoType, ProfileType} from "./reducers/profileReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, AppStateType} from "./redux/redux-store";
import {HeaderContainerConnect} from "./components/header/headerContainer";
import {Login} from "./components/login/login";
import {AuthType} from "./reducers/authReducer";

export type ActionType = MessageActionType | postsReduceType | UserActionType | addProfileInfoType

export type FriendsType = {
    name: string
    id: number
    sex: string
}

export type DialogItemType = {
    name: string
    id: number
}

export type MessageType = {
    message: string
    id: number
}

export type PostsType = {
    text: string,
    likes: number,
    id: number
}

export type stateType = {
    usersInit: InitStateType
    messages: messageObjType
    friends: FriendsType[]
    posts: PostsType[]
    profile: ProfileType
}

export type appStateType = {
    state: stateType
    // addPost: (post: string) => void
    // addMessage: (message: string) => void
    dispatch: (action: ActionType) => void
}

export const config = {
    withCredentials: true,
    headers: {
        "API-KEY": "8bf529cc-e7bb-4c13-ad05-c2e0207800f3"
    }
}
// props: appStateType
function App() {
    const state = useSelector((state: AppStateType) => state)

    return (
        <BrowserRouter>
            <div className="wrapper">
                <HeaderContainerConnect/>
                <Navbar friends={state.friends}/>
                <main className="main">
                    <Routes>
                        <Route path="/profile/:userId?" element={<ProfileContainer/>}/>
                        <Route path="/dialogs/*" element={<Dialogs
                        />}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/users" element={<UsersContainer
                        />}/>
                        <Route path="/music" element={<Music />}/>
                        <Route path="/settings" element={<Settings />}/>
                        <Route path="/login" element={<Login />}></Route>
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
