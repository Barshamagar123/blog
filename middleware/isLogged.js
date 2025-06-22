const jwt=require("jsonwebtoken")
const isLogged=(request,response,next)=>{
    const token=request.cookies.token
    if(!token){
        response.send("pleased logged in")
    }
    else{
        jwt.verify(token,"thisisascretkey",(error,result)=>{
            if(error){
                response.send("token invalud")
            }
            else{
                next()
            }
        })
    }
}
module.exports=isLogged