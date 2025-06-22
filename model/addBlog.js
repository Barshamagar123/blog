makeaddBlogTable=(sequelize,DataTypes)=>{
    const addBlog=sequelize.define("addBlog",{
        title:{
            type:DataTypes.STRING
        },
        author:{
            type:DataTypes.STRING
        },
        category:{
            type:DataTypes.STRING
        },
        status:{
            type:DataTypes.ENUM("Published","Draft","Scheduled")
        },
        date:{
            type:DataTypes.DATE
        },
        image:{
            type:DataTypes.STRING
        },
        content:{
            type:DataTypes.STRING
        }
    })
    return addBlog
}
module.exports=makeaddBlogTable