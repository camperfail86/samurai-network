import React, {useEffect} from 'react';
import {Profile} from "./profile";
import axios from "axios";
import {addProfileInfoAC, getUserProfileInfoTC} from "../../../reducers/profileReducer";
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

export interface WithRouterProps {
    location: ReturnType<typeof useLocation>;
    params: Record<string, string>;
    navigate: ReturnType<typeof useNavigate>;
}

function ProfileContainer() {
    const dispatch = useDispatch<AppDispatchType>()
    const profile = useSelector((state: AppStateType) => state.profile)
    const auth = useSelector<AppStateType, AuthType>((state: AppStateType) => state.auth)
    let { userId = 30118 } = useParams();

    useEffect(() => {
        dispatch(getUserProfileInfoTC(+userId))
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

export default WithAuthRedirect(withRouter(ProfileContainer))
