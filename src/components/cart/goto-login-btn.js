import Cookies from "js-cookie";
import Router from "next/router";
import { useEffect } from "react";
import { useState } from "react";

const GotoLoginBtn = () => {
	const [btnText,setBtnText]=useState('Go to login');
	useEffect(() => {
        //check token
        if(Cookies.get('token')) {
			setBtnText('Go to Myaccount');
        }
	}, []);
  return(	
  		<button onClick={()=>{
		Router.push("/my-account/");
		}}>{btnText}</button>
  	)
};

export default GotoLoginBtn;
