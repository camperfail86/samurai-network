import React from "react";
import {Header} from "./header";
import {connect} from "react-redux";
import {AuthType, setAuthTC} from "../../reducers/authReducer";
import {AppStateType} from "../../redux/redux-store";

type PropsType = mapDispatchToProps & mapStateToPropsType

class HeaderContainer extends React.Component<PropsType> {
    // componentDidMount() {
    //     this.props.setAuthTC()
    // }

    render() {
        return (
            <Header auth={this.props.auth}/>
        )
    }
}

type mapStateToPropsType = {
    auth: AuthType
}
type mapDispatchToProps = {
    setAuthTC:() => void
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
  auth: state.auth
})
export const HeaderContainerConnect = connect(mapStateToProps, {setAuthTC})(HeaderContainer)
