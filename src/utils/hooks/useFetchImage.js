import Axios from "axios";
import React, { useEffect, useState } from "react";

const api = process.env.REACT_APP_UNSPLASH_API;
const secret = process.env.REACT_APP_UNSPLASH_KEY;

export default function useFetchImage(page, searchTerm) {
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log(searchTerm);

  // useEffect(() => {

  //   setIsLoading(true)

  //   const url = searchTerm === null ?'photos' :'search/photos'

  //   Axios.get(`${api}/${url}?client_id=${secret}&page=${page}&query=${searchTerm}`)

  //     .then((res) => {
  //       if(searchTerm) {
  //         setImages([...res.data.results]);
  //       } else {
  //         setImages([...images, ...res.data]);
  //       }
  //       setIsLoading(false)
  //     })
  //     .catch((e) => {
  //       // setErrors(e.response.data.errors);
  //       setErrors(['Unable to fetch images']);
  //       setIsLoading(false)
  //     });
  // }, [page, searchTerm ]);


  useEffect(() => {
    setIsLoading(true)
    Axios.get(`${api}/photos?client_id=${secret}&page=${page}`)
      .then((res) => {
        setImages([...images, ...res.data]);
        setIsLoading(false)
      })
      .catch((e) => {
        // setErrors(e.response.data.errors);
        setErrors(['Unable to fetch images']);
        setIsLoading(false)
      });
  }, [page]);


  useEffect(() => {
    setIsLoading(true)
    if(searchTerm === null) return;
    Axios.get(`${api}/search/photos?client_id=${secret}&page=${page}&query=${searchTerm}`)
      .then((res) => {
        setImages([...res.data.results]);
        setIsLoading(false)
      })
      .catch((e) => {
        setErrors(['Unable to fetch images']);
        setIsLoading(false)
      });
   
  }, [searchTerm])

  return [images, setImages, errors, isLoading];
}
