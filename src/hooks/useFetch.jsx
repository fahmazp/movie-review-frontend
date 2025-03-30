import { axiosInstance } from "@/config/axiosInstance"
import { useEffect, useState } from "react"

export const useFetch = (url) => {

    const [movieData, setMovieData] = useState({})
    const [isLoading, setIsLoading] = useState([true])
    const [error, setError] = useState(null)


   //  api call functn
   const fetchMovieData = async ()=> {
       try {
        const response = await axiosInstance ({ method:"GET",url: url })  
        console.log("response---", response,); 
        setMovieData(response?.data?.data)
        setIsLoading(false)
        
       } catch (error) {   
         console.log(error);
         setError(error)
       }
     }

         useEffect(() => {
           fetchMovieData()
         },[])  


  return [movieData, isLoading, error]
}