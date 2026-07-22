
import express from "express";
import { prisma } from "./lib/prisma.js";


const app = express();
app.use(express.json());

app.post('/user', async (req, res) => {
  try {
    const resp = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });

    return res.status(201).json({
      message: "User created successfully..!",
      user: resp,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

app.get('/users', async(req, res)=>{
    const users = await prisma.user.findMany();

    return res.status(200).json({
      message:"Users found successfully",
      users:users  
    })
})

app.listen(5000,(err)=>{
    if(err){
        console.log(err)
        process.exit(1)
    }
    console.log("App running at port: 5000")
});
