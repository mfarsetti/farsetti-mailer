const mailer = require("nodemailer");

module.exports = (email, nome, telefone, mensagem, metragem, tecido, descricao, anexo) => {
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

    console.log("email", email)
    console.log("nome", nome)
    console.log("telefone", telefone)
    console.log("mensagem", mensagem)
    console.log("metragem", metragem)
    console.log("descricao", descricao)
    console.log("anexo", anexo)
    
    const mail = {
        from: "Sedafio <sedafiotecidos@gmail.com>",
        to: ["matheusfarsetti@agencialbm.com.br", "sedafio@sedafio.com.br"],
        subject: `${nome} te enviou uma mensagem`,
        html: `
        <html>
        <body>
          <b>Sedafio</b>
          ${nome ? `<p>Nome: ${nome}</p>` : ''}
          ${email ? `<p>Email: ${email}</p>` : ''}
          ${telefone ? `<p>Telefone: ${telefone}</p>` : ''}
          ${mensagem ? `<p>Mensagem: ${mensagem}</p>` : ''}
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