import { useEffect, useState } from "react";
import { baseUrl, blogsApiUrl } from "../../config.json";
import http from "../services/httpServices";

const apiEndPoint = `${baseUrl}/${blogsApiUrl}`;

function usePosts(options) {
  const [postData, setPostData] = useState({
    data: [],
    meta: {}
  });
  const [isError, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const fetchPosts = () => {
    const abortController = new AbortController();
    http
      .get(`${apiEndPoint}${options}`, {
        signal: abortController.signal
      })
      .then(({ data }) => setPostData(data))
      .catch((err) => {
        if (!http.isCancel) {
          console.log(err);
        }
      });

    return { cancel: () => abortController.abort() };
  };

  useEffect(() => {
    const { cancel } = fetchPosts();
    return () => cancel();
  }, []);

  return { postData, isError, isLoading, setPosts: setPostData, fetchPosts };
}

export default usePosts;
