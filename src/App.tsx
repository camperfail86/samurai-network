import React, {useEffect} from 'react';
import './App.css';
import {Navbar} from "./components/navbar/navbar";
import {Route, Routes} from "react-router-dom";
import News from "./components/main/news/news";
import Dialogs from "./components/main/dialogs/dialogs";
import Music from "./components/main/music/music";
import Settings from "./components/main/settings/settings";
import {postsReduceType} from "./reducers/postsReducer";
import {MessageActionType, messageObjType} from "./reducers/messageReducer";
import UsersContainer from "./components/main/users/UsersAPI";
import {InitStateType, UserActionType} from './reducers/usersReducer';
import {addProfileInfoType, ProfileType} from "./reducers/profileReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, AppStateType} from "./redux/redux-store";
import {HeaderContainerConnect} from "./components/header/headerContainer";
import {Login} from "./components/login/login";
import {initializeTC} from "./reducers/appReducer";
import s from "./components/main/users/users.module.css";
import {initializedSelector, stateSelector} from "./selectors/selectors";

const ProfileContainer = React.lazy(() => import('./components/main/profile/ProfileContainer'));

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

export const config = {
    withCredentials: true,
    headers: {
        "API-KEY": "8bf529cc-e7bb-4c13-ad05-c2e0207800f3"
    }
}

function App() {
    const state = useSelector(stateSelector)
    const dispatch = useDispatch<AppDispatchType>()
    const initialized = useSelector(initializedSelector)

    useEffect(() => {
        dispatch(initializeTC())
    }, []);

    if (!initialized) {
        return <div className={s.loader}></div>
    }

    return (
        <React.Suspense fallback={<div className={s.loader}/>}>
            <div className="wrapper">
                <HeaderContainerConnect/>
                <Navbar friends={state.friends}/>
                <main className="main">
                    <Routes>
                        <Route path="/profile/:userId?" element={<ProfileContainer/>}/>
                        <Route path="/dialogs/*" element={<Dialogs/>}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/users" element={<UsersContainer/>}/>
                        <Route path="/music" element={<Music/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="/login" element={<Login/>}></Route>
                    </Routes>
                </main>
            </div>
        </React.Suspense>
    );
}

export default App;
