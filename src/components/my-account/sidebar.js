import Link from 'next/link'
import React from 'react'
;
import { signOut } from "next-auth/react"

function Sidebar({setTokenValid}) {
   //function logout
	const logoutHanlder = async () => {
        let tokenName = localStorage.getItem('token');
		//remove token from localstorage
		localStorage.setItem("token",'');
		localStorage.setItem("user_lgdt",'');
		localStorage.setItem('customerData','');
		localStorage.setItem('coutData','');
        if(tokenName == 'logingoogle')
        {
            await signOut();
        }else{
            setTokenValid(0);
        }
	};
    return (
        <div key='sidebar'>
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
				<Link href="/cart">
				    My Cart
                </Link>
			</li>
            {/*}<li>
                <Link href="/my-account/Wishlist/">
                    My Wishlist
                </Link>
	</li>{*/}
            <li>
			 	<Link href="/my-account/track-order/">
                    Track Order
                </Link>

            </li>
            <li>
                <Link href="/faqs/">
                    FAQs
                </Link>
            </li>
            <li>
				<button onClick={logoutHanlder}>logout</button>
			</li>
	    </ul>
		</div>
    )
}

export default Sidebar
