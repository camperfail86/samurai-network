import {Post} from "./post/post";
import {ProfilePropsType} from "../profile/profile";
import {PostsType} from "../../../App";

type PostsPropsType = {
    posts: PostsType[]
}

export function Posts(props: PostsPropsType) {
    return (
        <>
            {props.posts.map(p => <Post key={p.id} likes={p.likes} text={p.text} id={p.id}/>)}
        </>
    )
};
