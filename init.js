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

let listingsList=[
    { "title": "Cozy Cabin", "description": "Relaxing getaway.", "image": "cabin.jpg", "price": 1500, "location": "Lakewood", "country": "USA" },
    { "title": "Beachfront Villa", "description": "Luxurious living.", "image": "villa.jpg", "price": 8000, "location": "Miami", "country": "USA" },
    { "title": "City Apartment", "description": "Modern amenities.", "image": "apartment.jpg", "price": 2500, "location": "New York", "country": "USA" },
    { "title": "Country Cottage", "description": "Charming escape.", "image": "cottage.jpg", "price": 1200, "location": "Provence", "country": "France" },
    { "title": "Historic Mansion", "description": "Elegant living.", "image": "mansion.jpg", "price": 15000, "location": "London", "country": "UK" },
    { "title": "Family Home", "description": "Spacious and comfortable.", "image": "family_home.jpg", "price": 3000, "location": "Sydney", "country": "Australia" },
    { "title": "Artistic Loft", "description": "Creative space.", "image": "loft.jpg", "price": 4000, "location": "Berlin", "country": "Germany" },
    { "title": "Mountain Retreat", "description": "Peaceful escape.", "image": "mountain_retreat.jpg", "price": 1800, "location": "Swiss Alps", "country": "Switzerland" },
    { "title": "Oceanfront Bungalow", "description": "Tranquil views.", "image": "bungalow.jpg", "price": 2200, "location": "Bali", "country": "Indonesia" },
    { "title": "Townhouse", "description": "Stylish living.", "image": "townhouse.jpg", "price": 2800, "location": "Paris", "country": "France" },
    { "title": "Modern Villa", "description": "Sleek design.", "image": "modern_villa.jpg", "price": 7500, "location": "Ibiza", "country": "Spain" },
    { "title": "Cozy Cottage", "description": "Fireplace and garden.", "image": "cozy_cottage.jpg", "price": 1000, "location": "Amsterdam", "country": "Netherlands" },
    { "title": "Luxury Penthouse", "description": "City skyline views.", "image": "penthouse.jpg", "price": 12000, "location": "Dubai", "country": "UAE" },
    { "title": "Beach House", "description": "Relaxing by the sea.", "image": "beach_house.jpg", "price": 3500, "location": "California", "country": "USA" },
    { "title": "Log Cabin", "description": "Rustic charm.", "image": "log_cabin.jpg", "price": 1600, "location": "Canada", "country": "Canada" },
    { "title": "Treehouse", "description": "Unique experience.", "image": "treehouse.jpg", "price": 800, "location": "Costa Rica", "country": "Costa Rica" },
    { "title": "Farmhouse", "description": "Country living.", "image": "farmhouse.jpg", "price": 2000, "location": "Tuscany", "country": "Italy" },
    { "title": "Studio Apartment", "description": "City living.", "image": "studio_apartment.jpg", "price": 1800, "location": "Tokyo", "country": "Japan" },
    { "title": "Condo", "description": "Modern and convenient.", "image": "condo.jpg", "price": 2500, "location": "Chicago", "country": "USA" },
    { "title": "Luxury Suite", "description": "Five-star amenities.", "image": "luxury_suite.jpg", "price": 5000, "location": "Singapore", "country": "Singapore" },
    { "title": "Island Villa", "description": "Tropical paradise.", "image": "island_villa.jpg", "price": 6000, "location": "Maldives", "country": "Maldives" },
    { "title": "Historic Apartment", "description": "Charming details.", "image": "historic_apartment.jpg", "price": 2200, "location": "Rome", "country": "Italy" },
    { "title": "Mountain Cabin", "description": "Cozy retreat.", "image": "mountain_cabin.jpg", "price": 1400, "location": "Aspen", "country": "USA" },
    { "title": "Beachfront Condo", "description": "Ocean views.", "image": "beachfront_condo.jpg", "price": 4000, "location": "Florida", "country": "USA" },
    { "title": "Luxury Chalet", "description": "Skiing paradise.", "image": "chalet.jpg", "price": 8500, "location": "Switzerland", "country": "Switzerland" },
    { "title": "Modern House", "description": "Minimalist design.", "image": "modern_house.jpg", "price": 4500, "location": "Barcelona", "country": "Spain" },
    { "title": "Riverside Cottage", "description": "Peaceful location.", "image": "riverside_cottage.jpg", "price": 1200, "location": "Oxford", "country": "UK" },
    { "title": "Luxury Apartment", "description": "High-end amenities.", "image": "luxury_apartment.jpg", "price": 3800, "location": "Hong Kong", "country": "Hong Kong" },
    { "title": "Penthouse Suite", "description": "Exclusive living.", "image": "penthouse_suite.jpg", "price": 7000, "location": "New York", "country": "USA" },
    { "title": "Country Estate", "description": "Large property.", "image": "country_estate.jpg", "price": 10000, "location": "France", "country": "France" }
  ];

  listingModel.insertMany(listingsList).then(
    ()=>{
        console.log('Data inserted Successfully');
    }
  ).catch((e)=>{
    console.log('Exception: ',e);
  });


 