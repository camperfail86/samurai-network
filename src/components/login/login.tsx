import Checkbox from '@mui/material/Checkbox';
import React from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import s from './login.module.css';
import {DataTypeLogin, loginTC} from "../../reducers/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Navigate} from "react-router-dom";

import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
        // height: '100vh',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: '30px',
        paddingTop: '30px'
    },
    paper: {
        // margin: theme.spacing(8, 4),
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#190061',
        // backgroundColor: 'transparent',
        boxShadow: 'none'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        color: 'white',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: theme.palette.secondary.main,
    },
    textFiled: {
        color: 'red',
        backgroundColor: 'white'
    }
}));

export const Login = () => {
    const dispatch = useDispatch()
    const error = useSelector((state: AppStateType) => state.app.error)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const {formState: {errors}, control, register, handleSubmit} = useForm(
        {
            defaultValues: {
                email: '',
                password: '',
                rememberMe: false,
            },
        }
    )
    const classes = useStyles();
    const onSubmit: SubmitHandler<DataTypeLogin> = (data) => {
        dispatch(loginTC(data))
    }
    if (isAuth) {
        return <Navigate to={`/profile`}/>
    }


    return (
        // <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        //     <label>Login
        //         <input {...register("email", {
        //                 validate: (value: any) => {
        //                     if (value.length > 30) {
        //                         return 'email must be less than 30 characters'
        //                     }
        //                 }
        //             }
        //         )} />
        //         {errors.email && <span>{errors.email.message}</span>}
        //     </label>
        //     <label>Password
        //         <input type='password' {...register("password",{validate: (value: any) => {
        //                 if (value.length <= 6 || value.length > 40) {
        //                     return 'length password must be more 6 and must be less 40'
        //                 }
        //             }} )} />
        //         {errors.password && <span>{errors.password.message}</span>}
        //     </label>
        //     <label>Remember Me
        //         <Controller
        //             name="rememberMe"
        //             control={control}
        //             render={({field}) => <Checkbox {...field} />}
        //         />
        //     </label>
        //     <input type="submit"/>
        //     {error && <div>{error}</div>}
        // </form>
        <Grid container component="main" className={classes.root}>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Авторизация
                    </Typography>
                    <form className={classes.form}
                          onSubmit={handleSubmit(onSubmit)}
                          noValidate>
                        <TextField
                            color='secondary'
                            className={classes.textFiled}
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Электронная почта"
                            autoComplete="email"
                            autoFocus
                            {...register("email", {
                                    validate: (value: any) => {
                                        if (value.length > 30) {
                                            return 'email must be less than 30 characters'
                                        }
                                    }
                                }
                            )}
                        />
                        <TextField
                            color="secondary"
                            className={classes.textFiled}
                            variant="filled"
                            margin="normal"
                            required
                            fullWidth
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            {...register("password", {
                                validate: (value: any) => {
                                    if (value.length <= 6 || value.length > 40) {
                                        return 'length password must be more 6 and must be less 40'
                                    }
                                }
                            })}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Войти
                        </Button>
                    </form>
                </div>
            </Grid>
        </Grid>
    )
}
