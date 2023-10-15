import React from 'react';
import './App.css';
import {Header} from "./components/header/header";
import {Navbar} from "./components/navbar/navbar";
import {Profile} from "./components/main/profile/profile";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import News from "./components/main/news/news";
import Dialogs from "./components/main/dialogs/dialogs";
import {Music} from "./components/main/music/music";
import Settings from "./components/main/settings/settings";

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
    messages: MessageType[]
    names: DialogItemType[]
    friends: FriendsType[]
    posts: PostsType[]
}

export type appStateType = {
    state: stateType
    addPost: (post: string) => void
}

function App(props: appStateType) {
    return (
        <BrowserRouter>
            <div className="wrapper">
                <Header/>
                <Navbar friends={props.state.friends}/>
                <main className="main">
                    <Routes>
                        <Route path="/profile" element={<Profile
                            posts={props.state.posts}
                            addPost={props.addPost}/>}/>
                        <Route path="/dialogs/*" element={<Dialogs
                            messages={props.state.messages}
                            names={props.state.names}/>}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/music" element={<Music/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
