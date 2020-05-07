import React from 'react'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

momentDurationFormatSetup(moment)

export default function TimeLeft({ time, sessionTitle }) {


    const formattedTimeLeft = moment.duration(time, 's').format('mm:ss', { trim: false })
    return (
        <div>
            <h2>{sessionTitle}</h2>
            <h1>{formattedTimeLeft}</h1>
        </div>
    )
}
