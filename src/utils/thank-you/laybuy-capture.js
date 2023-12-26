import axios from "axios";

export function payment_capture_laybuy(token,orderData) {
    let laybuyCapture = JSON.stringify({
        "token":token
    });
    const createCapture = {
        afterpay : 1,
        laybuyCapture: laybuyCapture,
    };
    //console.log('createCapture',createCapture)
    axios.post( '/api/laybuy/payment-check', createCapture )
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
                axios.post( '/api/order/update-order', newOrderData )
                    .then( res => {
        
                        //console.log('res UPDATE DATA ORDER',res);
                    } )
                    .catch( err => {
                        console.log('err UPDATE DATA ORDER',err);
                    } )
            }else{
                const newOrderNote = {
                    orderId: orderData?.id,
                    noteMessage: 'Error :'+ data?.error
                };
                axios.post( '/api/order/update-order-notes', newOrderNote )
                    .then( res => {
                            console.log('res UPDATE DATA ORDER Note',res);
                    } )
                    .catch( err => {
                        console.log('err UPDATE DATA ORDER Note ',err);
                    } )
            }
        } )
        .catch( err => {
            console.log('err ',err);
        } )
    
}