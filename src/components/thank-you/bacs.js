import React from 'react'

function bacs({paymentModes}) {
    paymentModes = paymentModes.filter(obj => 
		{
		if (obj.method_key == 'bacs') {
			return true;
		}
	});
    return (
        <div>
            {
                paymentModes[0]?.account_details.length ?
                paymentModes[0]?.account_details.map(function (ac) {
					return (
						<>
                        <h4>Our {ac.bank_name} Details</h4>
                            <ul>
                                <li> Account Name   : <strong> {ac.account_name} </strong></li>
                                <li> BSB : <strong> {ac.bsb} </strong></li>
                                <li> Account number : <strong> {ac.account_number} </strong></li>
                            </ul>
                        </>
					)	
				}) : null
            }
        </div>
    )
}

export default bacs
