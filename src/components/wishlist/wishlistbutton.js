import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { addWishlist, removeWishlist } from '../../utils/wishlist';
import {useRouter} from 'next/router'; 

function wishlistButton({customerData,setCustomerData,product,tokenValid}) {
    
    const [wishlist, setWishlist] = useState(0);
    const router = useRouter();
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
            
            const wishlistValue =	customerData?.wishlist && (customerData?.wishlist != 0) ?	customerData?.wishlist.find(function (element) {
                return element == product?.id;
            }) : null 

            if(wishlistValue)
            {
                setWishlist(1);
            } else {
                setWishlist(0);
            }
            
        }
        
}, [tokenValid,product]);
    return (
        <div key='wishlist'>
			Wishlist : 
             {router?.pathname != '/wishlist' ?
                <>{wishlist == '1'?
                <button onClick={removeWishlistPro}>Remove</button>
                :
                <button onClick={addWishlistPro}>Add</button>
                }</>
                :  <button onClick={removeWishlistPro}>Remove</button>}
			{wishlistLoding?'Loding':null}
		</div>
    )
}

export default wishlistButton
