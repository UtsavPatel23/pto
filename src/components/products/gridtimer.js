import React from 'react'
import { useState } from 'react'
import Image from '../image';

function gridtimer({imgurl}) {
    const [tiem ,setTime] = useState('');
    var x = setInterval(function() {
        // Get end date
        var startDay = new Date();
        // console.log('startDay-->', startDay);
        var nextDay = new Date(startDay);
        nextDay.setHours(0, 0, 0);
        nextDay.setDate(startDay.getDate() + 1);
        var ends_in = nextDay.getTime() - startDay.getTime();
        var hoursn = Math.floor((ends_in % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutesn = Math.floor((ends_in % (1000 * 60 * 60)) / (1000 * 60));
        var secondsn = Math.floor((ends_in % (1000 * 60)) / 1000);
        if (ends_in >= 0) {
            setTime('<span class="me-2">Ends in</span><p>' + hoursn + '<span>:</span></p><p>' + minutesn + '<span>:</span></p><p>' + secondsn + '</p>');
        }
        if (ends_in < 0) {
            clearInterval(x);
            setTime('');
        }
    }, 1000);
    return (
        <div>
            <Image
			sourceUrl={ imgurl ?? '' }
			altText='Grid timer'
			title='Grid timer'
			width="315"
			height="80"
			/>
            <div key="grid_timer"
				dangerouslySetInnerHTML={ {
					__html: tiem ?? '',
				} }
				className="grid_timer"
			/>
        </div>
    )
}

export default gridtimer
