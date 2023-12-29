import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { addWishlist, removeWishlist } from '../../utils/wishlist';

function wishlistButton({customerData,setCustomerData,product,tokenValid}) {
    const [wishlist, setWishlist] = useState(0);
		 const [wishlistLoding,setWishlistLoding] = useState(false);
    const removeWishlistPro = () => {
        removeWishlist(customerData,setCustomerData,product,setWishlistLoding,setWishlist);
   }

   const addWishlistPro = async () => {
       addWishlist(customerData,setCustomerData,product,setWishlistLoding,setWishlist);
   }
   useEffect(() => {
        if(tokenValid == 1 && customerData?.wishlist != '')
        {
            
            const wishlistValue =	customerData?.wishlist ?	customerData?.wishlist.find(function (element) {
                return element == product?.id;
            }) : null 

            if(wishlistValue)
            {
                setWishlist(1);
            }
        }
        
}, [tokenValid]);
    return (
        <div key='wishlist'>
			Wishlist : {wishlist == '1'?
			<span><button onClick={removeWishlistPro}>Remove</button></span>
			:
			<span><button onClick={addWishlistPro}>Add</button></span>
			}
			{wishlistLoding?'Loding':null}
		</div>
    )
}

export default wishlistButton
