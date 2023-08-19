

const Card = ({id, title, tag}) => {
    return(
        <div className="card m-1 p-2 d-flex justify-content-start" >
        <h6 className="mb-2">{id}</h6>
        <h6 className="mb-2">{title}</h6>
        <h6 className="mb-2">{tag}</h6>
        </div>
    )
}

export default Card;