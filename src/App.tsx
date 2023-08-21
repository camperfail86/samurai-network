import React from 'react';
import './App.css';
import {Header} from "./components/header/header";
import {Navbar} from "./components/navbar/navbar";
import {Profile} from "./components/main/profile/profile";
import {BrowserRouter, Route} from "react-router-dom";
import News from "./components/main/news/news";
import Dialogs from "./components/main/dialogs/dialogs";
import {Music} from "./components/main/music/music";
import Settings from "./components/main/settings/settings";

function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header/>
        <Navbar />
        <main className="main">
            <Route path="/profile" render={() => <Profile/>}/>
            <Route path="/dialogs/" render={() => <Dialogs/>}/>
            <Route path="/news" render={() => <News/>}/>
            <Route path="/music" render={() => <Music/>}/>
            <Route path="/settings" render={() => <Settings/>}/>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
