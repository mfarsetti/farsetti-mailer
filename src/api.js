const http = require('http'); 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const upload = require("multer")();

app.use(require("cors")()); 
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.json({message: "Tudo ok por aqui!"});
})

app.post('/send', upload.single('anexo'), (req, res, next) => { 
    require("./nodemail")(req.body)
        .then(response => res.json(response))
        .catch(error => res.json(error));
})

app.post('/orcamento', upload.single('anexo'), (req, res, next) => { 
    require("./nodemail")(req.body, req.file)
        .then(response => res.json(response))
        .catch(error => res.json(error));
})

const server = http.createServer(app); 
server.listen(process.env.PORT || 5000);
console.log("Servidor escutando na porta 5000...")