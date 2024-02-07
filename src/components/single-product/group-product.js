import { isEmpty } from 'lodash';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { WEB_DEVICE } from '../../utils/constants/endpoints';
import Image from '../image';
import InputQtyGroup from './input-qty-group';
import GroupAddToCart from '../cart/group-add-to-cart';
import GroupBuyNow from '../cart/group-buy-now';
import { getMemberOnlyProduct, get_discount_price } from '../../utils/customjs/custome';
function group_product({options, product ,bundle_discount}) {
    var vewBtnGroupProduct = true;
    const { grouped_products  } = product;
    const [coutData, setCoutData] = useState('');
    var messageText  = options?.nj_display_single_product_member_only ?? '';
    console.log('Group product', product)
    console.log('grouped_products', grouped_products)
    console.log('coutData', coutData)
    if (isEmpty(grouped_products) || grouped_products == '') { 
        return '';
    }
    //hook useEffect variable data set
    useEffect(() => {
        if(localStorage.getItem('coutData')) {
			setCoutData(JSON.parse(localStorage.getItem('coutData')));
		}
    }, []);
    //hook useEffect Checkout data set in localStorage
    useEffect(() => {
        localStorage.setItem('coutData',JSON.stringify(coutData));
    }, [coutData]);
    return (
        <>
            <form id='formqtygp'>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <tbody>
            {
                    grouped_products.map(product => {
                        const img = product?.images?.[0] ?? {};
                        var p_slug = '/p/' + product?.slug;
                        var p_price = '';
                        
					    var membersonly = getMemberOnlyProduct(options,product,messageText);
                        if (bundle_discount > 0)
                        {
                            p_price = get_discount_price(product);
                            p_price = (p_price - ((p_price * bundle_discount) / 100));
                            p_price = parseFloat(p_price).toFixed(2);
                        }
                            
                        if(!WEB_DEVICE)
                            {
                                p_slug = '/product/?sname='+product?.slug;
                            }
                        return (
                            <tr>
                                <td>
                                    <Image
                                        sourceUrl={ img?.src ?? '' }
                                        altText={ img?.alt ?? ''}
                                        title={ product?.name ?? '' }
                                        width="100"
                                        height="100"
                                    />
                                </td>
                                <td>
                                    <h6>
                                    <Link href={ `${ p_slug }`} legacyBehavior>
                                            <a>{ product.name}</a>
                                    </Link>
                                    </h6>
                                    <div key="product_info1"
                                        dangerouslySetInnerHTML={ {
                                            __html: product?.price_html ? product?.price_html : '$'+product?.price ,
                                        } }
                                        className="product-price mb-5"
                                    /> 
                                {product?.meta_data?.product_discount > 0?<div  key="product_info2">Extra Discount{product.meta_data.product_discount}%Off</div>:null}
                                    
                                {(() => {
                                    if (product.price > 0) 
                                    {
                                        var offpride = Math.round(((product.regular_price-product.price)*100)/product.regular_price);
                                        if(offpride > 0){
                                            return (
                                                    <div key="product_info3">
                                                        {offpride}%Off
                                                    </div>
                                            )
                                        }
                                            
                                    } 
                                })()} 
                                    { p_price != ''?<>
                                    <div key='BundlePrice'>
                                    Bundle Price {p_price}
                                        </div>
                                    </> : null}
                                    {(() =>{
                                    // Member only
                                    if(membersonly != '')
                                    {
                                    return(
                                            <div key="membersonly"
                                                dangerouslySetInnerHTML={ {
                                                    __html: membersonly ?? '',
                                                } }
                                                className="membersonly"
                                            />
                                        );
                                    }
                                })()}
                                    <div key="product_info4">
                                    {(() => {
                                            if (product.stock_quantity < 1) {
                                                vewBtnGroupProduct = false;
                                            return (
                                                <div>Sold Out!</div>
                                            )
                                        } else {
                                            return (
                                                <div>In stock</div>
                                            )
                                        }
                                    })()} 
                                    </div>
                                    <InputQtyGroup product={ product }/>
                                </td>
                            </tr>
									
								)
						})
			}
           
        </tbody>
        </table>
            </form>
            {vewBtnGroupProduct?<>
                <GroupAddToCart coutData={coutData} setCoutData={setCoutData} group_product_id={ product?.id}></GroupAddToCart>
                <GroupBuyNow coutData={coutData} setCoutData={ setCoutData} group_product_id={ product?.id}></GroupBuyNow>
            </>:null}
        </>
    );
}

export default group_product
