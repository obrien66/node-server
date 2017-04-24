const http = require("http")
const fs   = require("fs")
const cc   = require("colour-cursive")
const bf   = require('brainfuck-javascript')
const MarkdownIt = require('markdown-it'),
	md = new MarkdownIt()

cc.green(__dirname + "\nhttp://localhost:8000/")

const server = http.createServer((req, res) => {
	var ext = req.url.split(".").reverse()[0]

	if (req.url == "/") ext = "html"

	switch(ext){
        case "html":
            res.writeHead(200, {'content-type': 'text/html'})
            break
        case "css":
            res.writeHead(200, {'content-type': 'text/css'})
            break
        case "js":
            res.writeHead(200, {'content-type': 'text/javascript'})
            break
        case "json":
            res.writeHead(200, {'content-type': 'application/json'})
            break

        case "md":
        	res.writeHead(200, {'content-type': 'text/html'})
        	break

        default:
            res.writeHead(200, {'content-type': 'text/plain'})
            break
    }
	cc.cyan(`Requested ${req.url}, type ${ext}`)

	var file = req.url.split("/").reverse()
	file = file[0]
	if (req.url == "/") file = "index.html"

	if (file != "") {
		fs.readFile(file, 'utf8', (err, data) => {
			if (err) {
				cc.red(`404: ${file} not found `)
				res.writeHead(200, {'content-type': 'text/html'})
				res.end(`<h1>Error 404: ${file} not found</h1>`)
			}
			else {
				cc.green("200: " + file)
				if (ext == 'md') {
					res.end(md.render(data))
				}
				else if (ext == "bf") {
					res.end(bf.text(data))
					// console.log(bf.text(data));
				}
				else {
					res.end(data)
				}
			}
		})
	}
})

server.listen(8000)