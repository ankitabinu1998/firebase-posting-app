
export const Post = (props:any) => {
    return (
        <div key={props.post.id} className="post-body">
            <h3 className="post-title">{props.post.title}</h3>
            <hr/>
            <p className="post-description">{props.post.description}</p>
        </div>
    )
}