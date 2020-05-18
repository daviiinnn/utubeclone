const express = require('express');
const router = express.Router();

const { Subscriber } = require("../models/subscriber.db");


router.post("/subscriberNumber", (req, res) => {

    Subscriber.find({ "theguy": req.body.theguy})
    .exec((err, subscribe) =>{
        if(err) return res.status(400).send(err)
        res.status(200).json({success: true, subscriberNumber: subscribe.length})
    })

});

router.post("/subscribed", (req, res) => {

    Subscriber.find({"theguy": req.body.theguy,
                    "subscribee": req.body.subscribee})

                    .exec((err, subscribe) => {
                        if(err) return res.status(400).send(err)
                
                        let result = false;
                        if(subscribe.length !== 0) {
                            result = true
                        }
                
                        res.status(200).json({ success: true, subcribed: result  })
                    })
 
});

router.post("/subscribe", (req, res) => {

    const subscribe = new Subscriber(req.body);

    subscribe.save((err, doc) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});

router.post("/unSubscribe", (req, res) => {

    console.log(req.body)

    Subscriber.findOneAndDelete({ theguy: req.body.theguy, subscribee: req.body.subscribee })
        .exec((err, doc)=>{
            if(err) return res.status(400).json({ success: false, err});
            res.status(200).json({ success: true, doc })
        })
});

module.exports = router;