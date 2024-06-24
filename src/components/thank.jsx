import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ThankYouPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (

      <div className="flex-center">
         <div className="spinner-container">
         <div className="spinner"></div>
        <p className="text-xl text-white">ขอบคุณที่ใช้บริการ</p>
        <p className="text-xl text-white">ระบบกำลัง Redirect คุณไปหน้าแรกที่คุณเคยเข้ามา</p>
      </div>
    </div>
  );
}

export default ThankYouPage;
