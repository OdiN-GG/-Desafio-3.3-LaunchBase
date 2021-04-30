const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.get('/', function(req, res){
    const about = {
        avatar_url: "https://i.pinimg.com/736x/27/b9/78/27b9789eee7ee1df5b92dbdb1270b750.jpg",
        name: "Wallison Da Silva lima",
        role: "Programador Junior",
        description: "Programador junior em JavaScript, com domínio em Reackt e Reackt Natine, e desenvolvimento Web.",
        
        links:[
            { name:"GitHub", url: "https://www.facebook.com/InnovationMoveisPlanejados/"},
            { name:"Instagram", url: "https://www.instagram.com/innovationmoveismadeira/?hl=pt-br"},
            { name:"Linkedin", url: "https://www.linkedin.com/feed/?trk=guest_homepage-basic_nav-header-signin"}
        ]

    }
    return res.render("about", {about})

})

server.get('/portifolio', function(req, res){
    return res.render('portifolio', {itens: videos} )

})

server.get('/video', function(req, res){
    const id = req.query.id

    const video = videos.find( function(video) {
        return video.id == id 
    }) 
        
    if (!video) {
        return res.send ("Video not found!")
    }

    return res.render("video", { item: video })
})


server.listen(5000, function(){
    console.log('servidor On')

})