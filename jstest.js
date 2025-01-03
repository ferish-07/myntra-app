let ques = {
  orders: [
    {
      orderId: 101,
      customerId: 1,
      products: [
        {productId: 201, quantity: 2},
        {productId: 202, quantity: 1},
      ],
      status: 'Pending',
    },
    {
      orderId: 102,
      customerId: 2,
      products: [{productId: 203, quantity: 3}],
      status: 'Shipped',
    },
  ],
  customers: [
    {customerId: 1, name: 'Alice', email: 'alice@example.com'},
    {customerId: 2, name: 'Bob', email: 'bob@example.com'},
  ],
  products: [
    {productId: 201, name: 'Laptop', price: 1000, stock: 5},
    {productId: 202, name: 'Mouse', price: 50, stock: 0},
    {productId: 203, name: 'Keyboard', price: 80, stock: 2},
  ],
};

function calculateOrderValue(orderId) {
  let order = ques.orders.find(i => i.orderId == orderId);
  let products = ques.products;
  let TotalSum = 0;
  order.products.forEach(item => {
    products.forEach(product => {
      if (item.productId == product.productId) {
        TotalSum = TotalSum + product.price * item.quantity;
      }
    });
  });
  return TotalSum;
}
console.log('Question 1 Answer-->', calculateOrderValue(101));

function getProductsInOrder(orderId) {
  let order = ques.orders.find(i => i.orderId == orderId);
  let products = ques.products;
  let product_array = [];
  order.products.forEach(order => {
    products.forEach(product => {
      if (order.productId == product.productId) {
        product_array.push({
          name: product.name,
          quantity: order.quantity,
        });
      }
    });
  });

  return product_array;
}
console.log('Question 2 Answer ->> ', getProductsInOrder(101));

function updateOrderStatus(orderId, newStatus) {
  return new Promise((resolve, reject) => {
    // Simulate a 2-second delay using setTimeout
    setTimeout(() => {
      // Find the order by orderId
      const order = ques.orders.find(order => order.orderId === orderId);

      if (order) {
        // Update the order status
        order.status = newStatus;

        // Resolve the promise with the updated order
        resolve(order);
      } else {
        // Reject the promise if the order is not found
        reject(new Error('Order not found'));
      }
    }, 2000); // 2 seconds delay
  });
}

// Usage Example
updateOrderStatus(105, 'Shipped')
  .then(updatedOrder => {
    console.log('Updated Order:', updatedOrder);
  })
  .catch(error => {
    console.error(error);
  });
function filterOrdersByStatus(status) {
  return ques.orders.filter(i => i.status == status);
}
console.log('Question 4 answer -> ', filterOrdersByStatus('Pending'));
let newOrder = {
  customerId: 1,
  products: [{productId: 202, quantity: 2}],
  status: 'Pending',
};

function createOrder(newOrder) {
  try {
    if (!ques.customers.find(i => i.customerId == newOrder.customerId)) {
      throw 'customer not found';
    }
    newOrder?.products.forEach(i => {
      if (!ques.products.find(item => item.productId == i.productId)) {
        throw `Product ${i.productId} not found`;
      }
    });
    // let max_order_id = ques.orders[0].orderId;
    // ques?.orders.forEach(i => {
    //   if (i.orderId > max_order_id) {
    //     max_order_id = i.orderId + 1;
    //   }
    // });
    let sortedOrders = ques.orders.sort((a, b) => b.orderId - a.orderId);
    newOrder.orderId = sortedOrders[0].orderId + 1;
    ques?.orders.push(newOrder);
    return ques.orders;
  } catch (error) {
    console.log('error', error);
  }
}
console.log('Question 5 Answer', createOrder(newOrder));

function findOrdersByCustomer(custId) {
  return ques.orders.filter(i => i.customerId == custId);
}
console.log('Question 6 Answer', findOrdersByCustomer(1));

function checkStockAvailability(orderId) {
  let order = ques.orders.find(i => i.orderId == orderId);

  let products = ques.products;
  let new_products;
  new_products = order.products.map(i => {
    return products.find(i2 => i2.productId == i.productId);
  });

  return new_products.every(i => i.stock > 0);
}

console.log('Question 7 Answer', checkStockAvailability(101));
