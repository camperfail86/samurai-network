import React, {useEffect} from 'react';
import {Profile} from "./profile";
import axios from "axios";
import {addProfileInfoAC, getStatusUserTC, getUserProfileInfoTC} from "../../../reducers/profileReducer";
import {AppDispatchType, AppStateType} from "../../../redux/redux-store";
import {useDispatch, useSelector} from "react-redux";
import {
    Navigate,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import {AuthType} from "../../../reducers/authReducer";
import App from "../../../App";
import {WithAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import {profileApi} from "../../../api/profile-api";
import s from "../users/users.module.css";
import {profileSelector} from "../../../selectors/selectors";

export interface WithRouterProps {
    location: ReturnType<typeof useLocation>;
    params: Record<string, string>;
    navigate: ReturnType<typeof useNavigate>;
}

const ProfileContainer = React.memo(() => {
    const dispatch = useDispatch<AppDispatchType>()
    const profile = useSelector(profileSelector)
    let {userId = 30118} = useParams();

    useEffect(() => {
        dispatch(getUserProfileInfoTC(+userId))
        dispatch(getStatusUserTC(+userId))

    }, [])

    return (
        <>
            <Profile
                userId={+userId}
                profile={profile}
                dispatch={dispatch}
            />
        </>
    )
})

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

export default compose<React.ComponentType>(
    // WithAuthRedirect,
    withRouter
)(ProfileContainer)
