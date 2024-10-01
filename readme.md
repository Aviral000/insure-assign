Ice Cream Parlour Sales Data Processing Application
Overview
This project is a basic MERN stack application built to process sales data from an ice cream parlour. It takes a CSV (stored in insuredata.txt) and calculates:

Total sales of the store.
Month-wise sales totals.
Most popular items (by quantity sold) in each month.
Items generating the most revenue in each month.
Min, Max, and Average number of orders for the most popular items each month.
The application uses basic JavaScript data structures (like arrays and objects) to process the data, without any heavy libraries like Pandas or SQL databases.

Tech Stack
Frontend: React.js (using Axios to handle file uploads)
Backend: Node.js + Express (for handling file uploads and processing)
File Handling: Multer (for file upload)
Data Processing: Basic JavaScript (lists/arrays and objects/maps)
Features
Upload sales data in the form of a .txt (CSV format).
Process and display results, including:
Total sales
Month-wise sales totals
Most popular items by month
Most revenue-generating items by month
Order statistics for the most popular items (min, max, average orders)
Project Structure
graphql
Copy code
root/
│
├── backend/
│   ├── index.js               # Backend logic for file upload and sales data processing
│   └── uploads/                # Temporary storage for uploaded files (automatically handled)
│
├── frontend/
│   ├── src/
│   │   ├── App.js              # Main React component for uploading file and displaying results
│   │   └── index.js            # Entry point for React application
│   └── public/
│       └── index.html          # HTML template containing the root div for React
└── README.md                    # This file (Documentation)

Ensure you have the following installed:

Node.js

1. Backend Setup
npm install
Start the backend server:
node server.js

2. Frontend Setup
npm install
Start the frontend React app:
npm start

How to Use the Application
Start the Backend: Make sure the backend server is running on http://localhost:5000.
Start the Frontend: Ensure the React app is running on http://localhost:3000.
Upload File:
On the React frontend, upload the provided insuredata.txt file or any valid sales data file in the same format.
Click the "Upload & Process" button.
View Results:
Once uploaded, the application will display:
Total sales
Month-wise sales totals
The most popular and most revenue-generating items
Stats (min, max, and average) for the most popular item in each month.
Example Output
After uploading insuredata.txt, you will see results like:

Total Sales: ₹10,500
Month Wise Sales:
January: ₹3,500
February: ₹2,300
March: ₹4,700
Most Popular Items:
January: Death by Chocolate (50 orders)
Most Revenue Items:
January: Death by Chocolate (₹5,000)
Order Stats for Popular Item (Death by Chocolate):
Min: 1 order, Max: 10 orders, Average: 4 orders
Customization
To use a different dataset:

Ensure the file is in CSV format and contains the following columns:

Date (YYYY-MM-DD)
SKU (item name)
Unit Price (price per unit)
Quantity (number of units sold)
Total Price (calculated total price for the item)
Simply upload this file through the application, and the results will be recalculated.

Notes
File Handling: The file uploaded is temporarily stored in the backend using Multer and is deleted after processing.
No SQL or Pandas: The assignment was explicitly implemented using basic data structures like lists and maps.
Server Ports:
Backend: http://localhost:5000
Frontend: http://localhost:3000
Feel free to modify the code as needed. If you encounter any issues, please consult the setup instructions again or reach out for help.(only use vs code otherwise change the frontend url accordingly)
