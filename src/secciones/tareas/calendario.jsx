import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'



export default function calendario() {
    return (
       <div className="container mb-5">
            <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            events={[
                { title: 'event 1', date: '2020-09-01' },
                { title: 'event 2', date: '2020-09-02' },
                {
                    groupId: 'testGroupId',
                    start: '2020-09-10',
                    end: '2020-09-20',
                    display: 'background'
                }
            ]}
            locale="es"
        />
       </div>
    )
}
