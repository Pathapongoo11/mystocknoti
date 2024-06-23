import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { increment, decrement } from "../helper/quantity-helper";

function SummaryPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { confirmedProducts } = location.state || { confirmedProducts: [] };
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (confirmedProducts.length > 0) {
      setProducts(confirmedProducts);
      localStorage.setItem("products", JSON.stringify(confirmedProducts));
    } else {
      const savedProducts = JSON.parse(localStorage.getItem("products"));
      console.log("Saved products from localStorage:", savedProducts);
      if (savedProducts && savedProducts.length > 0) {
        setProducts(savedProducts);
        console.log("Using saved products from localStorage");
      } else {
        navigate("/");
      }
    }
  }, [confirmedProducts, navigate]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    if (products.length === 0) {
      window.addEventListener("beforeunload", handleBeforeUnload);

      const timer = setTimeout(() => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        navigate("/");
      }, 3000); 
      return () => {
        clearTimeout(timer);
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [products, navigate]);

  const handleIncrement = (id) => {
    const newProducts = increment(products, id);
    setProducts(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));
  };

  const handleDecrement = (id) => {
    const updatedProducts = products
      .map((product) => {
        if (product.id === id) {
          if (product.quantity > 1) {
            return { ...product, quantity: product.quantity - 1 };
          } else {
            const confirmDelete = window.confirm(
              "จำนวนสินค้ายังเหลือ 1 คุณต้องการลบสินค้านี้หรือไม่?"
            );
            if (confirmDelete) {
              return null;
            }
          }
        }
        return product;
      })
      .filter((product) => product !== null); 

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const handleRemoveItem = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const goBackToProducts = () => {
    navigate("/", { state: { products: products } });
  };

  return (
    <>
      {products.length === 0 && (
        <div className="bg-white p-5 rounded-lg shadow-lg my-5 mx-auto relative max-w-4xl min-h-screen summary-set-width text-black">
          <div className="text-center">
            <p className="text-2xl text-black">ไม่มีสินค้าในรายการ</p>
            <p className="text-xl text-black">กำลังนำท่านกลับไปยังหน้าผลิตภัณฑ์...</p>
          </div>
        </div>
      )}

      {products.length > 0 && (
         <div className="bg-white p-5 rounded-lg shadow-lg my-5 mx-auto relative max-w-4xl min-h-screen summary-set-width">
         <button
           className="absolute top-3 left-5 text-gray-500 hover:text-gray-600 focus:outline-none"
           onClick={goBackToProducts}
         >
           <span className="material-icons text-white">ย้อนกลับ</span>
         </button>
         <h2 className="text-4xl font-semibold text-center mb-6 text-black">
           สรุปรายการที่สั่ง
         </h2>
         <table className="min-w-full leading-normal">
           <thead>
             <tr>
               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                 ลำดับ
               </th>
               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                 รายการ
               </th>
               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                 จำนวน
               </th>
               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                 Actions
               </th>
               <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                 ประเภท
               </th>
             </tr>
           </thead>
           <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {index + 1}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img
                          className="w-full h-full rounded-full"
                          src={product.image}
                          alt={product.name}
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {product.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {product.quantity}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-white bg-red-500 hover:bg-red-700 rounded-full px-3 py-1 focus:outline-none"
                        onClick={() => handleDecrement(product.id)}
                      >
                        -
                      </button>
                      <button
                        className="text-white bg-green-500 hover:bg-green-700 rounded-full px-3 py-1 focus:outline-none"
                        onClick={() => handleIncrement(product.id)}
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemoveItem(product.id)}
                        className="remove-btn text-white bg-red-500"
                      >
                        ลบ
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap text-black">
                          {product.unit}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br></br>
          <div className="flex items-center">
          <button
          className="px-6 w-full py-2 rounded-full font-bold 
        
             bg-green-400 text-black"
        //   onC
        >
          ส่งข้อมูล
        </button> 
        </div>
        </div>
      )}
         </>
  );
}

export default SummaryPage;
