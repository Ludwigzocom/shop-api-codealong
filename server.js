import express from 'express';
import pool from './db.js';

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hej från servern!' });
});

app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products ORDER BY id'
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error.message);
    res.json({ error: 'Något gick fel' });
  }
});

app.get('/api/customers', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, city FROM customers ORDER BY name'
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error.message);
    res.json({ error: 'Något gick fel' });
  }
});

app.get('/api/products/cheap', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT name, price FROM products
       WHERE price < 200
       ORDER BY price, name`
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error.message);
    res.json({ error: 'Något gick fel' });
  }
});

app.get('/api/products/out-of-stock', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, category FROM products
       WHERE stock = 0
       ORDER BY name`
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error.message);
    res.json({ error: 'Något gick fel' });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT o.id, o.status, c.name AS customer
       FROM orders o
       JOIN customers c ON o.customer_id = c.id
       ORDER BY o.id`
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error.message);
    res.json({ error: 'Något gick fel' });
  }
});

app.listen(port, () => {
  console.log('Servern körs på http://localhost:3000');
});
