
const Shipping_guide_tab = () => {
return(<>
               <div className="container p-0">
        <div className="row">
            <div className="col-md-12">
                <p>We ship our products from different warehouses across Australia to ensure we have a wide selection and can provide efficient delivery. When you order multiple items, they may come from different warehouses and be delivered by different couriers. If that's the case, we'll provide you with multiple tracking numbers.</p>
                <p>Orders are dispatched from Monday to Friday, and in some locations, parcels are prepared on the weekend to speed up the process. Once your order is updated in our system by the warehouse team, you'll receive an automated email with the tracking details.</p>
                <h3 className="top-title mt-3">Here are the estimated delivery time frames:</h3>
                <h4 className="sm-title">Off-season:</h4>
                <ul className="liarrow">
                    <li>For customers in Victoria, it usually takes about 3-8 working days.</li>
                    <li>For customers in NSW, SA, ACT, and QLD, it usually takes about 4-10 working days.</li>
                    <li>For customers in WA, NT, and TAS, it usually takes about 6-14 working days.</li>
                </ul>
                <h4 className="sm-title">Peak season:</h4>
                <ul className="liarrow">
                    <li>For customers in Victoria, it usually takes about 6-13 working days.</li>
                    <li>For customers in NSW, SA, ACT, and QLD, it usually takes about 8-15 working days.</li>
                    <li>For customers in WA, NT, and TAS, it usually takes about 9-19 working days. </li>
                </ul>
                <p>Please note that unexpected conditions or busy courier routes may cause additional delays.</p>
                <p><b>Carries :</b></p>
                <p>We have multiple preferred service partners depending on the size and weight of your order and its delivery address.</p>
                <p><b>These include:</b></p>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Carrier</th>
                                <th scope="col">Website</th>
                                <th scope="col">Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Australia Post</th>
                                <td><a href="https://auspost.com.au" className="alink-color" target="_blank">https://auspost.com.au/</a></td>
                                <td>13 76 78</td>
                            </tr>
                            <tr>
                                <th scope="row">Fastway</th>
                                <td><a href="https://www.fastway.com.au/" className="alink-color" target="_blank">https://www.fastway.com.au/</a></td>
                                <td>1300 327 892</td>
                            </tr>
                            <tr>
                                <th scope="row">Allied Express</th>
                                <td><a href="http://www.alliedexpress.com.au/" className="alink-color" target="_blank">http://www.alliedexpress.com.au/</a></td>
                                <td>13 13 73</td>
                            </tr>
                            <tr>
                                <th scope="row">Hunter Express</th>
                                <td><a href="https://www.hunterexpress.com.au/" className="alink-color" target="_blank">https://www.hunterexpress.com.au/</a></td>
                                <td>13 22 52</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <b>Delivery Day/Time:</b>
                <p>We are unable to provide an exact day and time for your order's arrival as it depends on the courier's transit times and trucking schedules.</p>
                <b>Tracking Number:</b>
                <p>You will receive the tracking details for your order within 24 hours of it leaving our warehouse. You can track your order on the carrier's website.</p>
                <b>Expected Delivery Time:</b>
                <p>The estimated delivery time provided by each courier is only for reference. Delivery may take longer than expected due to various reasons. If you haven't received your item within 10 business days, please contact our customer service team.</p>
                <b>Note for the Courier:</b>
                <p>During the checkout process, you can leave a note which will be included in the delivery instructions for your order. Please note that after your order is dispatched from our warehouse, you'll need to call the courier directly using the provided numbers to add any notes to your order.</p>
                <b>Call Before Delivery:</b>
                <p>Some of the couriers we use are contractors and may not have the ability to call you on the day of delivery. It's recommended to leave a note during checkout or have your item shipped to your work address where someone will be available to sign for it.</p>
                <b>If No One Is Home to Receive:</b>
                <p>If there is a secure and dry place to leave your order and no one is home, the driver may leave your item(s) there. If there is no safe place, they will leave a calling card, and you can arrange a re-delivery date by calling them.</p>
                <b>Parcel Return and Redelivery:</b>
                <p>In the unlikely event that your parcel is returned to us due to an inaccurate address or rejection by the receiver, our customer service representative will contact you via email. Please note that a re-delivery cost may apply for products returned to us due to incomplete addresses.</p>
                <b>Delivery Restrictions:</b>
                <p>Most items on  Pool Table Offers can be shipped to most areas of Australia. However, there are some restrictions with bulky items, and we are unable to ship them to certain postcodes. Please refer to the list of undeliverable postcodes for bulky items. Please note that there might be some postcodes not listed below.</p>
                <h4 className="sm-title">Undeliverable Postcodes for Bulky Items:</h4>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">State</th>
                                <th scope="col">Postcode</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">NT</th>
                                <td>0800-0999</td>
                            </tr>
                            <tr>
                                <th scope="row">NSW</th>
                                <td>2641,2717, 2831, 2898, 2899</td>
                            </tr>
                            <tr>
                                <th scope="row">QLD</th>
                                <td>4184, 4421,4450-4499, 4680, 4700-4999, 9920-9999</td>
                            </tr>
                            <tr>
                                <th scope="row">SA</th>
                                <td>5701, 5121</td>
                            </tr>
                            <tr>
                                <th scope="row">WA</th>
                                <td>6055, 6215-6799</td>
                            </tr>
                            <tr>
                                <th scope="row">TAS</th>
                                <td>7151</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p><b>Important Note:</b> If your postcode is listed above as undeliverable, please contact us. We may be able to arrange an alternate courier for your order, but please note that there may be an additional delivery fee involved.</p>
                <p><b>Pick-up Option:</b> Unfortunately, we do not offer a pick-up option or allow customers to arrange their own courier for our warehouses. This helps us ensure that our distribution centers can dispatch all goods efficiently.</p>
                <p><b>For More Information:</b> If you have any further questions or need assistance, please email us at <a href="mailto:sales@pooltableoffers.com.au" className="alink-color">sales@pooltableoffers.com.au</a>. Our dedicated customer service representatives will be happy to assist you.</p>
                <h3 className="top-title mt-3">Delivery Issues</h3>
                <h4 className="sm-title">Transit Issue/No Tracking Update</h4>
                <p>Once your package is dispatched from our warehouse, we provide you with a tracking number. The tracking number will become active and show the package's movements only when it is scanned by the courier company at the depot or parcel facility. If you notice that there are no updates in the tracking information after 48 hours, please contact us immediately. We will reach out to the courier company and work on resolving the issue to ensure your satisfaction as our valued customer.</p>
                <h4 className="sm-title">Returned to Sender (RTS)</h4>
                <p>If a product is returned to us (RTS), it may be due to the following reasons:</p>
                <b>Invalid Address:</b>
                <p>Please ensure that the address you provide is accurate.  Pool Table Offers is not responsible for address validation. If a product is returned due to an invalid address, a re-delivery cost will apply. If you prefer a refund, a one-way shipping cost and a 15% restocking fee will be deducted.</p>
                <b>Delivery Rejected by Receiver:</b>
                <p>If the receiver rejects the item, it is considered a change of mind. In such cases, shipping and restocking fees will be deducted. Please note that gift purchases are treated the same as regular orders.</p>
                <b>Unsuccessful Delivery:</b>
                <p>By default, packages are dispatched with the "Authorised to Leave (ATL)" status. However, this may not be applicable to every product or if the courier delivery driver cannot find a safe place to leave the package. In such situations, the package will be taken back to the post office, depot, or a parcel collection center of the courier company. The delivery driver will leave a calling card in your mailbox. It is your responsibility to monitor the package's tracking and promptly contact the courier company if you miss the delivery. A re-delivery cost will apply.</p>
                <p>If you have any further questions or need assistance, please contact us. We are here to help ensure a smooth delivery experience for you.</p>
            </div>
        </div>
    </div>
                
</>);
}
export default Shipping_guide_tab;