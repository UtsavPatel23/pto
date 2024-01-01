import Link from 'next/link';
import React from 'react'

function buttonOrderTracking({options,meta_data}) {
    
    const order_tracking =  meta_data.find(({ key }) => key === "order_tracking");
    const {tracking_details} = options;
    if(!order_tracking){return null;}
    
    if(order_tracking?.value > 0)
    {
        var buttonsList = [];
        for (let i = 0; i < order_tracking?.value; i++) {
            var carrier = '';
            var tracking_number = '';
            var url = '';
            carrier =  meta_data.find(({ key }) => key === "order_tracking_"+i+"_carrier");
            tracking_number =  meta_data.find(({ key }) => key === "order_tracking_"+i+"_tracking_number");
            if(carrier != '')
            {
            const tracking_detail = tracking_details.find(({ carrier_company }) => carrier_company == carrier?.value);
            //console.log('tracking_detail',tracking_detail);
            url = tracking_detail?.carrier_company_url;
            if(carrier?.value == 'Toll IPEC' || carrier?.value == 'Toll Priority')
            {
                url = tracking_number?.value+'&op=Search';
            }else if(carrier?.value == 'Allied Express' || carrier?.value == 'Hunter Express' || carrier?.value == 'STEADFAST')
            {}
            else
            {
                url = tracking_number?.value;
            }
            if(url != '')
            {
                buttonsList[i] = {'url':url,'tracking_number':tracking_number?.value,carrier_company:carrier?.value};
            }
            }
        }
    //console.log('buttonsList',buttonsList);
    if(buttonsList.length > 0)
    {
        return (
            <div key={"order_tracking_button"+order_tracking?.value}>
                {buttonsList.map(function(item){
                    return(
                        <div key={item.tracking_number}>
                        <Link href={item.url} className={'bg-purple-600 text-white px-3 py-1 m-px rounded-sm w-auto '} target="_blank" title={item.carrier_company} alt={item.carrier_company}>
                            {item.tracking_number}
                        </Link>
                        </div>
                    );
                })}
            </div>
        )
    }
        
    }
}

export default buttonOrderTracking
