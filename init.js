const mongoose = require("mongoose");


const listingModel = require('./models/listing');


main().then(() => {
  console.log('Database connection successful');
}).catch((e) => {
  console.log('Exception while connnection to database: '.e);
});
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/airbnbDB');
}

let listingsList = [
  { "title": "Cozy Cabin", "description": "Relaxing getaway.", "image": "images/417546686.jpg", "price": 1500, "location": "Lakewood", "country": "USA" },
  { "title": "Beachfront Villa", "description": "Luxurious living.", "image": "images/download.jpeg", "price": 8000, "location": "Miami", "country": "USA" },
  { "title": "City Apartment", "description": "Modern amenities.", "image": "images/images (1).jpeg", "price": 2500, "location": "New York", "country": "USA" },
  { "title": "Country Cottage", "description": "Charming escape.", "image": "images/images (2).jpeg", "price": 1200, "location": "Provence", "country": "France" },
  { "title": "Historic Mansion", "description": "Elegant living.", "image": "images/images.jpeg", "price": 15000, "location": "London", "country": "UK" },
  { "title": "Family Home", "description": "Spacious and comfortable.", "image": "images/IMG-20210817-WA0015-1024x683.jpg", "price": 3000, "location": "Sydney", "country": "Australia" },
  { "title": "Artistic Loft", "description": "Creative space.", "image": "images/origin.jpg", "price": 4000, "location": "Berlin", "country": "Germany" },

  { "title": "Cozy Cabin", "description": "Relaxing getaway.", "image": "images/417546686.jpg", "price": 1500, "location": "Lakewood", "country": "USA" },
  { "title": "Beachfront Villa", "description": "Luxurious living.", "image": "images/download.jpeg", "price": 8000, "location": "Miami", "country": "USA" },
  { "title": "City Apartment", "description": "Modern amenities.", "image": "images/images (1).jpeg", "price": 2500, "location": "New York", "country": "USA" },
  { "title": "Country Cottage", "description": "Charming escape.", "image": "images/images (2).jpeg", "price": 1200, "location": "Provence", "country": "France" },
  { "title": "Historic Mansion", "description": "Elegant living.", "image": "images/images.jpeg", "price": 15000, "location": "London", "country": "UK" },
  { "title": "Family Home", "description": "Spacious and comfortable.", "image": "images/IMG-20210817-WA0015-1024x683.jpg", "price": 3000, "location": "Sydney", "country": "Australia" },
  { "title": "Artistic Loft", "description": "Creative space.", "image": "images/origin.jpg", "price": 4000, "location": "Berlin", "country": "Germany" },

  { "title": "Cozy Cabin", "description": "Relaxing getaway.", "image": "images/417546686.jpg", "price": 1500, "location": "Lakewood", "country": "USA" },
  { "title": "Beachfront Villa", "description": "Luxurious living.", "image": "images/download.jpeg", "price": 8000, "location": "Miami", "country": "USA" },
  { "title": "City Apartment", "description": "Modern amenities.", "image": "images/images (1).jpeg", "price": 2500, "location": "New York", "country": "USA" },
  { "title": "Country Cottage", "description": "Charming escape.", "image": "images/images (2).jpeg", "price": 1200, "location": "Provence", "country": "France" },
  { "title": "Historic Mansion", "description": "Elegant living.", "image": "images/images.jpeg", "price": 15000, "location": "London", "country": "UK" },
  { "title": "Family Home", "description": "Spacious and comfortable.", "image": "images/IMG-20210817-WA0015-1024x683.jpg", "price": 3000, "location": "Sydney", "country": "Australia" },
  { "title": "Artistic Loft", "description": "Creative space.", "image": "images/origin.jpg", "price": 4000, "location": "Berlin", "country": "Germany" },

  { "title": "Cozy Cabin", "description": "Relaxing getaway.", "image": "images/417546686.jpg", "price": 1500, "location": "Lakewood", "country": "USA" },
  { "title": "Beachfront Villa", "description": "Luxurious living.", "image": "images/download.jpeg", "price": 8000, "location": "Miami", "country": "USA" },
  { "title": "City Apartment", "description": "Modern amenities.", "image": "images/images (1).jpeg", "price": 2500, "location": "New York", "country": "USA" },
  { "title": "Country Cottage", "description": "Charming escape.", "image": "images/images (2).jpeg", "price": 1200, "location": "Provence", "country": "France" },
  { "title": "Historic Mansion", "description": "Elegant living.", "image": "images/images.jpeg", "price": 15000, "location": "London", "country": "UK" },
  { "title": "Family Home", "description": "Spacious and comfortable.", "image": "images/IMG-20210817-WA0015-1024x683.jpg", "price": 3000, "location": "Sydney", "country": "Australia" },
  { "title": "Artistic Loft", "description": "Creative space.", "image": "images/origin.jpg", "price": 4000, "location": "Berlin", "country": "Germany" },
];

listingModel.insertMany(listingsList).then(
  () => {
    console.log('Data inserted Successfully');
  }
).catch((e) => {
  console.log('Exception: ', e);
});


