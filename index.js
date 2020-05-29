const log = console.log;
const express = require('express');
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const cors = require('cors')


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

const PORT = process.env.PORT || 3001;
app.get('/',(req,res)=>{
    res.send('welcome to my form');
})

app.post('/api/forma',(req,res)=>{
    let data = req.body;
    console.log(req.body)
    let smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        auth:{
            user: 'shoaib.butex@gmail.com',
            pass: 'asd42526272'
        }
    })

let mailOptions ={
    from: data.email,
    to:'shoaib.butex@gmail.com',
    subject: `Message from ${data.firstName} ${data.lastName}`,
    html:`
    <ul>
        <li>Name: ${data.firstName} ${data.lastName}</li>
        <li>Email: ${data.email}</li>
        
    </ul>
    <h3>Message:</h3>
    <p>${data.message}</p>
    `
};
smtpTransport.sendMail(mailOptions,(error,response)=>{
    if(error){
        res.send(error)
    }
    else{
        res.send('Success')
    }
})
smtpTransport.close()
})
app.listen(PORT, ()=> log("Server is running on PORT",PORT));