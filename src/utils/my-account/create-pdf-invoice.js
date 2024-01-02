import React from 'react'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { capitalizeFirstLetter, get_date_formate, get_stateFullName_by_short_name } from '../customjs/custome';
import { useState } from 'react';

export const create_invoice_pdf = async (userOrder,header,states,paymentModes) => {
        
        const {siteLogoUrl,siteTitle} = header;
        const {billing,shipping} = userOrder;
        const stateName =  get_stateFullName_by_short_name(shipping?.state,states);
        console.log('userOrder',userOrder)
        console.log('stateName',stateName)
        //return '';
        paymentModes = paymentModes.filter(obj => 
          {
          if (obj.method_key == userOrder?.payment_method) {
            return true;
          }
        });

        // Create a new PDFDocument
        const pdfDoc = await PDFDocument.create()

        var heightValue = 65;
        var borderWidth = 50;
        // Add a new page to the document
        //const page = pdfDoc.addPage([600, 400]);
        const page = pdfDoc.addPage();

        

        // Draw a rectangle for the header
        page.drawRectangle({
          x: borderWidth,
          y: page.getHeight() - 105,
          width: page.getWidth() - 100,
          height: 60,
          //color: rgb(0.2, 0.2, 0.8),
          borderColor: rgb(0, 0, 0),
        });

        // Add text to the header
        heightValue = heightValue + 15;
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
        const font = helveticaFont;
        const headerTextSize = 18;
        page.drawText('INVOICE', { x: 60, y: page.getHeight() - heightValue, font, size: headerTextSize, color: rgb(0, 0, 0) });
        
        
        // Logo
        const emblemUrl = siteLogoUrl;
        const pngImageBytes = await fetch(emblemUrl)
        .then(res => res.arrayBuffer())
        .catch( err => {
          console.log('err ',err);
        } )
        if(pngImageBytes)
        {
          // Embed the JPG image bytes and PNG image bytes
          const pngImage = await pdfDoc.embedPng(pngImageBytes)
          // Get the width/height of the PNG image scaled down to 50% of its original size
          const pngDims = pngImage.scale(0.5)
          // Draw the PNG image near the lower right corner of the JPG image
          page.drawImage(pngImage, {
            x: 390,
            y: page.getHeight() - (heightValue + 20) ,
            width: pngDims.width,
            height: pngDims.height,
          })
        }else{
        page.drawText(siteTitle, { x: 390, y: page.getHeight() - (heightValue), font, size: headerTextSize, color: rgb(0, 0, 0) });
        }
        

        // address and info
        heightValue = heightValue + 40;
        var leftBox = 0
        const userDetails = [
          { name: shipping?.first_name + ' ' + shipping?.first_name },
          { name: shipping?.address_1 },
          { name: shipping?.address_2 },
          { name: shipping?.company },
          { name: shipping?.city },
          { name: stateName  + ', Australia, '+shipping?.postcode},
          { name: billing?.email},
          { name: shipping?.phone },
        ];
        userDetails.forEach((userDetail, index) => {
            if(userDetail.name != '' && userDetail.name != undefined)
            {
                leftBox = leftBox + 15;
                page.drawText(userDetail.name, { x: 60, y: page.getHeight() - (heightValue + leftBox), font, size: 12,}); 
            }
        });
        
        var rightBox = 0
        var payment_status = capitalizeFirstLetter(userOrder?.status.replaceAll('-', ' '));
        const rightDetails = [
          { key: 'Invoice Date :' ,value: get_date_formate(userOrder?.date_modified)},
          { key: 'Order Number :' ,value:userOrder?.number},
          { key: 'Order Date :' ,value:get_date_formate(userOrder?.date_created)},
          { key: 'Payment Method :' ,value:paymentModes[0]?.method_title},
          { key: 'Payment Status :' ,value:payment_status},
        ];
        rightDetails.forEach((rightDetail, index) => {
          rightBox = rightBox + 15;
          page.drawText(rightDetail.key, { x: 320, y: page.getHeight() - (heightValue + rightBox), font, size: 12,});
          page.drawText(rightDetail.value, { x: 420, y: page.getHeight() - (heightValue + rightBox), font, size: 12,});
        });

        

        // Add item details
        if(leftBox < rightBox)
        {
          heightValue = heightValue + rightBox + 20;
        }else{
          heightValue = heightValue + leftBox + 20;
        }
        
        const itemTextSize = 14;
        const itemSpacing = 20;
        const nameColx = 60;
        const quantityColx = 400;
        const priceColx = 430;

        // Draw a rectangle for the title
        page.drawRectangle({
          x: borderWidth,
          y: page.getHeight() - (heightValue+25),
          width: page.getWidth() - 100,
          height: 30,
          color: rgb(0, 0, 0),
        });

        // Title
        heightValue = heightValue + (itemSpacing);
          const itemY = page.getHeight() - (heightValue - 5);
          page.drawText('Product', { x: nameColx, y: itemY, font, size: itemTextSize ,color: rgb(1, 1, 1)});
          page.drawText('Qty', { x: quantityColx, y: itemY, font, size: itemTextSize ,color: rgb(1, 1, 1)});
          page.drawText('Price', { x: priceColx, y: itemY, font, size: itemTextSize ,color: rgb(1, 1, 1)});

        /*const items = [
          { name: 'Item 1', quantity:1, price: 50 },
          { name: 'Item 2', quantity:2, price: 30 },
          { name: 'Item 3', quantity:1, price: 20 },
          { name: 'Item 4', quantity:1, price: 30 },
        ];*/
        var subtotal = 0;
        var proTextSize = 10;
        userOrder?.line_items.forEach((item, index) => {
          heightValue = heightValue + (itemSpacing);
          subtotal = subtotal + parseFloat(item.subtotal);
          const itemY = page.getHeight() - heightValue;

           if(item.name.length > 50)
           {
               page.drawText(item.name.split(' ').slice(0, 8).join(' '), { x: nameColx, y: itemY, font, size: proTextSize });
               heightValue = heightValue + (10);
               page.drawText(item.name.split(' ').slice(8, 16).join(' '), { x: nameColx, y: page.getHeight() - heightValue, font, size: proTextSize });
           }else{
                page.drawText(item.name, { x: nameColx, y: itemY, font, size: proTextSize });
           }

          page.drawText(`${item.quantity}`, { x: quantityColx, y: itemY, font, size: proTextSize });
          page.drawText(`$${item.price.toFixed(2)}`, { x: priceColx, y: itemY, font, size: proTextSize });
        });

        

        // Add a line for the total
        heightValue = heightValue + 10;
        const totalY = page.getHeight() - heightValue;
        page.drawLine({ start: { x: 50, y: totalY }, end: { x: page.getWidth() - borderWidth, y: totalY }, thickness: 1, color: rgb(0.82, 0.82, 0.82) });

        // total prising box start 
        var startTotalboxX= 300;
        // Add total text
        heightValue = heightValue + 20;
        const subtotalTextSize = 12;
        page.drawText('Subtotal:', { x: startTotalboxX, y:  page.getHeight() - heightValue, font, size: subtotalTextSize });
        page.drawText(`$${subtotal.toFixed(2)}`, { x: priceColx, y:  page.getHeight() - heightValue, font, size: subtotalTextSize });


        // Add a line for the total
        heightValue = heightValue + 10;
        page.drawLine({ start: { x: startTotalboxX, y: page.getHeight() - heightValue }, end: { x: page.getWidth() - borderWidth, y: page.getHeight() - heightValue }, thickness: 1, color: rgb(0, 0, 0) });

        
        if(userOrder?.fee_lines)
        {
            userOrder?.fee_lines.forEach((line, index) => {
            // Add total text
            heightValue = heightValue + 20;
            const subtotalTextSize = 10;
            var feeTotal = parseFloat(line?.total);
            feeTotal = feeTotal.toFixed(2).replaceAll('-', '');
            
            page.drawText(line.name, { x: startTotalboxX, y:  page.getHeight() - heightValue, font, size: subtotalTextSize });
            page.drawText(`${line.name == 'Shipping:'?'+':'-'}$${feeTotal}`, { x: priceColx, y:  page.getHeight() - heightValue, font, size: subtotalTextSize });
            
            // Add a line for the total
            heightValue = heightValue + 10;
            page.drawLine({ start: { x: startTotalboxX, y: page.getHeight() - heightValue }, end: { x: page.getWidth() - borderWidth, y: page.getHeight() - heightValue }, thickness: 1, color: rgb(0.82, 0.82, 0.82)});
            });
        }

        if(userOrder?.discount_total > 0){
            heightValue = heightValue + 20;
            const subtotalTextSize = 10;
            var discount_total = parseFloat(userOrder?.discount_total)
            page.drawText('Discount:', { x: startTotalboxX, y:  page.getHeight() - heightValue, font, size: subtotalTextSize });
            page.drawText(`-$${discount_total.toFixed(2)}`, { x: priceColx, y:  page.getHeight() - heightValue, font, size: subtotalTextSize });

            // Add a line for the total
            heightValue = heightValue + 10;
            page.drawLine({ start: { x: startTotalboxX, y: page.getHeight() - heightValue }, end: { x: page.getWidth() - borderWidth, y: page.getHeight() - heightValue }, thickness: 1, color: rgb(0.82, 0.82, 0.82)});
        }

        // Add total text
        var total =parseFloat(userOrder?.total);
        heightValue = heightValue + 20;
        const totalTextSize = 12;
        page.drawText('Total:', { x: startTotalboxX, y: page.getHeight() - heightValue, font, size: totalTextSize });
        page.drawText(`$${total.toFixed(2)} (Inc.GST)`, { x: priceColx, y: page.getHeight() - heightValue, font, size: totalTextSize });

         // Add a line for the total
         heightValue = heightValue + 10;
         page.drawLine({ start: { x: startTotalboxX, y: page.getHeight() - heightValue }, end: { x: page.getWidth() - borderWidth, y: page.getHeight() - heightValue }, thickness: 1, color: rgb(0, 0, 0) });

         
        // Save the PDF to a Uint8Array
        const pdfBytes = await pdfDoc.save();

        // Convert Uint8Array to Blob
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

        // Create a download link
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(pdfBlob);
        downloadLink.download = 'invoice-'+userOrder?.number+'.pdf';

        // Trigger the download
        downloadLink.click();

      };
      

