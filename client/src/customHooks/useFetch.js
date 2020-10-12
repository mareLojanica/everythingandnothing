import { useState, useEffect } from "react";
import axios from 'axios'
export const useFetch = url => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(url).then(result =>{
        setData(result.data.pictures);
        setLoading(false);
    })
  }, [url]);
  
  const handleResponse = (url) =>{
      setLoading(true);
      setData(null);
      axios.get(url).then(result =>{
        console.log(result.data)
        setData(result.data.pictures);
        setLoading(false);
      })
  } 
  return { data, loading, handleResponse };
};