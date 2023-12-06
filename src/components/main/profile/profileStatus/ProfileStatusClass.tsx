import React, {ChangeEvent, useState} from 'react';
import {useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppActionType, AppDispatchType, AppStateType} from "../../../../redux/redux-store";
import {getStatusUserTC, setStatusUserTC} from "../../../../reducers/profileReducer";
import {ActionType} from "../../../../App";
type ProfileStatusClassType = {
    status: string | null
    dispatch: AppDispatchType
    id: number
}

export class ProfileStatusClass extends React.Component<ProfileStatusClassType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    disActivateEditMode = () => {
        this.setState({
            editMode: false
        })
        // this.props.updateStatus
        this.props.dispatch(setStatusUserTC(this.state.status))
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: ProfileStatusClassType, prevState: any) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode ?
                    <div>
                        <span onDoubleClick={this.activateEditMode}>
                            {this.props.status || '123'}
                        </span>
                    </div>
                    :
                    <div>
                        <input onChange={this.onStatusChange}
                               autoFocus={true} value={'' + this.state.status}
                               onBlur={this.disActivateEditMode}
                               type="text"/>
                    </div>
                }
            </div>
        );
    }
};

