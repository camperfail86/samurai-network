import style from './navbar.module.css';
import {BrowserRouter, NavLink} from 'react-router-dom';

type IsActiveType = {
    isActive: boolean
}

export const Navbar = () => {
    return (
        <nav className={style.nav}>
            <ul className={style.list}>
                <li className={style.item}>
                    <NavLink className={({isActive}) => (isActive ? style.active : '')}
                             to="/profile">Profile</NavLink>
                </li>
                <li className={style.item}>
                    <NavLink className={({isActive}) => (isActive ? style.active : '')}
                             to="/dialogs">Dialogs</NavLink>
                </li>
                <li className={style.item}>
                    <NavLink className={({isActive}) => (isActive ? style.active : '')}
                             to="/news">News</NavLink>
                </li>
                <li className={style.item}>
                    <NavLink className={( {isActive}) => (isActive ? style.active : '')}
                             to="/music">Music</NavLink>
                </li>
                <li className={style.item}>
                    <NavLink className={({isActive}) => (isActive ? style.active : '')}
                             to="/settings">Settings</NavLink>
                </li>
            </ul>
        </nav>
    )
}

