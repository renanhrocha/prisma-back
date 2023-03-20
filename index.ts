import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


async function main() {
  const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const prisma = require('./prisma')

app.use(bodyParser.json())

// CREATE - Cria um novo usuário
app.post('/users', async (req: { body: { username: any; email: any; password: any } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string }): void; new(): any } } }) => {
  const { username, email, password } = req.body

  try {
    const user = await prisma.createUser(username, email, password)
    res.status(201).json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro ao criar usuário' })
  }
})

// READ - Retorna todos os usuários
app.get('/users', async (req: any, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string }): void; new(): any } } }) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro ao buscar usuários' })
  }
})

// READ - Retorna um usuário específico
app.get('/users/:id', async (req: { params: { id: any } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string }): void; new(): any } }; json: (arg0: any) => void }) => {
  const { id } = req.params

  try {
    const user = await prisma.getUserById(parseInt(id))

    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' })
    } else {
      res.json(user)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro ao buscar usuário' })
  }
})

// UPDATE - Atualiza um usuário existente
app.put('/users/:id', async (req: { params: { id: any }; body: { username: any; email: any; password: any } }, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string }): void; new(): any } } }) => {
  const { id } = req.params
  const { username, email, password } = req.body

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { username, email, password }
    })

    res.json(updatedUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro ao atualizar usuário' })
  }
})

// DELETE - Remove um usuário
app.delete('/users/:id', async (req: { params: { id: any } }, res: { json: (arg0: { message: string }) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string }): void; new(): any } } }) => {
  const { id } = req.params

  try {
    await prisma.user.delete({
      where: { id: parseInt(id) }
    })

    res.json({ message: 'Usuário removido com sucesso' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro ao remover usuário' })
  }
})

// CREATE - Cria um novo contrato para um usuário específico
app.post('/users/:userId/contracts', async (req: { params: { userId: any }; body: { title: any; body: any } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string }): void; new(): any } } }) => {
  const { userId } = req.params
  const { title, body } = req.body

  try {
    const contract = await prisma.createContract(parseInt(userId), title, body)
    res.status(201).json(contract)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro ao criar contrato' })
  }
})

// READ - Retorna todos os contratos de um usuário específico
app.get('/users/:userId/contracts', async (req: { params: { userId: any } }, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string }): void; new(): any } } }) => {
  const { userId } = req.params

  try {
    const contracts = await prisma.getContractsByUserId(parseInt(userId))
    res.json(contracts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message:
      'Erro ao buscar contratos' })
    }
    })
    
    // READ - Retorna um contrato específico
    app.get('/contracts/:id', async (req: { params: { id: any } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string }): void; new(): any } }; json: (arg0: any) => void }) => {
    const { id } = req.params
    
    try {
    const contract = await prisma.contract.findUnique({
    where: { id: parseInt(id) }
    })
    
    
    if (!contract) {
      res.status(404).json({ message: 'Contrato não encontrado' })
    } else {
      res.json(contract)
    }
    } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro ao buscar contrato' })
    }
    })
    
    // UPDATE - Atualiza um contrato existente
    app.put('/contracts/:id', async (req: { params: { id: any }; body: { title: any; body: any } }, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string }): void; new(): any } } }) => {
    const { id } = req.params
    const { title, body } = req.body
    
    try {
    const updatedContract = await prisma.contract.update({
    where: { id: parseInt(id) },
    data: { title, body }
    })
    
   
    res.json(updatedContract)
    } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro ao atualizar contrato' })
    }
    })
    
    // DELETE - Remove um contrato
    app.delete('/contracts/:id', async (req: { params: { id: any } }, res: { json: (arg0: { message: string }) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string }): void; new(): any } } }) => {
    const { id } = req.params
    
    try {
    await prisma.contract.delete({
    where: { id: parseInt(id) }
    })
    
    
    
    res.json({ message: 'Contrato removido com sucesso' })
    } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Erro ao remover contrato' })
    }
    })
    
    app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000')
    })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })