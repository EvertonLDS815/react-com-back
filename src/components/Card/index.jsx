

function Card({name, image, clik}) {
    
    return(
        <div className="div-card" onClick={() => clik(name)}>
            <div className="content-1">
                <img src={image} alt={name} />
            </div>
            <div className="content-2">
                <h2 className="product-name">{name}</h2>
                {/* <p className="description">{description}</p>
                <span>Quantidade - {quantity}</span>
                <span>Código - {code}</span> */}
            </div>
        </div>
          
        
    )
}

export default Card;