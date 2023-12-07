import Link from 'next/link'
import React from 'react'
import Cookies from 'js-cookie';
//import { signOut } from "next-auth/react"

function Sidebar({setTokenValid}) {
   //function logout
	const logoutHanlder = async () => {
        let tokenName = Cookies.get('token');
		//remove token from cookies
		Cookies.remove("token");
		Cookies.remove("user_lgdt");
		Cookies.remove('customerData');
		Cookies.remove('coutData');
        if(tokenName == 'logingoogle')
        {
            //await signOut();
        }else{
            setTokenValid(0);
        }
	};
    return (
        <sidebar>
			<ul>
            <li>
                <Link href="/my-account/">
                    Dashboard
                </Link>
            </li>
            <li>
	            <Link href="/my-account/edit-account/">
	                My Profile
                </Link>

            </li>
            <li>
				 <Link href="/my-account/edit-address/">
				    Addresses
                </Link>

            </li>
			<li>
                <Link href="/my-account/rewards/">
                    Reward Points
                </Link>
            </li>
            <li>
				 <Link href="/my-account/orders/">
				    My Order
                </Link>
			</li>
            <li>
				<Link href="/cart" target="_blank">
				    My Cart
                </Link>
			</li>
            {/*}<li>
                <Link href="/my-account/Wishlist/">
                    My Wishlist
                </Link>
	</li>{*/}
            <li>
			 	<Link href="/my-account/track-order/" target="_blank">
                    Track Order
                </Link>

            </li>
            <li>
                <Link href="/my-account/faqs/" target="_blank">
                    FAQs
                </Link>
            </li>
            <li>
				<button onClick={logoutHanlder}>logout</button>
			</li>
	    </ul>
		</sidebar>
    )
}

export default Sidebar
