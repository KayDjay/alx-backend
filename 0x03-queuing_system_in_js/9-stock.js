import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

const app = express();
const client = redis.createClient();

// Promisify Redis functions
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// List of products
const listProducts = [
  { id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
  { id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
  { id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
  { id: 4, name: 'Suitcase 1050', price: 550, stock: 5 }
];

const getItemById = (id) => {
  return listProducts.find(product => product.id === id);
};

// Reserve stock for an item by its id
const reserveStockById = async (id, stock) => {
  await setAsync(`product.${id}`, stock);
};

// Get current reserved stock for an item by its id
const getCurrentReservedStockById = async (id) => {
  const reservedStock = await getAsync(`product.${id}`);
  return reservedStock ? parseInt(reservedStock) : 0;
};

// Middleware to handle JSON response
app.use(express.json());

// Route to list all products
app.get('/list_products', (req, res) => {
  res.json(listProducts.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    stock: listProducts.stock
  })));
});

// Route to get product details by item id
app.get('/list_products/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const product = getItemById(id);
  if (product) {
    const currentQuantity = product.stock - await getCurrentReservedStockById(id);
    res.json({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      currentQuantity: currentQuantity
    });
  } else {
    res.json({ status: 'Product not found' });
  }
});


app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const product = getItemById(itemId);
  if (product) {
    const currentQuantity = item.stock - await getCurrentReservedStockById(itemId);
    if (currentQuantity > 0) {
      await reserveStockById(itemId, currentQuantity - 1);
      res.json({ status: 'Reservation confirmed', itemId });
    } else {
      res.json({ status: 'Not enough stock available', itemId });
    }
  } else {
    res.json({ status: 'Product not found' });
  }
});

const port = 1245;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
