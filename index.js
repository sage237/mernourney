const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const ejsMate = require('ejs-mate');
const listingModel = require('./models/listing');
const { title } = require('process');
const methodOverride = require('method-override');

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.engine('ejs', ejsMate);

app.listen(port, () => {
    console.log(`App is listeming on port ${port}`);
});

main().then(() => {
    console.log('Database connection successful');
}).catch((e) => {
    console.log('Exception while connnection to database: '.e);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/airbnbDB');
}


app.get("/", (req, res) => {
    res.status(200).send(
        'API is working correctly'
    );
});

app.get('/listings', async (req, res) => {

    const hotels = await listingModel.find();

    res.render('index', { hotels });
});

app.post('/listings', async (req, res) => {
    const data = req.body;
    console.log(`immage: ${data.image}`);
    const listingOne = new listingModel(
        {
            title: data.name,
            description: data.desc,
            price: data.price,
            imge: data.image,
            location: data.location,
            country: data.country
        }
    );
    await listingOne.save()
    res.redirect('/listings');
});

app.get('/listings/new', (req, res) => {
    res.render('new');
});

app.get('/listings/:id', async (req, res) => {

    const { id } = req.params;
    const hotel = await listingModel.findById(id);
    console.log(`${id} Hotel ${hotel}`);
    res.render('details', { hotel });
});

app.delete('/listings/:id', async (req, res) => {
    console.log('Delete Called');
    await listingModel.findByIdAndDelete(req.params.id);
    res.redirect('/listings');
});

app.get('/listings/:id/edit', async (req, res) => {

    const { id } = req.params;
    const hotel = await listingModel.findById(id);
    console.log(`${id} Hotel ${hotel}`);
    res.render('edit', { hotel });
});

app.put('/listings/:id', async (req, res) => {
    console.log('Edit Called');
    const data = req.body;
    await listingModel.findByIdAndUpdate(req.params.id, {
        title: data.name,
        description: data.desc,
        price: data.price,
        imge: data.image,
        location: data.location,
        country: data.country
    });
    res.redirect('/listings');
});
