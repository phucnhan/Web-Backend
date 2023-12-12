// server/controllers/productController.js

let products = [
  // Initial product data
];

const fetchProducts = (req, res) => {
  res.json(products);
};

const addProduct = (req, res) => {
  const { name, price, description, image_path } = req.body;
  const newProduct = {
    id: Date.now(),
    name,
    price,
    description,
    image_path,
  };
  products.push(newProduct);
  res.json(newProduct);
};

const updateProduct = (req, res) => {
  const { id } = req.params;
  const updatedProductFields = req.body;

  products = products.map((product) =>
    product.id === parseInt(id) ? { ...product, ...updatedProductFields } : product
  );

  res.json(products);
};

const deleteProduct = (req, res) => {
  const { id } = req.params;
  products = products.filter((product) => product.id !== parseInt(id));
  res.json(products);
};

module.exports = {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
