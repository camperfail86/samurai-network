import React, {useEffect, useState} from 'react';
import './App.css';
import {Header} from "./components/header/header";
import {Navbar} from "./components/navbar/navbar";
import {Profile} from "./components/main/profile/profile";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import News from "./components/main/news/news";
import Dialogs from "./components/main/dialogs/dialogs";
import {Music} from "./components/main/music/music";
import Settings from "./components/main/settings/settings";
import {postsReducerAC, postsReduceType} from "./reducers/postsReducer";
import {MessageActionType, messageObjType} from "./reducers/messageReducer";
import {UsersAPI, UsersType} from "./components/main/users/UsersAPI";
import {addUsersAC, InitStateType, UserActionType} from './reducers/usersReducer';
import axios from "axios";
import {ProfileContainer} from "./components/main/profile/ProfileContainer";
import {addProfileInfoType, ProfileType} from "./reducers/profileReducer";

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

function App(props: appStateType) {
    return (
        <BrowserRouter>
            <div className="wrapper">
                <Header/>
                <Navbar friends={props.state.friends}/>
                <main className="main">
                    <Routes>
                        <Route path="/profile/*" element={<ProfileContainer
                            profile={props.state.profile}
                            posts={props.state.posts}
                            // addPost={props.addPost}
                            dispatch={props.dispatch}
                        />}
                        />
                        <Route path="/dialogs/*" element={<Dialogs
                            messages={props.state.messages}
                            friends={props.state.friends}
                            dispatch={props.dispatch}
                        />}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/users" element={<UsersAPI
                            totalUsersCount={props.state.usersInit.totalUsersCount}
                            pageSize={props.state.usersInit.pageSize}
                            users={props.state.usersInit.users}
                            activePage={props.state.usersInit.activePage}
                            isFetching={props.state.usersInit.isFetching}
                            dispatch={props.dispatch}
                        />}/>
                        <Route path="/music" element={<Music/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
