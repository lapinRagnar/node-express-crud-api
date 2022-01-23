const express = require('express');
const { get } = require('express/lib/response');

const app = express()

// donnée
const data = [
    {id: 1, language: "javascript" },
    {id: 2, language: "ruby" },
    {id: 3, language: "pyhon" }
]

// midldeware
app.use(express.json())                               // permet de faire le post

// routes

// afficher all data
app.get('/', (req, res) => {
    res.status(200).json(data)
})


// une seule donnée par id
app.get('/:id', (req, res) => {
    // const id = req.params.id ou
    const { id } = req.params
    // console.log("notre id est: " + id);
    // const element = data.find(el => el.id === parseInt(id)) ou
    const element = data.find(element => element.id === +id) 
    if (!element) return res.status(404).json({ message: "l'id est introuvable!"})
    res.status(200).json(element)
})

// creation d'une donnée - post
app.post('/', (req, res) => {
    const { body } = req
    const nouvelElement = {
        id: data.length + 1,
        ...body
    }
    data.push(nouvelElement)
    res.status(200).json(nouvelElement)
})

// mettre à jour un element
app.put('/', (req, res) => {
    const { id } = req.params
    const { body } = req
    let element = data.find(element => element.id === +id)
    if (!element) return res.status(404).json({ message: "l'id est introuvable!"}) 
    element.language = body.language
    res.status(200).json(element)
})

// supprimer un element
app.delete('/', (req, res) => {
    const { id } = req.params
    let element = data.find(element => element.id === +id)
    if (!element) return res.status(404).json({ message: "l'id est introuvable!"}) 
    data.splice(data.indexOf(id), 1)
    res.status(200).json({message: "element supprimé"})
})



app.listen(8080, () => { console.log(" serveur lancé sur le port 8080") })