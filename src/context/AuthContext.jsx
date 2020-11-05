import React,{useEffect,useState} from 'react'
import firebase from './firebaseConfig'
import Login from '../secciones/login/index'
import Spinner from '../layout/spinner'
import Index from './index'
import {Redirect} from 'react-router-dom'
export default function AuthContext(props) {
    const [user,setUser]=useState(false);
    const [loading,setLoading]=useState(true)
    useEffect( () => {
       firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    setUser(user)
                    setLoading(false)
                } else {
                    setUser(false)
                    setLoading(false)
                }
        });

    }, [])
    if (loading!==true) {
        if (user!==false) {
            return(
            <Index firebase={firebase} auth={user}>
                {props.children}
            </Index>    
            )
        }else if((window.location.pathname.slice(0,11))==="/invitation"){
            return(props.children)
        }
        else{
            return(<Login firebase={firebase}/>)
        }
    }
    else{
        return(<Spinner/>)
    }
    
}
