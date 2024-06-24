import React, { useEffect, } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/products/product";
import SummaryPage from "./components/summary/summary-items";
import NotFoundPage from './components/notfound-page';
import ThankYou from './components/thank';

import "./App.css";
import "./index.css";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/thank" element={< ThankYou/>} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
