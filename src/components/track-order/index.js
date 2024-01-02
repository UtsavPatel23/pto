import React from 'react'

const TrackOrder = ({orderTrack,trckorderid}) => {
    //console.log('orderTrack',orderTrack);
    return (
            <div className="entry-content container">
             <div className="woocommerce">
                <p className='order-info'>
                    Order #<mark className="order-number">{trckorderid}</mark> was placed on <mark className="order-date">{orderTrack.result.created_paid}</mark> and is currently <mark className="order-status">{ orderTrack.result.order_status }</mark>.
                </p>
                <section className='woocommerce-order-details'>
                    <h2 className='woocommerce-order-details__title'>Order Details</h2>
                        <div className='mb-5 table-responsive'>
                            <table className='table table-bordered 	align-middle'>
                                <tr>
                                <th> No </th>
                                <th> Product </th>
                                <th> Status </th>
                                <th> Carrier </th>
                                <th> Tracking Number </th>
                                <th> Track </th>
                                </tr> 
                                <tr>
                                <td>{trckorderid}</td>
                                    <td>
                                    {
                                        orderTrack.result.products ? orderTrack.result.products.map((items, i) => {
                                            return (
                                                <p>({i+1}) - {items?.product_name}</p>
                                            );
                                        }): null
                                    } 
                                    </td>
                                    <td>{orderTrack.result.order_status}</td>
                                    <td colspan="3">
                                        <table>
                                        {
                                            orderTrack.result.tracking?orderTrack.result.tracking.map((tracks, t) => {
                                                return (
                                                <tr>
                                                    <td>{tracks.carrier_company}</td>
                                                    <td>{tracks.tracking_no}</td>
                                                    <td dangerouslySetInnerHTML={ {__html: tracks.link,} }></td>
                                                </tr>
                                                );
                                            }):null
                                        }
                                        </table>
                                    </td>
                                </tr>  
                            </table>  
                         </div>
                        <div className='mb-5 table-responsive'>
                            <table className='table table-bordered 	align-middle'>
                                <tr>
                                    <th>Product</th>            
                                    <th>Total</th>            
                                </tr>            
                                    {
                                        orderTrack.result.products.length?orderTrack.result.products.map((items, i) => {
                                        return (
                                            <tr>
                                                    <td>{items.product_name}</td>
                                                    <td>{items.subtotal}</td>
                                            </tr>    
                                        );
                                        }):null
                                    }
                                     <tr><td>Subtotal:</td> <td>{ orderTrack.result.subtotal }</td></tr>
                                     <tr><td>Shipping:</td> <td>{ orderTrack.result.shipping_method }</td></tr>
                                     <tr><td>Shipping Cost:</td> <td>{ orderTrack.result.fees }</td></tr>
                                     <tr><td>Payment method:</td> <td>{orderTrack.result.payment_title }</td></tr>
                                     <tr><td>Total:</td> <td>{orderTrack.result.order_total }</td></tr>
                            
                            </table>
                        </div>            
                    </section>
                    
             </div>
        </div>
       
    )
}

export default TrackOrder