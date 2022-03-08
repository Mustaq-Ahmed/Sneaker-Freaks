const braintree = require("braintree");

let gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "hwzcbtr6tdt6sbq8",
    publicKey: "3dbqz2m44bdyxbv2",
    privateKey: "dfa1edc613bed96766392c1fe4f67077"
});


exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.send(response)
        }
    });
}

exports.processPayment = (req, res) => {

    let nonceFromTheClient = req.body.paymentMethodNonce

    let amountFromTheClient = req.body.amount

    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true
        }
    }, (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.json(result)
        }
    });
}