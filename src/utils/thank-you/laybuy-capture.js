import axios from "axios";
import { update_order, update_order_notes } from "../apiFun/order";
import { NEXT_PUBLIC_SITE_API_URL } from "../constants/endpoints";

export function payment_capture_laybuy(token,orderData) {
    let laybuyCapture = JSON.stringify({
        "token":token
    });
    const createCapture = {
        afterpay : 1,
        laybuyCapture: laybuyCapture,
    };
    //console.log('createCapture',createCapture)
    axios.post( NEXT_PUBLIC_SITE_API_URL + '/api/laybuy/payment-check', createCapture )
        .then( res => {
            console.log('res ',res);
            var data = res?.data;
            if(data?.result == 'SUCCESS')
            {
                const newOrderData = {
                    orderId: orderData?.id,
                    orderStausLaybuy: 1,
                    token: token,
                    payment_method : orderData?.payment_method,
                    orderno : data?.orderId,

                };
                update_order(newOrderData);
                
            }else{
                const newOrderNote = {
                    orderId: orderData?.id,
                    noteMessage: 'Error :'+ data?.error
                };
                update_order_notes(newOrderNote);
            }
        } )
        .catch( err => {
            console.log('err ',err);
        } )
    
}