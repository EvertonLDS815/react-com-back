import axios from "axios";
import Card from "../../components/Card";
import Contents from "../../components/Overlay";
import { useEffect, useState } from "react";
import socketIo from 'socket.io-client';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: "https://node-products.vercel.app",
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
  const [idCancel, setIdCancel] = useState("");

  function handleCancelProduct(event, id) {

    event.preventDefault()

    products.forEach(async (product) => {
      if (id !== product._id) {
        return
      }
      await api.delete(`/ins/${id}`).then(() => {
        toast.success("Produto deletado com sucesso!");
      });
    })

    setProducts((prevState) => prevState.filter((product) => product._id !== id))
  }

  function handleOpenModal(product) {
    setModalVisibel(true);
    setModalObject(product);
  }
  function handleCloseModal() {
    setModalVisibel(false);
  }

  useEffect(() => {
    const socket = socketIo("https://node-products.vercel.app", {
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

    api
      .post("/ins", {
        name,
        image,
        description,
        quantity,
        code,
      })
      .then((response) => {
        alert(response.data._id);
        toast.success("Produto Adicionado com sucesso!");
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

      <form className="form-container form-delete" onSubmit={(event) => handleCancelProduct(event, idCancel)}>
        <h2>Form Delete</h2>
        <input
          value={idCancel}
          placeholder="Insira seu Id"
          onChange={(event) => setIdCancel(event.target.value)}
        />

        <button type="submit">Remover</button>
      </form>
      <form className="form-container" onSubmit={newProduct}>
        <h2>Formulário</h2>
        <input
          placeholder="Nome do Produto"
          onChange={(event) => setName(event.target.value)}
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
          onChange={(event) => setCode(event.target.value)}
          className="form-input"
        />

        <button id="button-submit">
          Adicionar
        </button>
      </form>
    </>
  );
}

export default Products;
