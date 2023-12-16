import React from 'react';
import s from './users.module.css'
import {
    getUsersTC,
    InitStateType, toggleActivePageTC,
} from "../../../reducers/usersReducer";
import Users from "./Users";
import {AppDispatchType, AppStateType} from "../../../redux/redux-store";
import {connect} from "react-redux";
import {WithAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";

export type UsersType = {
    followed: boolean
    id: number
    name: string
    photos: { small: null, large: null }
    status: null,
    uniqueUrlName: null
}

export type UsersAPITypeProps = {
    dispatch: AppDispatchType
    usersInit: InitStateType
}

const mapStateToProps = (state: AppStateType) => {
    return {
        usersInit: state.usersInit
    }
}

type mapDispatchToPropsType = {
    toggleActivePageTC:(p: number, pageSize: number) => void
    getUsersTC:(activePage: number, pageSize: number) => void
}

type mapStateToPropsType = {
    usersInit: InitStateType
}

type PropsType = mapStateToPropsType & mapDispatchToPropsType
// UsersAPITypeProps, {}

class UsersAPI extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsersTC(this.props.usersInit.activePage, this.props.usersInit.pageSize)
    }

    onClickHandler = (p: number) => {
        this.props.toggleActivePageTC(p, this.props.usersInit.pageSize)
    }

    render() {
        return (
            <>
                {this.props.usersInit.isFetching ? <div className={s.loader}></div> :
                    <Users
                        isDisabledArray={this.props.usersInit.isDisabledArray}
                        totalUsersCount={this.props.usersInit.totalUsersCount}
                        pageSize={this.props.usersInit.pageSize}
                        users={this.props.usersInit.users}
                        activePage={this.props.usersInit.activePage}
                        onClickHandler={this.onClickHandler}
                    />}
            </>
        )
    }
};
export default compose<React.ComponentType>(
    // WithAuthRedirect,
    connect(mapStateToProps, {toggleActivePageTC, getUsersTC})
)(UsersAPI)
