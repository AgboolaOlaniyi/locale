
const http = require('http');
const fs = require('fs');


const port = 3001
const Items = [];



const handleResponse = (req, res) => ({ code = 200, error = null, data = null }) => {
    res.setHeader('content-type', 'application/json')
    res.writeHead(200)
    res.write(JSON.stringify({ data, error }))
    res.end()
}

const bodyParser = (req, res, callback) => {
    const body = [];
    
    req.on('data', (chunk) => {
        console.log({ chunk })
        body.push(chunk)
    })

    req.on('end', () => {
        if(body.length){
        const parsedbody = Buffer.concat(body).toString();
        console.log({ parsedbody })
        req.body= JSON.parse(parsedbody);
     }
        
         callback(req, res)

    })
}

const handleRequest = (req, res) => {

    const response = handleResponse(req, res)

    
    if (req.url === '/Items' && req.method === 'POST') {

                Items.push({
                ...req.body,
                id: Math.floor(Math.random() * 500).toString()
            })

            return response({
                data: Items,
                code: 200,
            })
    }


    if (req.url === '/Items' && req.method === 'GET') {

        return response({
            data: Items,
            code: 200,
        })

    }

    if (req.url.startsWith('/Items/') && req.method === 'GET') {
        const id = req.url.split('/')[2]
        console.log({ id })

        const ItemIndex = Items.findIndex((Item) => Item.id === id)

        if (ItemIndex === -1) {
            return response({
                data: Items,
                code: "404",
                error: "Item not fund",
            })


        }

        const Item = Items[ItemIndex]
        return response({
            data: Item,
            code: 200,
        })

    }

    if (req.url.startsWith('/Items/') && req.method === 'PATCH') {
        const id = req.url.split('/')[2]
        console.log({ id, body: req.body })

        const ItemIndex = Items.findIndex((Item) => Item.id === id)

        if (ItemIndex === -1) {
            return response({
                data: Items,
                code: "404",
                error: "Item updated successfully",
            })  

        }

        const Item = {...Items[ItemIndex], ...req.body}
        return response({
            data: Item,
            code: 200,
        })

    }


    if (req.url.startsWith('/Items/') && req.method === 'DELETE') {
        const id = req.url.split('/')[2]
        console.log({ id, body: req.body })

        const ItemIndex = Items.findIndex((Item) => Item.id === id)

        if (ItemIndex === -1) {
            return response({
                data: Items,
                code: "404",
                error: "Item deleted successfully",
            })


        }


        Items.splice(ItemIndex, 1)
        return response({
            data: Items,
            code: 200,
        })
    }
    

}

const server = http.createServer(( req, res) => bodyParser(req, res, handleRequest))

server.listen(port, () => {
    console.log('Listening on port: ${port}')
})


