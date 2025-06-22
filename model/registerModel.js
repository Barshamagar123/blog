makeRegisterTable=(sequelize,DataTypes)=>{
    const register= sequelize.define("registers",{
username:{
    type:DataTypes.STRING
},
email:{
    type:DataTypes.STRING
},
password:{
    type:DataTypes.STRING
},
confirmpassword:{
    type:DataTypes.STRING
}
    })
    return register
}
module.exports=makeRegisterTable