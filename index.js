const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })
        switch (req.url) {
            case '/':
                fs.readFile(
                    path.join(__dirname, 'views', 'index.html'),
                    'utf-8',
                    (err, content) => {
                        if (err) throw err
                        res.end(content)
                    }
                )
                break
            case '/about':
                fs.readFile(
                    path.join(__dirname, 'views', 'about.html'),
                    'utf-8',
                    (err, content) => {
                        if (err) throw err
                        res.end(content)
                    }
                )
                break
            case '/api/users':
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })
                const users = [
                    {name: 'Leha', age: 25},
                    {name: 'Elena', age: 23},
                    {name: 'Liza', age: 30},
                ]
                res.end(JSON.stringify(users))
                break
        }
    } else if (req.method === 'POST') {
        const body = []
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })
        req.on('data', data => {
            body.push(Buffer.from(data))
        })
        req.on('end', () => {
            const message = body.toString().split('=')[1]
            res.end(`
                <h1>Ваше сообщение: ${message}</h1>
            `)
        })
    }
})

server.listen(3000, () => {
    console.log('Server is running...')
})