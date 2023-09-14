import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import http from "../services/httpServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getData = async () => {
      try {
        const { data } = await http.get(url, {
          signal
        });
        setData(data ? data : []);
        setLoading(false);
      } catch (ex) {
        if (ex.response && ex.response.status === 404) {
          navigate("*", { replace: true });
        } else if (!http.isCancel(ex) || ex.name === "AxiosError") {
          // toast.error(ex.message);
          setErrors(ex.message);
        }
        setLoading(false);
      }
    };

    getData();

    return () => controller?.abort();
  }, [url]);

  return { data, isLoading, errors };
};

export default useFetch;
