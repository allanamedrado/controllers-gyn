//guardar dado do req.body num json
const fs = require('fs')
//fs é um módulo do nodejs filesystem

const data = require("../data.json")
const { date } = require("../date")

//exportar funcoes

exports.create = function(req, res) {
    return res.render("members/create")
}

//create post
exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for (const key of keys) {
        if (req.body[key] == "") {
            return res.send('Please, fill all fields!')
        }
    }
    
    birth = Date.parse(req.body.birth)

    let id = 1 
    const lastMember = data.members[(data.members.length + 1)]

    if(lastMember) {
        id = lastMember.id + 1
    }

   data.members.push({
        id,
       ...req.body,       
       birth
   }) //faz array de objetos com dados
   
   fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error!")

       return res.redirect(`/members/${id}`)
    })

    //return res.send(req.body)
}

//show
exports.show = function(req, res){
    const { id } = req.params

    const foundMember = data.members.find(function(member){
        return member.id == id
    })

    if( !foundMember ) return res.send("Member not found!")
    

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay,
    }

    return res.render("members/show", { member })
}

//edit 
exports.edit = function(req, res) {
    const { id } = req.params

    const foundMember = data.members.find(function(member) {
        return id == member.id
    })

    if (!foundMember) return res.send("Member not found!")
    
    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso
    }

    return res.render('members/edit', {member: foundMember})
}

//put
exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundMember = data.members.find(function(member, foundIndex) {
        if(id == member.id){
            index = foundIndex
            return true
        }
    })

    if (!foundMember) return res.send("Member not found!")
    
    const member = {
        ...foundMember,
        ...req.body, //coloca os dados novos
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write error!")

        return res.redirect(`/members/${id}`)
    })
}

exports.delete = function(req, res){
    const { id } = req.body

    const filteredMember = data.members.filter(function(member){
        return member.id != id
    })

    data.members = filteredMember

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error!")

        return res.redirect("/members")
    })
}

exports.index = function(req, res) {
    return res.render("members/index", {members:data.members})
}