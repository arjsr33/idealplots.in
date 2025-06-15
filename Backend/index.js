import express from 'express';
import 'dotenv/config'
const app = express();
const port = process.env.PORT;
app.get('/', (req,res)=>{
    res.send("Backend is active");
})

app.listen(port,()=>{
    console.log(`The server is running at ${port} `)
})