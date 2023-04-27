const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
//routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

//database
/* -------------------------------- Mongoose -------------------------------- */
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONG_DB,{
    // useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log('connection successful');
}).catch((e)=>{
    console.log('unsuccessful');
    console.log(e);
})


/* ---------------------------------- PORT ---------------------------------- */
const PORT = process.env.PORT;

app.listen(PORT, (req,res)=>{
    console.log(`listening http://localhost:${PORT}`);
})

