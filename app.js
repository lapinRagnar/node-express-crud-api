const express = require('express');
const { get } = require('express/lib/response');

const app = express()

const data = [
    {id: 1, language: "javascript" },
    {id: 2, language: "ruby" },
    {id: 3, language: "pyhon" }
]


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
    const element = data.find(el => el.id === +id) 
    console.log(element);

    if (!element) return res.json({ message: "l'id est introuvable!"})
    res.status(200).json(element)
})




app.listen(8080, () => { console.log(" serveur lancé sur le port 8080") })