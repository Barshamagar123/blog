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
app.use(express.static("./storage/"))
const {multer,storage}=require('./middleware/multerConfig')
const { renderHome, renderAdmin, renderAddBlog, renderRegister, renderLogin, renderDelete, renderEdit, renderBlogDetails, renderBlogs } = require('./controller/blogController')
const upload = multer({storage:storage})

app.get("/",renderHome)


app.get("/blogs-details/:id",renderBlogDetails)

app.get("/add-blog", (request, response) => {
    response.render("blogs/add-blog.ejs")
});

app.get("/edit-blog/:id",async(request,response)=>{
    const id=request.params.id
    const addBlogs=await db.addBlogs.findAll({
        where:{
            id:id
        }
    })
    response.render("./blogs/edit-blog.ejs",{addBlogs: addBlogs})
})
app.get("/blogs", renderBlogs);

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
app.post("/add-blog",upload.single('image'),renderAddBlog)


app.post("/register",renderRegister )

app.post("/login",renderLogin)

app.get("/delete/:id", renderDelete)
app.get("/logout",(request,response)=>{
    response.render("./authentication/login.ejs")
})
app.post("/edit-blog/:id",renderEdit)

app.post('/logout',(request,response)=>{
    response.clearCookie('token')
})
app.listen(3000,function(){
    console.log("backend has started at port number 3000")
})