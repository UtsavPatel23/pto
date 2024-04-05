import React from 'react'
import { useState } from 'react';
import Loader from "./../../public/loader.gif";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import TrackOrder from '../../src/components/track-order';
import { GETORDERID, HEADER_FOOTER_ENDPOINT } from '../../src/utils/constants/endpoints';
import Layout from '../../src/components/layout';
import OrderDetails from '../../src/components/thank-you/order-details';
import { get_date_formate } from '../../src/utils/customjs/custome';
import Link from 'next/link';
import { trackLinkList } from '../../src/utils/my-account/tracklinklist-order';
import { useEffect } from 'react';
import { isEmpty } from 'lodash';
import { get_order } from '../../src/utils/apiFun/order';
import Loaderspin from "../../src/components/loaderspin";


function trackOrder({ headerFooter }) {

    const createMarkup = (data) => ({
        __html: data
    });
    const { options } = headerFooter?.footer;
    var paymentModes = headerFooter?.footer?.options?.nj_payment_method ?? '';
    const [orderTrack, setOrderTrack] = useState('');
    const [orderData, setOrderData] = useState({});
    const [subtotal, setSubtotal] = useState(0);
    const [datedis, setDatedis] = useState('');
    const [buttonsList, setButtonsList] = useState([]);
    const [trackFields, setTrackFields] = useState({
        orderid: '',
        order_email: '',
        loading: false,
        success: false,
        error: ''
    });
    // form validation rules 
    const validationSchemaLogin = Yup.object().shape({
        orderid: Yup.string()
            .required('Orderid is required'),
        order_email: Yup.string()
            .required('Order email  is required'),
    });
    const formOptionsLogin = { resolver: yupResolver(validationSchemaLogin) };
    // get functions to build form with useForm() hook
    const action_Data = useForm(formOptionsLogin);
    const track_action = action_Data.register;
    const handleSubmit_l = action_Data.handleSubmit;
    const reset_l = action_Data.reset;
    const formState_l = action_Data.formState;
    const errorsTrack = formState_l.errors;

    //const { errorsTrack } = formState_l;
    // user login 
    const onFormSubmitLogin = async (event) => {
        var orderid = '';
        const trackData = {
            orderno: event.orderid,
            order_email: event.order_email,
        };
        setTrackFields({ ...trackFields, loading: true, orderid: event.orderid });
        await axios.post(GETORDERID, trackData)
            .then(res => {
                //console.log('data',res.data);
                if ('101' === res.data.code) {
                    setTrackFields({
                        ...trackFields,
                        error: res.data.msg,
                        loading: false
                    }
                    );
                } else {
                    orderid = res.data?.orderid;
                    //console.log('orderid',orderid);
                }

            })
            .catch(err => {
                console.log('err', err);
                setTrackFields({ ...trackFields, error: err?.response?.data?.message, loading: false });
            })
        if (orderid != '') {
            const response = await get_order(orderid);
            if (response.success) {
                var tmpsubtotal = 0;
                setOrderData(response.data.orderData);
                if (response.data.orderData?.billing?.email != event.order_email) {
                    setTrackFields({
                        ...trackFields,
                        error: 'Something Went to Wrong.',
                        loading: false
                    }
                    );
                    return '';
                }
                if (response.data.orderData.line_items != undefined) {
                    response.data.orderData?.line_items.map((item) => {
                        tmpsubtotal = tmpsubtotal + parseFloat(item.subtotal);
                    })
                }
                setSubtotal(tmpsubtotal);
                setDatedis(get_date_formate(response.data.orderData?.date_created));
                reset_l();
                setTrackFields({
                    ...trackFields,
                    error: '',
                    loading: false,
                    success: true
                }
                );
            } else {
                setTrackFields({
                    ...trackFields,
                    error: 'Something Went to Wrong.',
                    loading: false
                }
                );
            }
            return '';

        }
    };

    const { error, loading } = trackFields;
    useEffect(() => {
        if (orderData?.status) {
            setButtonsList(trackLinkList(options, orderData?.meta_data));
        }
    }, [orderData]);

    /*useEffect(() => {
        (async () => {
            const response = await get_order(586603);
            setOrderData(response.data.orderData);
            setTrackFields({
                ...trackFields,
                error: '',
                loading: false,
                success: true
            })
        })();
    }, [])*/
    //console.log('trackFields',trackFields);
    //console.log('orderData',orderData);
    //console.log('subtotal',subtotal);
    //console.log('subtotal',subtotal);
    //console.log('buttonsList',buttonsList);



    return (
        <Layout headerFooter={headerFooter || {}} >
            <React.Fragment>
                <div className="max-w-2xl mx-auto border border-gray-200 p-3 rounded">
                    <h4 className="mb-4 text-center text-2xl font-jost font-semibold">Track Order</h4>
                    {error && <div className="text-red-600" dangerouslySetInnerHTML={createMarkup(error)} />}
                    {
                        orderData?.status && trackFields?.success ?
                            <>
                                <p>Order #{orderData?.number} was placed on {datedis} and is currently {orderData?.status.replaceAll('-', ' ')}.</p>
                                {!isEmpty(buttonsList) ?
                                    <>
                                        <h5>Track details</h5>
                                        <div className="relative overflow-x-auto my-5">
                                            <table className="border-collapse w-full border border-slate-300">
                                                <thead>
                                                    <tr>
                                                        <th className="border border-slate-300 p-2 text-left">Carrier </th>
                                                        <th className="border border-slate-300 p-2 text-left">Tracking Number </th>
                                                        <th className="border border-slate-300 p-2 text-left">Track  </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {buttonsList.map(function (item) {
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td className='border border-slate-300 p-2'>{item.carrier_company}</td>
                                                                    <td className='border border-slate-300 p-2'>{item.tracking_number}</td>
                                                                    <td className='border border-slate-300 p-2'>
                                                                        <Link href={item.url} className='underline underline-offset-4 text-victoria-700 hover:bg-violet-700 hover:text-white' target="_blank" title={item.carrier_company} alt={item.carrier_company}>
                                                                            Track
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                            </>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                    : <p>Tracking information not available.</p>}
                                <OrderDetails orderData={orderData} subtotal={subtotal} paymentModes={paymentModes} />
                                <div className='flex gap-2 justify-center'>
                                    <Link href={'/'} className='border border-victoria-600 bg-victoria-700 text-white py-2 px-3 hover:bg-transparent hover:text-victoria-700'> Back to Home </Link>
                                    <button
                                        className='border border-victoria-600 bg-victoria-700 text-white py-2 px-3 hover:bg-transparent hover:text-victoria-700'
                                        onClick={() => {
                                            setOrderData({});
                                            setTrackFields({
                                                ...trackFields,
                                                error: '',
                                                success: false
                                            }
                                            );
                                        }}> Continue Track Order
                                    </button>
                                </div>
                            </>
                            :
                            <div key="track_form">
                                <p className='mb-5'>To track your order please enter your Order ID in the box below and press the "Track" button. This was given to you on your receipt and in the confirmation email you should have received.</p>
                                <form onSubmit={handleSubmit_l(onFormSubmitLogin)}>
                                    <label className="block mb-4">
                                        <span className='block text-base mb-1'>Order ID: </span>
                                        <input name="orderid" type="text" {...track_action('orderid')} className='outline-none block w-full py-2 px-3 text-base  border border-gray-300 focus:border-victoria-400' />
                                        <div className="d-block text-red-500">{errorsTrack.orderid?.message}</div>
                                    </label>
                                    <label className="block mb-4">
                                        <span className='block text-base mb-1'>Billing email: </span>
                                        <input name="order_email" type="text" {...track_action('order_email')} className='outline-none block w-full py-2 px-3 text-base  border border-gray-300 focus:border-victoria-400' />
                                        <div className="d-block text-red-500">{errorsTrack.order_email?.message}</div>
                                    </label>
                                    <div className='text-center mt-5 mb-2'>
                                        <button type="submit" className={`bg-victoria-800 inline-block px-1 py-3 text-white text-center w-60 text-lg cursor-pointer`}>
                                            {loading ? <Loaderspin /> : 'Track'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                    }
                </div>
            </React.Fragment>
        </Layout>
    )
}

export default trackOrder

export async function getStaticProps() {

    const { data: headerFooterData } = await axios.get(HEADER_FOOTER_ENDPOINT);
    return {
        props: {
            headerFooter: headerFooterData?.data ?? {},
        },

        /**
         * Revalidate means that if a new request comes to server, then every 1 sec it will check
         * if the data is changed, if it is changed then it will update the
         * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
         */

    };
}