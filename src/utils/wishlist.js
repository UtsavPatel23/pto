import axios from "axios";
import { isEmpty } from "lodash";
import { WISHLIST_URL } from "./constants/endpoints";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import Router from "next/router";

export const removeWishlist = async (customerData,setCustomerData,product,setWishlistLoding,setWishlist) => {
    setWishlistLoding(true);
    console.log('customerData remo before',customerData);
    const payload = {
        user_id: customerData?.id, 
        action: 'remove',
        product_id:product.id 
    };
    const {data : wishlistData } = await axios.post( WISHLIST_URL,payload ); 
    console.log('wishlistData',wishlistData);
    if(wishlistData?.code == '200')
    {
        if(!isEmpty(wishlistData?.result))
        {
            setCustomerData( { ...customerData, wishlist: wishlistData?.result } );
            localStorage.setItem('customerData',JSON.stringify({ ...customerData, wishlist: wishlistData?.result } ));
        }
        setWishlist(0);
    }
    console.log('customerData remo after',customerData);
    setWishlistLoding(false);
}

export const addWishlist = async (customerData,setCustomerData,product,setWishlistLoding,setWishlist) => {
    setWishlistLoding(true);
    console.log('customerData add befor',customerData);
    if(customerData?.id)
    {
        const payload = {
            user_id: customerData?.id, 
            action: 'add',
            product_id:product.id 
        };
        const {data : wishlistData } = await axios.post( WISHLIST_URL,payload ); 
        console.log('wishlistData',wishlistData);
        if(wishlistData?.code == '200')
        {
            if(!isEmpty(wishlistData?.result))
            {
                setWishlist(1);
                setCustomerData( { ...customerData, wishlist: wishlistData?.result } );
                localStorage.setItem('customerData',JSON.stringify({ ...customerData, wishlist: wishlistData?.result } ));
            }
        }
    }else{
        confirmAlert({
            //  title: 'Cancel Order',
              message: 'Please Login',
              buttons: [
                {
                  label: 'Yes',
                  onClick: async() => {Router.push("/my-account/")}
                },
                {
                  label: 'No',
                  onClick: () => ''
                }
              ]
            });
    }
    console.log('customerData add after',customerData);
    setWishlistLoding(false);
}