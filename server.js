const express = require('express')

const app = express()
const port = 3000

let data = []

app.use(express.json())

app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(JSON.stringify(data));
})

app.post('/', (req, res) => {
    const item = req.body
    data.push(item)

    res.writeHead(201, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'You have successfully added an item' }))
    console.log(data);
})

app.put('/', (req, res) => {
    const item = req.body
    const index = data.findIndex((element) => element.id === item.id)
    if (index !== -1) {
        data[index] = item
        res.status(200).json({ message: 'You have successfully updated an item' })
    } else {
        res.status(404).json({ message: 'Item not found' })
    }
})

app.delete('/', (req, res) => {
    const id = req.query.id
    const index = data.findIndex((element) => element.id === id)
    if (index !== -1) {
        data.splice(index, 1)
        res.status(200).json({ message: 'You have successfully deleted an item' })
    } else {
        res.status(404).json({ message: 'Item not found' })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

