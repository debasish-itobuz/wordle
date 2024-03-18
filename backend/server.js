import http from 'http'
import { generate } from "random-words";

console.log(generate({ minLength: 5, maxLength: 5 }));

const port = 8008

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.url === '/getWord') {
        res.end(JSON.stringify({
            data: generate({ minLength: 5, maxLength: 5 }),
            status: 200,
            message: "success"
        }))

    }
})

server.listen(port, () => {
    console.log(`Server running at port ${port}`)
})