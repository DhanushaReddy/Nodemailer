http=require("http")
const fs=require("fs")
const {parse}=require("querystring")
const nodemailer = require("nodemailer");


let server=http.createServer((req,res)=>{
    if(req.method==="POST"){
        if(req.headers["content-type"]==="application/x-www-form-urlencoded"){
            //data
            let body=""
            req.on("data",(chunk)=>{
                body+=chunk
            })
            //end
            req.on("end",async ()=>{
                let parsedBody=parse(body)
                let email=parsedBody.email
                const transporter = nodemailer.createTransport({
                    host: 'smtp.ethereal.email',
                    port: 587,
                    auth: {
                        user: 'micaela.jast@ethereal.email',
                        pass: 'kkPcJSQXBAw3CHDfTT'
                    }
                });
                
                await transporter.sendMail({
                    from:"micaela.jast@ethereal.email",
                    to:email,
                    subject:"Netflix subscription",
                    text:"netflix plans",
                    html:"<h1>Welcome to netflix</h1>"
                })
                res.end(`email sent on ${email}`)
            })
        }else{
           res.end("not a form") 
        }

    }else{
        if(req.url==="/"){
            res.writeHead(200,"okay",{"content-type":"text/html"})
            let html=fs.createReadStream("../client/client.html","utf-8")
            html.pipe(res)
        }else if(req.url==="/css"){
            res.writeHead(200,"okay",{"content-type":"text/css"})
            let css=fs.createReadStream("../client/style.css","utf-8")
            css.pipe(res)
        }else{
            res.writeHead(404,"page not found",{"content-type":"text/plain"})
            res.end("<h1>OOps page not found</h1>")
        }
    }
})

server.listen(5000,(err)=>{
    if(err)console.log(err);
    console.log("Server is running on port 5000");
})
