import s from './profile.module.css';
import React, {useEffect, useRef} from 'react';
import {ActionType, PostsType} from "../../../App";
import {postsReducerAC} from "../../../reducers/postsReducer";
import {Profile} from "./profile";
import axios from "axios";
import {addProfileInfoAC, ProfileType} from "../../../reducers/profileReducer";
import {AppStateType} from "../../../redux/redux-store";
import {connect, useDispatch, useSelector} from "react-redux";
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";

export interface WithRouterProps {
    location: ReturnType<typeof useLocation>;
    params: Record<string, string>;
    navigate: ReturnType<typeof useNavigate>;
}

export function ProfileContainer() {
    const dispatch = useDispatch()
    const profile = useSelector((state: AppStateType) => state.profile)
    let { userId = 30118 } = useParams();

    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then((res) =>
            dispatch(addProfileInfoAC(res.data))
        )
    }, [])

    return (
        <>
            <Profile
                profile={profile}
                dispatch={dispatch}/>
        </>
    )
}
function withRouter<Props extends WithRouterProps>(Component: React.ComponentType<Props>) {
    function ComponentWithRouterProp(props: Omit<Props, keyof WithRouterProps>) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...(props as Props)}
                location={location}
                params={params}
                navigate={navigate}
            />
        );
    }

    return ComponentWithRouterProp;
}

export default withRouter(ProfileContainer)
