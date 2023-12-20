import Checkbox from '@mui/material/Checkbox';
import React from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import s from './login.module.css';
import {DataTypeLogin, loginTC} from "../../reducers/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Navigate} from "react-router-dom";



export const Login = () => {
    const dispatch = useDispatch()
    const error = useSelector((state: AppStateType) => state.app.error)
    const isAuth = useSelector((state: AppStateType)=> state.auth.isAuth)
    const {formState: {errors}, control, register, handleSubmit} = useForm(
        {
            defaultValues: {
                email: '',
                password: '',
                rememberMe: false,
            },
        }
    )
    const onSubmit: SubmitHandler<DataTypeLogin> = (data) => {
        dispatch(loginTC(data))
    }
    if (isAuth) {
        return <Navigate to={`/profile`}/>
    }

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <label>Login
                <input {...register("email", {
                        validate: (value: any) => {
                            if (value.length > 30) {
                                return 'email must be less than 30 characters'
                            }
                        }
                    }
                )} />
                {errors.email && <span>{errors.email.message}</span>}
            </label>
            <label>Password
                <input type='password' {...register("password",{validate: (value: any) => {
                        if (value.length <= 6 || value.length > 40) {
                            return 'length password must be more 6 and must be less 40'
                        }
                    }} )} />
                {errors.password && <span>{errors.password.message}</span>}
            </label>
            <label>Remember Me
                <Controller
                    name="rememberMe"
                    control={control}
                    render={({field}) => <Checkbox {...field} />}
                />
            </label>
            <input type="submit"/>
            {error && <div>{error}</div>}
        </form>
    )
}
