const mailer = require('nodemailer')

async function main() {

  let transport = mailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: '',
      pass: ''
    }
  })

  let mail = {
    from: '',
    to: '',
    subject: 'Testing',
    text: 'Hello World'
  }

  await transport.sendMail(mail, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Email sent successfully')
    }
  })
}