const mongoose = require('mongoose');
connectDb = async (connectString)=>{
    await mongoose.connect(connectString)
                  .then(()=>console.log(`Db connected`))
                  .catch(error=>console.log(`Db connection error:${error.message}`));
}
module.exports = {connectDb};