import React, {useEffect} from 'react';
import {Profile} from "./profile";
import {getStatusUserTC, getUserProfileInfoTC} from "../../../reducers/profileReducer";
import {AppDispatchType, AppStateType} from "../../../redux/redux-store";
import {useDispatch, useSelector} from "react-redux";
import {
    Navigate,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import {compose} from "redux";
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
    // Передать 30118 сразу в диспатч, а userId оставить пустым

    useEffect(() => {
        dispatch(getUserProfileInfoTC(+userId))
        dispatch(getStatusUserTC(+userId))
    }, [userId])

    return (
        <>
            <Profile
                userId={+userId}
                profile={profile}
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
    withRouter
)(ProfileContainer)
