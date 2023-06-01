const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000

const handleOfficeHours = (req, res, next) => {
    const date = new Date()
    const hour = date.getHours()
    const day = date.getDay()

    if(day != "Saturday" && day != "Sunday"){
        if( hour >= 9 && hour < 17){
            next();
            return;
        }
    }
    const data = fs.readFileSync("./out-office.html");
    const html = data.toString()

    res.status(301).set("Content-Type", "text/html").send(html)
}

app.use(handleOfficeHours)

app.get("/", (req, res)=> {
    fs.readFile("home.html", (err,data) => {
        res.status(200).set("Content-Type", "text/html").send(data).end()
    })
})

app.get("/contacts", (req, res) => {
    fs.readFile("contacts.html", (err,data) => {
        res.status(200).set("Content-Type", "text/html").send(data).end()
    })
})

app.get("/services", (req, res) => {
    fs.readFile("services.html", (err,data) => {
        res.status(200).set("Content-Type", "text/html").send(data).end()
    })
})

app.listen(port, () => {
    console.log("app running on port 3000")
})