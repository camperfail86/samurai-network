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
import {UsersAPITypeProps, UsersType} from "../users/UsersAPI";
import dialogs from "../dialogs/dialogs";

type MapStateToPropsType = {
    profile: ProfileType
}

type MapDispatchToPropsType = {
    dispatch: (action: ActionType) => void
}

type ProfilePropsType = MapDispatchToPropsType & MapStateToPropsType

export interface WithRouterProps {
    location: ReturnType<typeof useLocation>;
    params: Record<string, string>;
    navigate: ReturnType<typeof useNavigate>;
}

// class ProfileContainer extends React.Component {
//
//     componentDidMount() {
//         debugger
//         axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${11}`).then((res) =>
//             this.props.dispatch(addProfileInfoAC(res.data))
//         )
//     }
//
//     render()
//     {
//         return (
//             <>
//                 <Profile
//                     profile={this.props.profile}
//                     dispatch={this.props.dispatch}/>
//             </>
//         )
//     }
// }


// export function ProfileContainer() {
//     useEffect(() => {
//         axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${11}`).then((res) =>
//             dispatch(addProfileInfoAC(res.data))
//         )
//     }, [])
//
//     return (
//         <>
//             <Profile
//                 profile={profile}
//                 dispatch={dispatch}/>
//         </>
//     )
// }

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profile
})
// let mapDispatchToProps = (props: MapDispatchToPropsType) => {
//     return {
//         increment: () => props.dispatch(addProfileInfoAC()),
//     }
// }
// let mapDispatchToProps = (dispatch: (action: ActionType) => void) => ({
//     dispatchUsers: (users: UsersAPITypeProps) => {
//         // dispatch(addProfileInfoAC(users))
//     }
// })
//

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

// export default connect(mapStateToProps, )(withRouter(ProfileContainer))
// export default withRouter(ProfileContainer)
