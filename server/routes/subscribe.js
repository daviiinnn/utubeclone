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

    const subscriber = new Subscriber(req.body);

    subscriber.save((err, doc) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});

module.exports = router;