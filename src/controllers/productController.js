import Product from "../models/productModel";

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.send(allProducts);
  } catch (error) {
    res.status(500).send("Erreur lors de la requête");
  }
};

const getOneProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Produit non trouvé");
    }
    res.send(product);
  } catch (error) {
    res.status(500).send("Erreur lors de la requête");
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      quantityTotal,
      quantityInStock,
      location,
      description,
      frozen,
      hasExpirationDate,
      needBattery,
    } = req.body;

    const newProduct = new Product({
      name,
      quantityTotal,
      quantityInStock,
      location,
      description,
      frozen,
      hasExpirationDate,
      needBattery,
    });

    await newProduct.save();

    res.status(201).json({ message: "Produit créé", product: newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erreur lors de la requête" });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.productId;
  const updateData = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    res.send(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la requête" });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la requête" });
  }
};

export {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
