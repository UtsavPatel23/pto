import { isEmpty } from 'lodash';
import Link from 'next/link';
import React from 'react'
import { trackLinkList } from '../../utils/my-account/tracklinklist-order';

function buttonOrderTracking({ options, meta_data }) {

    var buttonsList = [];
    buttonsList = trackLinkList(options, meta_data);
    //console.log('buttonsList',buttonsList);
    if (isEmpty(buttonsList)) { return '' }
    if (buttonsList.length > 0) {
        return (
            <>
                <table className='border-collapse w-full border border-slate-300'>
                    {buttonsList.map(function (item) {
                        return (
                            <>
                                <tr>
                                    <td className="border border-slate-300 p-2">
                                        {item.tracking_number}
                                    </td>
                                    <td className="border border-slate-300 p-2 ">
                                        <Link href={item.url}
                                            className='underline underline-offset-4 text-victoria-700 hover:bg-violet-700 hover:text-white'
                                            target="_blank"
                                            title={item.carrier_company}
                                            alt={item.carrier_company}
                                        >
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
