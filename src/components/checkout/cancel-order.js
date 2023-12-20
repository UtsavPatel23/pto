import React from "react";
import Router from 'next/router';
import { clearCart } from "../../utils/cart";

// Renders errors or successfull transactions on the screen.
function Message({ content }) {
  return <p>{content}</p>;
}

function CancelOrderButton({createdOrderData}) {
  
  const checkoutOrderData = createdOrderData?.allData;
  if(!checkoutOrderData)
  {
    return '';
  }
  const cancelOrder = async ( event ) => 
  {
    //await clearCart( null, () => {} );
    Router.push('/checkout/order-pay?orderid='+checkoutOrderData?.id+'&key='+checkoutOrderData?.order_key+'&status=CANCELLED');
  } 
  return (
    <div className="App">
        <span onClick={cancelOrder}>Cancel Order</span>
    </div>
  );
}

export default CancelOrderButton;
