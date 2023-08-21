import { NavLink } from 'react-router-dom';
import style from './dialogs.module.css';

const names = [
  {name: 'Grisha', id: 1},
  {name: 'Nikita', id: 2},
  {name: 'Anatoliy', id: 3}
]

const messages = [
  {message: 'Привет'},
  {message: 'Как сам'}
]

type DialogItemType = {
  name: string
  id?: number
}

type MessageType = {
  message: string
}

function Message(props: MessageType) {
  return (
    <div>{props.message}</div>
  )
}

function DialogItem(props: DialogItemType) {
  let path = `/dialogs/${props.id}`

  return (
    <li className={style.item}>
      <NavLink to={path}>{props.name}</NavLink>
    </li>
  )
}

let messagesItems = messages.map( (m, index) => <Message key={index} message={m.message} /> )
let dialogs = names.map((n, index) => <DialogItem key={index} name={n.name} id={n.id}/>)

function Dialogs() {
  return (
    <div className={style.dialogs}>
      <ul className={style.list}>
        { dialogs }
      </ul>
      <div className={style.messages}>
        { messagesItems }
      </div>
    </div>
  )
}

export default Dialogs;