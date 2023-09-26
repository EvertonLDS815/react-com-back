import axios from "axios";
import Card from "../../components/Card";
import Contents from "../../components/Overlay";
import { useEffect, useState } from "react";
import socketIo from 'socket.io-client';

const api = axios.create({
  baseURL: "http://localhost:300",
});

function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [code, setCode] = useState("");

  const [modalVisible, setModalVisibel] = useState(false);
  const [modalObject, setModalObject] = useState({});
  const [namemessage, setNamemessage] = useState("");
  const [codemessage, setCodemessage] = useState("");

  function handleOpenModal(product) {
    setModalVisibel(true);
    console.log(product)
    setModalObject(product);
  }
  function handleCloseModal() {
    setModalVisibel(false);
  }

  useEffect(() => {
    const socket = socketIo("http://localhost:300", {
      transports: ["websocket"]
    });

    socket.on("orders@new", (product) => {
      setProducts(prevState => prevState.concat(product))
    })
  }, [])

  useEffect(() => {
    api.get("/").then((response) => {
      setProducts(response.data);
    });
  }, []);

  const newProduct = (event) => {
    event.preventDefault()
    setName("")
    setImage("")
    setDescription("")
    setQuantity("")
    setCode("")
    api
      .post("/ins", {
        name,
        image,
        description,
        quantity,
        code,
      })
      .then((response) => {
        setNamemessage(response.data.nameMessage)
        setCodemessage(response.data.codeMessage)
        console.log(response.data)
      });


  };

  return (
    <>
      <Contents
        visible={modalVisible}
        onClose={handleCloseModal}
        array={modalObject}
      />
      <h1 className="title">Produtos</h1>
      {products.length === 0 && <h2>Não há itens aqui no array</h2>}
      {products.length > 0 && (
        <main>
          {products.map((product) => (
            <Card
              clik={() => handleOpenModal(product)}
              key={product._id}
              name={product.name}
              image={product.image}
              description={product.description}
              quantity={product.quantity}
              code={product.code}
            />
          ))}
        </main>
      )}

      <form className="form-container" onSubmit={newProduct}>
        <h2>Formulário</h2>
        <p className="confirm">{namemessage}</p>
        <input
          placeholder="Nome do Produto"
          onChange={(event) => {
            setName(event.target.value)
            setNamemessage("")
          }}
          required
          id="form-input"
        />
        <input
          placeholder="Link da Imagem"
          onChange={(event) => setImage(event.target.value)}
          required
          className="form-input"
        />
        <input
          placeholder="Descrição"
          onChange={(event) => setDescription(event.target.value)}
          className="form-input"
        />
        <input
          placeholder="Quantidade"
          onChange={(event) => setQuantity(event.target.value)}
          className="form-input"
        />
        <input
          placeholder="Código do Produto"
          onChange={(event) => {
            setCode(event.target.value)
            setCodemessage("")
          }}
          className="form-input"
        />
        <p className="confirm">{codemessage}</p>

        <button id="button-submit">
          Adicionar
        </button>
      </form>
    </>
  );
}

export default Products;
