import { useState, useEffect } from "react";
import notFoundImage from '../assets/404.png';

function NotFoundPage() {
  return (
    <div className="w-full bg-white">
            <img src={notFoundImage} alt="Not Found"/>
        </div>
  )
}
export default NotFoundPage;
