const { renderHome, renderBlogDetails, renderAdd, renderEditPage, renderBlogs, renderLogin, renderLoginPage, renderDashboard, renderPost, renderRegisterPage, renderAddBlog, renderRegister, renderDelete, renderEdit, renderAdmin } = require("../controller/blogController")
const {multer,storage}=require('../middleware/multerConfig')
const upload = multer({storage:storage})
const isLogged=require("../middleware/isLogged")
const router= require("express").Router()
router.route("/").get(renderHome)

router.route("/blogs-details/:id").get(renderBlogDetails)
router.route("/add-blog").get(renderAdd).post(upload.single('image'),renderAddBlog)

router.route("/edit-blog/:id").get(renderEditPage).post(renderEdit)

router.route("/blogs").get(renderBlogs)
 
router.route("/admin").get(isLogged, renderAdmin)
router.route("/login").get(renderLoginPage).post(renderLogin)

router.route("/dashboard").get(renderDashboard)

router.route("/post").get(renderPost)

router.route("/register").get(renderRegisterPage).post(renderRegister)

router.route("/delete/:id").get(renderDelete)
module.exports=router