import axios from "axios";
import Card from "../../components/Card";
import Contents from "../../components/Overlay";
import { useEffect, useState } from "react";

const api = axios.create({
  baseURL: "http://localhost:5656/",
});

function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [code, setCode] = useState("");

  const [modalVisible, setModalVisibel] = useState(false);
  const [modalarray, setModalarray] = useState([]);

  function handleOpenModal(product) {
    setModalVisibel(true);
    setModalarray(product);
  }
  function handleCloseModal() {
    setModalVisibel(false);
  }

  useEffect(() => {
    api.get("/").then((response) => {
      setProducts(response.data);
    });
  }, []);

  const newProduct = () => {
    api
      .post("/", {
        name,
        image,
        description,
        quantity,
        code,
      })
      .then(() => {
        window.location.reload(true);
      });
  };

  return (
    <>
      <Contents
        visible={modalVisible}
        onClose={handleCloseModal}
        array={modalarray}
      />
      <h1 className="title">Produtos</h1>
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

      <div className="form-container">
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

        <button onClick={newProduct} id="button-submit">
          Adicionar
        </button>
      </div>
    </>
  );
}

export default Products;
