import { useState } from 'react';
import axios from 'axios';

function PostDataLine() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);


  const postData = async (ItemData) => {
    if (ItemData.length === 0) {
      alert('กรุณาเลือกอย่างน้อยหนึ่งรายการ');
      return;
    }
    console.log("st=>",ItemData)
    setLoading(true);
    try {
      const result = await axios.post('https://pathapong.com/v1/daily/notify', {
        message: ItemData
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setResponse(result.data);
    } catch (error) {
      setError(error);
      console.error('Error sending data:', error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return { postData, loading, response, error };
}
export default PostDataLine;
