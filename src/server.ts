import express, { Request, Response } from 'express'

const app = express()

app.use(express.json());

type User = {
  email: string;
  password: string;
}

const users: User[] = []

app.post('/', (request: Request<unknown, unknown, User>, response: Response) => {
  const { email, password } = request.body

  if (!email || !password) {
    return response.status(400).json({
      error: "Invalid email or password!"
    })
  }

  users.push({
    email,
    password
  })

  return response.sendStatus(201)
})

app.get('/', (request, response)=> {  
  // route params
  // const { id } = request.params

  // query params
  const { name: nameFilter } = request.query

  if (nameFilter) { 
    const result = users.filter((usuario) => usuario.email.includes(String(nameFilter).toLowerCase()))

    return response.status(200).json({
      users: result
    })
  }

  return response.status(200).json({
    users
  })
})



// toDo -> Criar um endpoint que atualize um usuário


// toDo -> Criar um endpoint que delete um usuário


app.listen(3333, () => {
  console.log('Server listening!')
})

