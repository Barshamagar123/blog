const multer=require("multer")
const storage=multer.diskStorage({
    destination:function(request,file,cb)
    {
cb(null,"./storage")
    },
    filename:function(request,file,cb){
        cb(null,file.originalname)
    }
})
module.exports={multer,storage}