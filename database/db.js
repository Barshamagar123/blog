const {Sequelize, DataTypes}=require("sequelize")
require('dotenv').config()
const sequelize=new Sequelize(
{
    database:process.env.database,
    host:process.env.host,
    password:process.env.password,
    username:process.env.username,
    dialect:"mysql",
    port:3306
}
)

sequelize.authenticate()
.then(()=>{
    console.log("connected succesfully")
})
.catch((err)=>{
    console.log("error occurs",err)
})
const db={}

db.addBlogs=require("./../model/addBlog")(sequelize,DataTypes)
db.registers=require("./../model/registerModel")(sequelize,DataTypes)
sequelize.sync({alter:true}).then(()=>{
    console.log("migrated succesfully")
})
db.registers.hasMany(db.addBlogs)
db.addBlogs.belongsTo(db.registers)
module.exports=sequelize
module.exports=db