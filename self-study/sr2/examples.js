const {
    loadOrders,
    orderTotal,
    findOrder,
    byStatus,
    cities,
    revenueByCity,
    averageOrder,
    topCustomers,
    bestSeller,
    inMonth
} = require('./orders');
const orders = loadOrders('./self-study/sr2/orders.json');
console.log('Перевірка revenueByCity:');
console.log(revenueByCity(orders));
console.log('Перевірка averageOrder:');
console.log(averageOrder(orders));
console.log('Перевірка topCustomers:');
console.log(topCustomers(orders, 3));
console.log('Перевірка bestSeller:');
console.log(bestSeller(orders));
console.log('Перевірка inMonth:');
console.log(inMonth(orders, '2026-04'));
