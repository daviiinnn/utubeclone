import React, { useEffect, useState} from 'react';
import axios from 'axios';



function SubscribeButton(props) {

    const theguy = props.theguy
    const subscribee = props.subscribee


    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)

    const onSubscribe = ( ) => {


        let subscribeVariables = {
            theguy: theguy,
            subscribee: subscribee
        }

        if(Subscribed) {
            //when we are already subscribed 
            axios.post('/api/subscribe/unSubscribe', subscribeVariables)
                .then(response => {
                    if(response.data.success){ 
                        setSubscribeNumber(SubscribeNumber - 1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert('Failed to unsubscribe')
                    }
                })

        } else {
            // when we are not subscribed yet
            
            axios.post('/api/subscribe/subscribe', subscribeVariables)
                .then(response => {
                    if(response.data.success) {
                        setSubscribeNumber(SubscribeNumber + 1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert('Failed to subscribe')
                    }
                })
        }

    }

    useEffect(() => {

        const subscribeNumberVariables = { theguy: theguy, subscribee: subscribee }
        axios.post('/api/subscribe/subscribeNumber', subscribeNumberVariables)
            .then(response => {
                if (response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert('Failed to get subscriber Number')
                }
            })

        axios.post('/api/subscribe/subscribed', subscribeNumberVariables)
            .then(response => {
                if (response.data.success) {
                    setSubscribed(response.data.subcribed)
                } else {
                    alert('Failed to get Subscribed Information')
                }
            })

    }, [])






    return (
        <>
            <button 

            onClick={onSubscribe}

            style={{
                backgroundColor: `${Subscribed ? '#AAA' : '#CC0000'}`,
                borderRadius: '4px',
                color: 'white',
                padding: '10px 16px',
                fontWeight: '500',
                fontSize: '1rem',
                textTransform: 'uppercase'
            }}>
                {SubscribeNumber} {Subscribed ? "Subscribed" : "Asu tenan iki jancok"}
            </button>
        </>
    )
}

export default SubscribeButton
