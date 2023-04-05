import { useEffect } from "react";
function Contents({visible, array, onClose}) {
    
    if (!visible) {
        return null;
    }

    useEffect(() => {
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                onClose()
            }
        })
    }, [])

    return(
        <div className="modal">
            <div className="content">
                <h2>{array.name}</h2>
                <button onClick={onClose} className="button-close">
                    <i class='bx bx-x'></i>
                </button>
                <div className="content-1">
                    <img src={array.image} />
                </div>

                <div className="content-2">
                    <p className="description">{array.description}</p>
                    <span>Quantidade - {array.quantity}</span>
                    <span>Código - {array.code}</span>
                </div>
            </div>
        </div>
    );
};

export default Contents;