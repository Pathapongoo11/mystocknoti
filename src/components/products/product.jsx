import ProudctProductsList from "../products/product-list";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {getAllowedUnits} from "../helper/helper"

function ProductList() {
  const location = useLocation();

  const [products, setProducts] = useState(ProudctProductsList);
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(-1);
  const selectedProduct = products[selectedProductIndex];
  const isAnyProductConfirmed = products.some((product) => product.isConfirmed);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
    const confirmedProductsFromState = location.state?.products || [];

    const entries = performance.getEntriesByType("navigation");
    const isReload = entries.length && entries[0].type === "reload";

    if (isReload && location.state) {
      navigate(location.pathname, { replace: true, state: null });
    }


    if (location.state?.products) {
      updateProductsItem(confirmedProductsFromState);
      
    }

    return () => clearTimeout(timer); // Cleanup the timer
    
  }, [location.state]);
  function openModal(index) {
    setSelectedProductIndex(index);
    setModalIsOpen(true);
  }

  function closeModal() {
    if (!products[selectedProductIndex].isConfirmed) {
      resetProduct(selectedProductIndex);
    }
    setModalIsOpen(false);
  }

  function confirmOut() {
    const updatedProducts = products.map((product, index) =>
      index === selectedProductIndex
        ? { ...product, isConfirmed: true }
        : product
    );
    closeModal();
    setProducts(updatedProducts);
  }

  function resetProduct(index) {
    const updatedProducts = products.map((product, idx) =>
      idx === index
        ? { ...product, quantity: 1, unit: "ชิ้น", isConfirmed: false }
        : product
    );
    setProducts(updatedProducts);
  }
  function increment() {
    if (selectedProduct.quantity < 10) {
      updateProductQuantity(selectedProductIndex, selectedProduct.quantity + 1);
    }
  }

  function decrement() {
    if (selectedProduct.quantity > 1) {
      updateProductQuantity(selectedProductIndex, selectedProduct.quantity - 1);
    }
  }

  function updateProductQuantity(index, quantity) {
    const updatedProducts = products.map((product, idx) =>
      idx === index ? { ...product, quantity: quantity } : product
    );
    setProducts(updatedProducts);
  }

  function updateProductUnit(newUnit) {
    const updatedProducts = products.map((product, index) =>
      index === selectedProductIndex ? { ...product, unit: newUnit } : product
    );
    setProducts(updatedProducts);
  }

  function save() {
    const confirmedProducts = products.filter((p) => p.isConfirmed);
    setIsLoading(true); // Start loading
    setTimeout(() => {
      navigate("/summary", { state: { confirmedProducts: confirmedProducts } });
    }, 1000);
  }

  function clearTiem() {
    setProducts(
      products.map((p) => ({ ...p, isConfirmed: false, quantity: 1, unit: "" }))
    );
    setModalIsOpen(false);
  }

  function updateProductsItem(items) {
    const updatedProducts = products.map((defaultProduct) => {
      const foundProduct = items.find((p) => p.id === defaultProduct.id);
      return foundProduct || defaultProduct;
    });
    setProducts(updatedProducts);
  }

  return (
    <>
      {isLoading && (
        <div className="full-page-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <center>
        <p className="Header-Text">รายการสินค้าที่ต้องสั่ง</p>
      </center>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {products.map((product, index) => (
          <div
            key={index}
            onClick={() => (product.isConfirmed ? "" : openModal(index))}
            className={`bg-white border border-gray-300 rounded-lg shadow p-4 flex flex-col items-center text-center ${
              product.isConfirmed ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-full mx-auto mb-3"
            />
            <div className="text-sm font-medium product-name">
              {index + 1} . {product.name}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          className={`px-6 py-2 rounded-full font-bold ${
            isAnyProductConfirmed
              ? "bg-blue-500 text-white"
              : "bg-gray-400 text-black"
          }`}
          disabled={!isAnyProductConfirmed}
          onClick={() => save()}
        >
          ส่งข้อมูล
        </button>
      </div>
      {selectedProduct && modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="bg-white rounded-lg p-5 max-w-md mx-auto"
          appElement={document.getElementById("root")}
          overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center"
        >
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-4 product-item-name">
              {selectedProduct.name}
            </h2>
            <div className="flex items-center mb-4">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-3"
              />
            </div>

            <div className="flex items-center mb-4">
              <label className="text-sm font-medium mr-3 text-black">
                จำนวน
              </label>

              <button
                onClick={decrement}
                className="bg-red-500 text-white px-3 py-2 rounded"
              >
                -
              </button>
              <input
                type="text"
                value={selectedProduct.quantity}
                className="mx-auto  w-12 bg-white text-black text-center"
                readOnly
              />
              <button
                onClick={increment}
                className="bg-green-500 text-white px-3 py-2 rounded"
              >
                +
              </button>
            </div>
            <div className="flex items-center mb-6">
              <label className="text-sm font-medium mr-5 text-black">
                ประเภท
              </label>

              <select
                value={selectedProduct.unit}
                onChange={(e) => updateProductUnit(e.target.value)}
                className=" mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white text-black"
              >
                <option value="">กรุณาเลือก</option>
                {getAllowedUnits(selectedProduct.id).map((unit) => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>

            <button
              onClick={confirmOut}
              disabled={!selectedProduct.unit}

              className={`w-full mt-4 px-4 py-2  bg-blue-500 text-white rounded  ${
                !selectedProduct.unit ? "bg-gray-500 text-white " : "bg-blue-500 text-white hover:bg-blue-700"
              }`}
    
            >
              ยินยัน
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
export default ProductList;
