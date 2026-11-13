const fs = require('node:fs'); 
function loadOrders(file) { // Читає JSON-файл і повертає масив замовлень.
    const data = fs.readFileSync(file, 'utf8'); 

    return JSON.parse(data);
}
function orderTotal(order) { // Обчислює загальну вартість замовлення.
    return order.items.reduce((accumulator, item) => {
        return accumulator + (item.price * item.qty);
    }, 0);
}
function findOrder(orders, id) { // Знаходить замовлення за його ідентифікатором.
    return orders.find(order => order.id === id);
}
function byStatus(orders, status) { // Фільтрує замовлення за статусом.
    return orders.filter(order => order.status === status);
}
function cities(orders) { // Повертає масив унікальних міст, де були зроблені замовлення.
    const citiesSet = new Set(orders.map(order => order.city));
    return Array.from(citiesSet).sort((a, b) => a.localeCompare(b, 'uk'));
}
function revenueByCity(orders) { // Обчислює прибуток за містами.
    const revenue = {};
    orders.filter(order => order.status !== 'cancelled').forEach(order => {
        if (!revenue[order.city]) {
            revenue[order.city] = 0;
        }
        revenue[order.city] += order.items.reduce((accumulator, item) => {
            return accumulator + (item.price * item.qty);
        }, 0);
    });
    return revenue;
}
function averageOrder(orders) { // Обчислює середню вартість замовлення.
    const totalRevenue = orders
    .filter(order => order.status !== 'cancelled')
    .reduce((accumulator, order) => {
        return accumulator + orderTotal(order);
    }, 0);
    const orderCount = orders.filter(order => order.status !== 'cancelled').length;
    return orderCount > 0 ? Math.round((totalRevenue / orderCount) * 100) / 100 : 0;
}
function topCustomers(orders, n) { // Повертає масив топ n клієнтів за сумою замовлень.
    const customerRevenue = {}; 
    orders.filter(order => order.status !== 'cancelled').forEach(order => {
        if (!customerRevenue[order.customer]) {
            customerRevenue[order.customer] = 0;
        }
        customerRevenue[order.customer] += orderTotal(order);
    });
    return Object.entries(customerRevenue)
        .sort((a, b) => b[1] - a[1])
        .slice(0, n)
        .map(([customer, total]) => ({ customer, total }));
}
function bestSeller(orders) { // Повертає об'єкт з найпопулярнішим товаром та його кількістю.
   const allItems = orders
    .filter(order => order.status !== 'cancelled')
    .flatMap(order => order.items);
    const productSales = allItems.reduce((accumulator, item) => {
        if (!accumulator[item.title]) {
            accumulator[item.title] = 0;
        }
        accumulator[item.title] += item.qty;
        return accumulator;
    }, {});
    const bestProduct = Object
    .entries(productSales)
    .reduce((max, [title, qty]) => qty > max.qty ? { title, qty } : max, { title: '', qty: 0 });
    return bestProduct;
}
function inMonth(orders, month) { // Повертає замовлення за певний місяць.
    return orders
    .filter(order => order.date.startsWith(month))
    .sort((a, b) => b.date.localeCompare(a.date, 'uk'));
}
module.exports = { loadOrders, orderTotal, findOrder, byStatus, cities, 
    revenueByCity, averageOrder, topCustomers, bestSeller, inMonth };      
