const db = require("../database/db")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

exports.renderHome=(request,response)=>{
    response.render("home.ejs")
}
exports.renderAdmin=async (request,response)=>{
    response.render("./admin/dashboard.ejs")
}

  exports.renderAddBlog=async (request,response)=>{
      // console.log(request.file)
      const registerId=request.registerId
      const {title,author,category,status,date,content,image} = request.body
    await  db.addBlogs.create({
  title:title,
  author:author,
  category:category,
  status:status,
  date:date,
  content:content,
  image: process.env.backendUrl + request.file.filename,
  registerId:registerId
      })
      response.send("added successfully")
  }

  exports.renderRegister=async (request,response)=>{
  const {username,email,password,confirmpassword}=request.body
  await db.registers.create({
      username:username,
      email:email,
      password:bcrypt.hashSync(password,10),
      confirmpassword:confirmpassword
  })
  response.render("home.ejs")
  }
  exports.renderLogin=async (request,response)=>{
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
  }
  exports.renderDelete=async(request,response)=>{
      const id=request.params.id
      await db.addBlogs.destroy({
          where:{
              id:id
          }
      })
      response.send("deleted succesfulyy")
  }
  exports.renderEdit=async(request,response)=>{
      const id=request.params.id
    const {title,author,category,status,date,content} = request.body
      await  db.addBlogs.update({
  title:title,
  author:author,
  category:category,
  status:status,
  date:date,
  content:content,
      },{
          where:{
              id:id
          }
      })
      response.send("updated succesfyylyy")
  }
  exports.renderBlogDetails=async(request,response)=>{
      const id=request.params.id
       const blogss=await db.addBlogs.findAll({
          where: {
              id:id
          }
       })
      response.render("./blogs/blogs-details.ejs",{datas:blogss})
  }
  exports.renderBlogs= async (request, response) => {
      try {
          const blogss = await db.addBlogs.findAll();
          response.render("./blogs/display-blog", { datas: blogss }); 
      } catch (err) {
          console.error(err);
          response.status(500).send("Server Error");
      }
  }
  exports.renderAdd=(request, response) => {
    response.render("blogs/add-blog.ejs")
}
exports.renderEditPage=async(request,response)=>{
    const id=request.params.id
    const addBlogs=await db.addBlogs.findAll({
        where:{
            id:id
        }
    })
    response.render("./blogs/edit-blog.ejs",{addBlogs: addBlogs})
}
exports.renderLoginPage=(request,response)=>{
    response.render("./authentication/login.ejs")
}
exports.renderDashboard=(request,response)=>{
    response.render("./admin/dashboard.ejs")
}
exports.renderPost=async(request,response)=>{
    const blogss=await db.addBlogs.findAll()
    response.render("./dashboard/posts.ejs",{datas:blogss})
}
exports.renderRegisterPage=(request,response)=>{
    response.render("./authentication/register.ejs")
}