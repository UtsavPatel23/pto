import React from "react";
import Router from 'next/router';

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
    Router.push('/checkout/order-pay?orderid='+checkoutOrderData?.id+'&key='+checkoutOrderData?.order_key+'&status=CANCELLED');
  } 
  return (
    <div className="App">
        <span onClick={cancelOrder}>Change payment method</span>
    </div>
  );
}

export default CancelOrderButton;
