import { isEmpty } from 'lodash';
import Link from 'next/link';
import React from 'react'
import { trackLinkList } from '../../utils/my-account/tracklinklist-order';

function buttonOrderTracking({options,meta_data}) {
    
    var buttonsList = [];
    buttonsList = trackLinkList(options,meta_data);
    //console.log('buttonsList',buttonsList);
    if(isEmpty(buttonsList))
    {return ''}
    if(buttonsList.length > 0)
    {
        return (
            <><table  className="border-collapse border border-slate-500 ..." width='100%'>
                {buttonsList.map(function(item){
                    return(
                        <>
                        <tr className='bg-gray-300'>
                        <td className="border border-slate-700">
                        {item.tracking_number}
                        </td>
                        <td className="border border-slate-700 ">
                            <Link href={item.url} className={'bg-purple-600 text-white px-3 py-1 m-px rounded-sm w-auto '} target="_blank" title={item.carrier_company} alt={item.carrier_company}>
                            Track 
                            </Link>
                        </td>
                        </tr>
                        
                        </>
                    );
                })}
                </table>
            </>
        )
    }
        
   
}

export default buttonOrderTracking
