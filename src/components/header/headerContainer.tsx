import React from "react";
import {Header} from "./header";
import axios from "axios";
import {connect, useDispatch} from "react-redux";
import {AuthType, PropsSetAuthProps, setAuthAC} from "../../reducers/authReducer";
import {AppStateType} from "../../redux/redux-store";

const config = {
    withCredentials: true
}

type PropsType = mapDispatchToProps & mapStateToPropsType

class HeaderContainer extends React.Component<PropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, config)
            .then((res) => {
                    if (res.data.resultCode === 0) {
                        const {id, email, login} = res.data.data
                        this.props.setAuthAC(id, email, login)
                    }
                }
            )
    }

    render() {
        return (
            <Header login={this.props.auth.login}/>
        )
    }
}

type mapStateToPropsType = {
    auth: AuthType
}
type mapDispatchToProps = {
    setAuthAC:(userId: PropsSetAuthProps, email: PropsSetAuthProps, login: PropsSetAuthProps) => void
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
  auth: state.auth
})
export const HeaderContainerConnect = connect(mapStateToProps, {setAuthAC})(HeaderContainer)
