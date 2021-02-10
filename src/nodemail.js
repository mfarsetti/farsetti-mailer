const mailer = require("nodemailer");

module.exports = (email, nome, telefone, mensagem, anexo) => {
    const smtpTransport = mailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'sedafiotecidos@gmail.com',
        pass: 'lbm1234.,'
      },
      tls:{
          rejectUnauthorized: false
      }
    })
    
    const mail = {
        from: "Sedafio <sedafiotecidos@gmail.com>",
        to: ["matheusfarsetti@agencialbm.com.br", "sedafio@sedafio.com.br"],
        subject: `${nome} te enviou uma mensagem`,
        html: `
        <html>
        <body>
          <b>Sedafio</b>
          <p>Nome: ${nome}</p>
          <p>Email: ${email}</p>
          <p>Telefone: ${telefone}</p>
          <p>Mensagem: ${mensagem}</p>
        </body>
      </html> 
      `,
    }
    
    if(anexo){
        console.log(anexo);
        mail.attachments = [];
        mail.attachments.push({
            filename: anexo.originalname,
            content: anexo.buffer
        })
    }
    
    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mail)
            .then(response => {
                smtpTransport.close();
                return resolve(response);
            })
            .catch(error => {
                smtpTransport.close();
                return reject(error);
            });
    })
}