import { useState } from "react";
import { get_points } from "../../utils/customjs/custome";


const RedeemPoints = ({customerData,setCoutData,totalPrice,coutData,redeem_your_pointsText,setRedeem_your_pointsText,messageRyp,setMessageRyp}) => {
	
    

    var rewardPoints = get_points(customerData);
    
    if(rewardPoints < 1)
    {
        return '';
    }
    const applyRedeemYourPoints = async()=>{
        let response = {
            success: false,
            error: '',
        };
        if(redeem_your_pointsText == '')
		{
			response.error = "Please enter ponints";
			setMessageRyp(response);
			return ;
		}
        if(rewardPoints < 100)
		{
			response.error = "You must have at least 100 points in your to apply rewards";
			setMessageRyp(response);
			return ;
		}
        var redeemPrice = parseInt(redeem_your_pointsText)/100;
        if(parseInt(redeem_your_pointsText) > rewardPoints || parseInt(redeem_your_pointsText) < 1)
		{
            response.error = "Please enter valid point.";
			setMessageRyp(response);
			return ;
		}
        if( redeemPrice > (totalPrice))
		{
            response.error = "You can`t Redeem more Points than order subtotal, Please enter Right Value.";
			setMessageRyp(response);
			return ;
		}
        response.error = "";
        response.success = true;
		setMessageRyp(response);
        setCoutData( {
            ...coutData,
            "redeemPrice":redeemPrice}
            );
        console.log('redeem_your_pointsText',redeem_your_pointsText);
        console.log('redeemPrice',redeemPrice);
		return ;
    }
    const handleRedeemYourPoints = async(e)=>{
        if(e.target.value != '')
        {
			setRedeem_your_pointsText(parseInt(e.target.value));
        }else{
            setRedeem_your_pointsText(e.target.value);
        }
    }
    if (typeof window !== "undefined") {
		const input_redeem_your_points = document.getElementById('redeem_your_points');
		if(input_redeem_your_points)
		{
			document.getElementById('redeem_your_points').addEventListener('keydown', function(event) {
				// Allow numeric keys, backspace, and arrow keys
				if ((event.keyCode >= 48 && event.keyCode <= 57) || // 0-9
					(event.keyCode >= 96 && event.keyCode <= 105) || // Numeric keypad
					event.keyCode === 8 || // Backspace
					(event.keyCode >= 37 && event.keyCode <= 40) // Arrow keys
					) {
				  // Allow the keypress
				} else {
				  // Prevent the keypress
				  event.preventDefault();
				}
			  });
		}
	  }
	return (
		<>
        <div key="redeem_your_points">
			<h5 htmlFor="redeem_your_points" className="">Redeem Your Points ({rewardPoints}):</h5> 
			 Message : {messageRyp.error} {messageRyp.success?<>APPLIED</>:null}<br></br>
			 <br></br>
        	<input type='number' name="redeem_your_points" id="redeem_your_points" onChange={handleRedeemYourPoints} value={redeem_your_pointsText} className=" border border-sky-500"></input>
        	<button onClick={applyRedeemYourPoints}>Submit</button>
		</div>
        </>
	);
};

export default RedeemPoints;
