require("dotenv").config
const nodemailer = require("nodemailer")

/* 
Steps to implement nodemailer.
1) Create Transporter Object.
2) We have to Set Mailing Options Object.
3) Deliver the Message with sent mail method.
*/
exports.sendEmail = (req, res) => {
    let data = req.body
    if (data.name.length === 0 || data.email.length === 0 || data.message.length === 0) {
        return res.status(400).json({
            error: "Please Fill Out All the Fields!"
        })
    }

    // step 1.
    let smptTransporter = nodemailer.createTransport({
        service: "Gmail", 
        port: 465,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })
    // step 2.
    let mailOptions = {
        from: data.email,
        to: process.env.EMAIL,
        subject: `Message from ${data.name}`,
        html: `

        <h3> Information : </h3>
        <ul> 
        <li> Name : ${data.name} </li>
        <li> Email : ${data.email} </li>
        </ul>
        <h3> Message : </h3>
        <p> ${data.message} </p>
        `
    }
    // step 3.
    smptTransporter.sendMail(mailOptions, (error) => {
        try {
            if (error) return res.status(400).json({ error: "Please Fill Out All the Fields!" })
            
            return res.status(200).json({
                successMsg: "Thank you for contacting Mustaq."
            })
        } catch (error) {
            if (error) return res.status(500).json({ error: "Server Error!" })
        }
    })

}

