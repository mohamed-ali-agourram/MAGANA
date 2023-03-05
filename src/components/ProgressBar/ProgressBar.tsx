//dependencies
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const ProgressBar = ()=>{
  const [progress, setProgress] = useState(0)
  const [isPathChanged, setIsPathChanged] = useState(false)
  const location = useLocation()

  useEffect(()=>{
    setIsPathChanged(true)
  },[location])

  useEffect(()=>{
      if(isPathChanged){   
        const progressTimer = setInterval(()=>{
          if(progress <= 100){
            setProgress(progress => progress + 10);
          }else{
            setIsPathChanged(false)
            setProgress(0)
            clearInterval(progressTimer)
          }
        }, 20)
        return ()=>{
          clearInterval(progressTimer)
        }
      }
  }, [progress, isPathChanged])

  return <div className="progressBar" style={{width: `${progress}%`}}></div>
}
