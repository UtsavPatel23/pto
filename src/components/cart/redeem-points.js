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
        var redeemPrice = parseInt(redeem_your_pointsText)/100;
        if(parseInt(redeem_your_pointsText) > rewardPoints || ( redeemPrice > (totalPrice)))
		{
            response.error = "Please enter valid ponints";
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
