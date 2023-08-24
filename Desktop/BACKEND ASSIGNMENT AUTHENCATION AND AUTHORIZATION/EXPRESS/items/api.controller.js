
const items = [];

const Getitems = (req, res) => {
    res.status(200).json({
        data: items,
        error: null
    })
}

const Createitems = (req, res) => { 
    const item = req.body;
     
    items.push({ ...req.body,
        id: Math.floor(Math.random() * 500).toString() })

    return res.status(200).json({
        data: items,
        error: null 
    })
}


const getOneitem = (req, res) => {
    const id = req.params.id
    const founditem = items.find((item) => {
        return item.id == parseInt(id)
    })
    if (!founditem) {
        res.status(404).send(`Item not found`)
    }
    res.status(200).json(founditem)
}

const updateitem = (req, res) => {
    const id = req.params.id
    const update = req.body
    const foundIndex = items.findIndex(item => item.id == parseInt(id))
    if (foundIndex == -1) {
        res.end(`item with id ${id} is not found`)
        return
    }
    items[foundIndex] = { ...items[foundIndex], ...update }
    res.status(200).json(items[foundIndex])
}

const deleteitem = (req, res) => {
    const id = req.params.id
    const foundIndex = items.findIndex(item => item.id == parseInt(id))
    if (foundIndex == -1) {
        res.end(`item with id:${id} is not found`)
        return
    }
    items.splice(foundIndex, 1)
    res.end(`item with id:${id}, deleted successfully`)
}

module.exports = {
    Getitems,
    Createitems,
    updateitem,
    getOneitem,
    deleteitem 
}








