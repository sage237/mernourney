const express=require('express');
const mongoose=require("mongoose");

const listingModel=require('./models/listing');

const app=express();
const port=8080;

main().then(()=>{
    console.log('Database connection successful');
}).catch((e)=>{
    console.log('Exception while connnection to database: '.e);
});
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/airbnbDB');
}


app.get('/testListing',async (req,res)=>{
const listingInstance=new listingModel({
    title:'Test Title',
    description:'Test Description for test title',
    price:200
});

const inst=await listingInstance.save();
res.send(`Saved Successfully: ${inst}`);

});

app.get("/",(req,res)=>{
    res.status(200).send(
        'API is working correctly'
    );
});
app.listen(port,()=>{
    console.log(`App is listeming on port ${port}`);
});