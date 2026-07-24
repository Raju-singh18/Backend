
import {createReadStream, createWriteStream} from "fs";
import path from "path";

const inputFilePath = path.join(import.meta.dirname, "input.txt");
const outputFilePath = path.join(import.meta.dirname, "output.txt");

const readableStream = createReadStream(inputFilePath, {
    encoding:"utf-8",
    highWaterMark:16,
});

const writableStream = createWriteStream(outputFilePath);

// Listen For Data Chunk
readableStream.on("data",(chunk)=>{
    console.log("Buffer (chunk):", Buffer.from(chunk));
    console.log("Received Chink:",chunk);
    writableStream.write(chunk);
});
// Handle stream end

readableStream.on("end", ()=>{
    console.log("File read completed.");
    writableStream.end();
})


// readableStream.pipe(writableStream);


// Handle error
readableStream.on("error",(err)=>{
    console.error("Error:",err);
})

writableStream.on("error",(err)=>{
    console.error("Error:",err);
})
