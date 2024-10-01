import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };

  return (
    <div>
      <h1>Ice Cream Parlour Sales Data</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload & Process</button>

      {result && (
        <div>
          <h2>Total Sales: {result.totalSales}</h2>
          <h3>Month Wise Sales:</h3>
          <ul>
            {Object.keys(result.monthWiseSales).map(month => (
              <li key={month}>
                {month}: {result.monthWiseSales[month]}
              </li>
            ))}
          </ul>

          <h3>Most Popular Items:</h3>
          <ul>
            {Object.keys(result.mostPopularItem).map(month => (
              <li key={month}>
                {month}: {JSON.stringify(result.mostPopularItem[month])}
              </li>
            ))}
          </ul>

          <h3>Most Revenue Items:</h3>
          <ul>
            {Object.keys(result.mostRevenueItem).map(month => (
              <li key={month}>
                {month}: {JSON.stringify(result.mostRevenueItem[month])}
              </li>
            ))}
          </ul>

          <h3>Popular Item Stats:</h3>
          <ul>
            {Object.keys(result.popularItemStats).map(item => (
              <li key={item}>
                {item}: {JSON.stringify(result.popularItemStats[item])}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
