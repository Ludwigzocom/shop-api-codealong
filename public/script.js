const getProducts = async () => {
  const response = await fetch('/api/products');
  const data = await response.json();
  return data;
};

const createCard = (product) => {
  const card = document.createElement('article');
  card.className = 'product-card';

  const name = document.createElement('h2');
  name.textContent = product.name;

  const category = document.createElement('p');
  category.textContent = product.category;

  const price = document.createElement('p');
  price.textContent = product.price + ' kr';

  card.append(name, category, price);
  return card;
};

const showProducts = async () => {
  const productsElement = document.querySelector('#products');

  try {
    const products = await getProducts();
    const cards = products.map(createCard);
    productsElement.textContent = '';
    productsElement.append(...cards);
  } catch (error) {
    console.log(error.message);
    productsElement.textContent = 'Kunde inte hämta produkterna.';
  }
};

showProducts();

const getData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const showCustomers = async () => {
  const list = document.querySelector('#customers');
  try {
    const customers = await getData('/api/customers');
    const items = customers.map((customer) => {
      const item = document.createElement('li');
      item.textContent = customer.name + ' – ' + customer.city;
      return item;
    });
    list.textContent = '';
    list.append(...items);
  } catch (error) {
    console.log(error.message);
    list.textContent = 'Kunde inte hämta kunderna.';
  }
};

showCustomers();

const showCheap = async () => {
  const list = document.querySelector('#cheap');
  try {
    const products = await getData('/api/products/cheap');
    const items = products.map((product) => {
      const item = document.createElement('li');
      item.textContent = product.name + ' – ' + product.price + ' kr';
      return item;
    });
    list.textContent = '';
    list.append(...items);
  } catch (error) {
    console.log(error.message);
    list.textContent = 'Kunde inte hämta produkterna.';
  }
};

showCheap();

const showOrders = async () => {
  const list = document.querySelector('#orders');
  try {
    const orders = await getData('/api/orders');
    const items = orders.map((order) => {
      const item = document.createElement('li');
      item.textContent = 'Order ' + order.id + ' – ' + order.customer + ' – ' + order.status;
      return item;
    });
    list.textContent = '';
    list.append(...items);
  } catch (error) {
    console.log(error.message);
    list.textContent = 'Kunde inte hämta beställningarna.';
  }
};

showOrders();
