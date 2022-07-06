const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SEC_KEY);

router.post("/payment", async( req, res ) => {
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd",
        },
        (err, res) => {
            if(err) {
                res.status(500).json({ message: err });
            } else {
                res.status(200).json(res);
            }
        }
    )
})



module.exports = router