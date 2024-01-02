export const trackLinkList = (options,meta_data) => {
    const order_tracking =  meta_data.find(({ key }) => key === "order_tracking");
    const {tracking_details} = options;
    if(!order_tracking){return null;}
    
    var buttonsList = [];
    if(order_tracking?.value > 0)
    {
        for (let i = 0; i < order_tracking?.value; i++) {
            var carrier = '';
            var tracking_number = '';
            var url = '';
            carrier =  meta_data.find(({ key }) => key === "order_tracking_"+i+"_carrier");
            tracking_number =  meta_data.find(({ key }) => key === "order_tracking_"+i+"_tracking_number");
            if(carrier != '')
            {
            const tracking_detail = tracking_details.find(({ carrier_company }) => carrier_company == carrier?.value);
            console.log('tracking_detail',tracking_detail);
            url = tracking_detail?.carrier_company_url;
            if(carrier?.value == 'Toll IPEC' || carrier?.value == 'Toll Priority')
            {
                url = url+tracking_number?.value+'&op=Search';
            }else if(carrier?.value == 'Allied Express' || carrier?.value == 'Hunter Express' || carrier?.value == 'STEADFAST')
            {}
            else
            {
                url = url+tracking_number?.value;
            }
            if(url != '')
            {
                buttonsList[i] = {'url':url,'tracking_number':tracking_number?.value,carrier_company:carrier?.value};
            }
            }
        }
    }
    return buttonsList;
}