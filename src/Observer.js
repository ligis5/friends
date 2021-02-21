import React, {useState, useEffect} from 'react';


const useObserver = (ref) =>{
    const [isIntersecting, setIntersecting] = useState(false)

    const options = {
        rootMargin:'200px'
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
          setIntersecting(entry.isIntersecting)
      }, options)
  
    useEffect(() => {
      observer.observe(ref.current)
      return () => {
        observer.disconnect()
      }
    }, [])
  
    return isIntersecting
  }
  export default useObserver
