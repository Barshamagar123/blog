const express = require('express')
const app=express()
const db= require("./database/db")
const blogRoute=require("./routes/blogRoute")
// const isLogged=require("./middleware/isLogged")
// const bcrypt=require('bcrypt')
// const jwt=require('jsonwebtoken')
app.set("view engine","ejs")
const cookieParser=require("cookie-parser")
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(express.static("./storage/"))

// const {multer,storage}=require('./middleware/multerConfig')
const { renderHome, renderAdmin, renderAddBlog, renderRegister, renderLogin, renderDelete, renderEdit, renderBlogDetails, renderBlogs, renderAdd, renderEditPage, renderLoginPage, renderDashboard, renderPost, renderRegisterPage } = require('./controller/blogController')
// const upload = multer({storage:storage})

// app.get("/",renderHome)
// app.get("/blogs-details/:id",renderBlogDetails)

// app.get("/add-blog",renderAdd );

// app.get("/edit-blog/:id",renderEditPage)

// app.get("/blogs", renderBlogs);

// app.get("/login",renderLoginPage)

// app.get("/dashboard.ejs",renderDashboard)

// app.get("/post",renderPost)

// app.get("/register",renderRegisterPage)

// app.get("/addcategory",(request,response)=>{
//     response.render("./blogs/categoryadd.ejs")
// })
// app.post("/add-blog",upload.single('image'),renderAddBlog)


// app.post("/register",renderRegister )

// app.post("/login",renderLogin)

// app.get("/delete/:id", renderDelete)

app.get("/logout",(request,response)=>{
    response.render("./authentication/login.ejs")
})
// app.post("/edit-blog/:id",renderEdit)

app.post('/logout',(request,response)=>{
    response.clearCookie('token')
})
app.use("",blogRoute)
app.listen(3000,function(){
    console.log("backend has started at port number 3000")
})