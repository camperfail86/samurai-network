import React from 'react';
import './App.css';
import {Header} from "./components/header/header";
import {Navbar} from "./components/navbar/navbar";
import {Profile} from "./components/main/profile/profile";
import {Route, Routes} from "react-router-dom";
import News from "./components/main/news/news";
import Dialogs, {DialogItemType} from "./components/main/dialogs/dialogs";
import {Music} from "./components/main/music/music";
import Settings from "./components/main/settings/settings";
import {MessageType} from "./components/main/dialogs/dialogs";

type stateType = {
    messages: MessageType[]
    names: DialogItemType[]
}

type appStateType = {
    state: stateType
}

function App(props: appStateType) {
    return (
        <div className="wrapper">
            <Header/>
            <Navbar/>
            <main className="main">
                <Routes>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/dialogs" element={<Dialogs
                        messages={props.state.messages}
                        names={props.state.names}/>}/>
                    <Route path="/news" element={<News/>}/>
                    <Route path="/music" element={<Music/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                </Routes>
            </main>
        </div>
    );
}

export default App;
