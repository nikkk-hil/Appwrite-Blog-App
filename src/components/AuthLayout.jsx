import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AuthLayout({children, authentication = true}) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if (authentication && authentication !== authStatus)
            navigate("/login");
        else if (!authentication && authentication !== authStatus)
            navigate("/");

        setLoader(false);
    }, [authStatus, navigate, authentication])
    
  return loader ? <h2>Loading...</h2> : <> {children} </>
}