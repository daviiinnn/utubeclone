import React, { useEffect, useState} from 'react';
import axios from 'axios';



function SubscribeButton(props) {

    const theguy = props.theguy
    const subscribee = props.subscribee

    const [SubscriberNumber, setSubscriberNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)

    useEffect(() => {

        const subscriberNumberVariables = { theguy: theguy, subscribee: subscribee}
        axios.post('/api/subscribe/subscriberNumber', subscriberNumberVariables)
        .then(response =>{
            response.data.success ? setSubscriberNumber(response.data.SubscriberNumber)
            : alert('Kurang goyang kang')
        })

        axios.post('/api/subscribe/subscribed', subscriberNumberVariables)
        .then(response =>{
            response.data.success ? setSubscribed(response.data.subscribed) :
            alert('ora ono')
    
        })
    }, [])






    return (
        <>
            <button style={{
                backgroundColor: `${Subscribed ? '#AAA' : '#CC0000'}`,
                borderRadius: '4px',
                color: 'white',
                padding: '10px 16px',
                fontWeight: '500',
                fontSize: '1rem',
                textTransform: 'uppercase'
            }}>
                {SubscriberNumber} {Subscribed ? "Subscribed" : "Asu tenan iki jancok"}
            </button>
        </>
    )
}

export default SubscribeButton
