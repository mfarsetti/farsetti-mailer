const mailer = require("nodemailer");

module.exports = (body, anexo) => {
    const {email, nome, telefone, mensagem, metragem, tecido, descricao} = body

    console.log(anexo)
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
    let msg
    if(mensagem){
      msg = mensagem
    }
    
    const mail = {
        from: "Sedafio <sedafiotecidos@gmail.com>",
        to: ["matheusfarsetti@agencialbm.com.br"],
        subject: `${nome} te enviou uma mensagem`,
        html: `
        <html>
        <body>
          <b>Sedafio</b>
          ${nome ? `<p>Nome: ${nome}</p>` : ''}
          ${email ? `<p>Email: ${email}</p>` : ''}
          ${telefone ? `<p>Telefone: ${telefone}</p>` : ''}
          ${msg ? `<p>Mensagem: ${msg}</p>` : ''}
          ${metragem ? `<p>metragem: ${metragem}</p>` : ''}
          ${tecido ? `<p>tecido: ${tecido}</p>` : ''}
          ${descricao ? `<p>descricao: ${descricao}</p>` : ''}
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