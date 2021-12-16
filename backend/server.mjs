import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
const porta = 3003;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/user', (req, res, next) => {
    fs.appendFileSync('./db/clients.txt', `{
    "user": "${req.body.user}",
    "password": "${req.body.pass}",
    "email": "${req.body.email}",
    "name": "${req.body.name}",
    "tel": "${req.body.tel}",
    "date": "${req.body.date}"
}
\r\n`);
    try {
        let clients = ''
        path('./db/clients.txt')
            .then(clients => clients.replaceAll('}', '},'))
            .then(a => clients = a)
            .then(b => b.substr(0, b.length - 4))
            .then(clients => fs.writeFileSync('./db/clients.json', `[
  ${clients}
]`))

    } catch (err) {
        console.error(err)
    }

    res.send('<h1>user saved successfully</h1>');
})
app.listen(porta, () => {
    console.log(`rodando  servidor na porta ${porta}`);
})


function path(path) {
    return new Promise(resolve => {
        fs.readFile(path, function (_, conteudo) {
            resolve(conteudo.toString())
        })
    })

}