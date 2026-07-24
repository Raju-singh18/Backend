const { default: axios } = require("axios");
const express = require("express");
const redis = require("redis");

const app = express();
app.use(express.json());

let redisClient;
(
    async()=>{
        redisClient = redis.createClient();

        redisClient.on("error",(error)=>{
            console.log(error);
        })

        await redisClient.connect();
    }
)();

app.get("/calculate-data",async (req, res)=>{
 try {

    let calculated = await redisClient.get("calculated-data");
    console.log(calculated);
    if(calculated){
        return res.status(200).json({
            success:true,
            data:calculated
        })
    }
    let count=0;
    for(let i=0; i<10000000000; i++){
        count++;
    }

    await redisClient.set("calculated-data",count);

    return res.status(200).json({
        success:true,
        data:count
    })
 } catch (error) {
    return res.status(400).json({
        success:false,
        message:error.message
    })
 }
});

app.get("/get-data",async(req, res)=>{
    try {

        let data = await redisClient.get("get-data");

        if(data){
            return res.status(200).json({
                success:true,
                data:JSON.parse(data)
            })
        }
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        console.log(response);
        await redisClient.set("get-data",JSON.stringify(response.data));
        return res.status(200).json({
            success:true,
            data:response.data
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
})

app.listen(5000,()=>{
    console.log("App is runnong at port: 5000");
});
