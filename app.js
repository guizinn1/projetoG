const express = require('express')
const app = express()
const port = 3000
app.use(express.json());

let bd = [
    {
        id: "1",
        name: "guilherme"
    },
    {
        id: "2",
        name: "Bruna"
    }
]

//get users
app.get('/users', (request, response) => {
  response.json(bd);
})

app.get('/users/:id', (request, response) => {
  //pegar o id da requisição
  const idUser = request.params.id

  //encontrar o usuário correspondente no bd
  const user = bd.filter((usuario) => usuario.id === idUser);

  //responder a requisição com as info dos users
  response.json(user);
})
app.post("/users", (request, response) => {

  //pegar o corpo da requisição
  const body = request.body;

  //criar um novo objeto a partir desse corpo
  const newUser = {
    id: (bd.length+1).toString(),
    name: body.name
  }

  //adicionar esse novo objeto no banco
  bd.push(newUser);

  //responder a requisição com o banco completo
  response.json(bd);

})
app.delete("/users/:id", (request, response)=> {

  //pegar o id da requisição
  const idUser = request.params.id;

  //percorrer o banco e encontrar quem tem o id da requisição
  bd = bd.filter((usuario) => usuario.id != idUser);

  //responder com o meu banco atualizado
  response.json(bd);

})

app.patch("/users/:id", (request, response) => {

  //pegar o id de requisição
  const idUser = request.params.id;
  
  //pegar o corpo de requisição
  const body = request.body;

  //percorrer o banco
  bd = bd.map((usuario) => {

    if(usuario.id === idUser){
      //atualizar as informações
      usuario.name = body.name;
    }

    return usuario
  })
  //responder a requisição com o banco
  response.json(bd);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
