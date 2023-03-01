export const Post = (props:any) => {
    return (
        <div key={props.post.id}>
            <h3>{props.post.title}</h3>
            <p>{props.post.description}</p>
        </div>
    )
}