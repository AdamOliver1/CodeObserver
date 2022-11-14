import { useState, useEffect } from "react";
import axiosApi from "../api/axios";
import axios from "axios";

const useAxiosPost = (url, reqData) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        axiosApi.post(url, reqData, { cancelToken: cancelToken.token })
            .then(res => {
                setIsPending(false);
                setData(res.data);
                setError(null);
            })
            .catch(err => {
                if (axios.isCancel(err)) {
                    return;
                }
                setIsPending(false);
                setError(err.message);
            })
        return () => {
            cancelToken.cancel();
        }
    }, [url]);
    return { data, isPending, error }
}


export default useAxiosPost;