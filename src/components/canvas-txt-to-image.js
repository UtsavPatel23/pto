// App.jsx
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { isEmpty } from 'lodash';


function canvasTxtToImage({authorname}) {

     const [authImage,setAuthImage] = useState('https://secure.gravatar.com/avatar/?s=24&d=mm&r=g');
    useEffect(() => {
		if (typeof window !== "undefined") {
            const canvas = document.getElementById("textCanvas");
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "#ccd1d4";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = "50px serif";
            ctx.fillStyle = "#4e4a88";
            var parts =  authorname.toUpperCase().split(" ");
            console.log('parts',parts);
            if(parts.length>1 && (!isEmpty(parts[1][0])))
            {
                ctx.fillText(parts[0][0] +parts[1][0], 3, 41, 45);
                //ctx.fillText(parts[0][0] +parts[1][0], 18, 65, 65); // 100 
                //ctx.fillText(parts[0][0] +parts[1][0], 6, 51, 65); // 75
            }else{
                ctx.fillText(parts[0][0], 9, 40, 33);
                //ctx.fillText(parts[0][0], 33, 65, 65); //100
                //ctx.fillText(parts[0][0], 22, 48, 45); // 75
            }
            
            var src = ctx.canvas.toDataURL();
            setAuthImage(src);
        }
	}, []);
  return (
    <div>
        <canvas id='textCanvas' height={50} width={50} className='hidden'></canvas>
        <Image
			src={authImage}
			alt={authorname}
			title={authorname}
			width="50"
			height="50"
            className='rounded-2xl'
		/>
    </div>
  );
}

export default canvasTxtToImage;