const express = require('express')
const app=express()
const db= require("./database/db")
const isLogged=require("./middleware/isLogged")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
app.set("view engine","ejs")
const cookieParser=require("cookie-parser")
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.get("/",(request,response)=>{
    response.render("home.ejs")
})
app.get("/admin",isLogged,async (request,response)=>{

    response.render("./admin/dashboard.ejs")
})
app.get("/add-blog", (request, response) => {
    response.render("blogs/add-blog.ejs"); // ✅ Correct file
});
// Example: If `/post` renders posts.ejs
app.get("/blogs", async (request, response) => {
    try {
        const blogss = await db.addBlogs.findAll(); // Fetch blogs from DB
        response.render("./blogs/display-blog", { datas: blogss }); // Pass as `datas`
    } catch (err) {
        console.error(err);
        response.status(500).send("Server Error");
    }
});
app.get("/login",(request,response)=>{
   
      
    response.render("./authentication/login.ejs")
})
app.get("/dashboard.ejs",(request,response)=>{
    response.render("./admin/dashboard.ejs")
})
app.get("/post",async(request,response)=>{
    const blogss=await db.addBlogs.findAll()
    response.render("./dashboard/posts.ejs",{datas:blogss})
})
app.get("/register",(request,response)=>{
    response.render("./authentication/register.ejs")
})
app.get("/addcategory",(request,response)=>{
    response.render("./blogs/categoryadd.ejs")
})
app.post("/add-blog",async (request,response)=>{
    const registerId=request.registerId
    const {title,author,category,status,date,content} = request.body
  await  db.addBlogs.create({
title:title,
author:author,
category:category,
status:status,
date:date,
content:content,
registerId:registerId
    })
    response.send("added successfully")
})
app.post("/register", async (request,response)=>{
const {username,email,password,confirmpassword}=request.body
await db.registers.create({
    username:username,
    email:email,
    password:bcrypt.hashSync(password,10),
    confirmpassword:confirmpassword
})
response.render("home.ejs")
})
app.post("/login",async (request,response)=>{
    const {email,password}=request.body
   const register=await db.registers.findAll({
    where:{
        email:email
    }
})
if(register.length==0){
    response.send("email isnot registered")
}
else{
    const isPasswordMatch=bcrypt.compareSync(password,register[0].password)
    if(isPasswordMatch){
    const token=jwt.sign({name:"barsha"},"thisisascretkey",{
        expiresIn: '20days'
    })
    response.cookie("token",token)
    response.redirect("/")
    }
    else{
        response.send("invalid credentails")
    }
}
})
app.get("/delete/:id",async(request,response)=>{
    const id=request.params.id
    await db.addBlogs.destroy({
        where:{
            id:id
        }
    })
    response.send("deleted succesfulyy")
})
app.listen(3000,function(){
    console.log("backend has started at port number 3000")
})