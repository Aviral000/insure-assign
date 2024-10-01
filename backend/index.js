const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();
const port = 5000;

const upload = multer({ dest: 'uploads/' });

const parseCSV = (data) => {
  const lines = data.split('\n');
  const headers = lines[0].split(',');
  const entries = lines.slice(1).map(line => {
    const values = line.split(',');
    let obj = {};
    headers.forEach((header, index) => {
      obj[header.trim()] = values[index].trim();
    });
    return obj;
  });
  return entries;
};

const processSalesData = (data) => {
  let totalSales = 0;
  let monthWiseSales = {};
  let mostPopularItem = {};
  let mostRevenueItem = {};
  let itemOrderStats = {};

  data.forEach(entry => {
    const [year, month] = entry.Date.split('-');
    const key = `${year}-${month}`;
    const quantity = parseInt(entry.Quantity);
    const totalPrice = parseInt(entry['Total Price']);

    // Update total sales
    totalSales += totalPrice;

    // Update month-wise sales
    if (!monthWiseSales[key]) monthWiseSales[key] = 0;
    monthWiseSales[key] += totalPrice;

    // Track most popular item
    if (!mostPopularItem[key]) mostPopularItem[key] = {};
    if (!mostPopularItem[key][entry.SKU]) mostPopularItem[key][entry.SKU] = 0;
    mostPopularItem[key][entry.SKU] += quantity;

    // Track most revenue generating item
    if (!mostRevenueItem[key]) mostRevenueItem[key] = {};
    if (!mostRevenueItem[key][entry.SKU]) mostRevenueItem[key][entry.SKU] = 0;
    mostRevenueItem[key][entry.SKU] += totalPrice;

    // Track order stats for most popular item
    if (!itemOrderStats[entry.SKU]) itemOrderStats[entry.SKU] = [];
    itemOrderStats[entry.SKU].push(quantity);
  });

  // Calculate min, max, average for popular item
  const popularItemStats = {};
  Object.keys(itemOrderStats).forEach(item => {
    const orders = itemOrderStats[item];
    const total = orders.reduce((a, b) => a + b, 0);
    popularItemStats[item] = {
      min: Math.min(...orders),
      max: Math.max(...orders),
      avg: (total / orders.length).toFixed(2),
    };
  });

  return { totalSales, monthWiseSales, mostPopularItem, mostRevenueItem, popularItemStats };
};

app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = req.file.path;
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const salesData = parseCSV(data);
    const result = processSalesData(salesData);
    fs.unlinkSync(filePath);
    res.json(result);
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
