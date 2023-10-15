import lostImage from './../../../../img/anonim.jpeg';
import s from './post.module.css'
import {PostsType} from "../../../../App";

export function Post(props: PostsType) {
  return(
    <div className={s.post}>
      <img className={s.avatar} src={lostImage} alt="Аватар." />
        <div>{props.text}<div>{props.likes} - лайк</div></div>
    </div>
  )
}

