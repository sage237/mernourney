const listingModel = require("../models/listing.js");

module.exports.getAllListings = async (req, res) => {

    const hotels = await listingModel.find();

    res.render('index', { hotels });
};

module.exports.addListings = async (req, res) => {

    console.log(`DataFile ${JSON.stringify(req.file)}`);
    const data = req.body;

    if (!data) {
        throw new ExpressError(400, 'Data Are Required');
    }

    const listingOne = new listingModel(
        {
            title: data.name,
            description: data.desc,
            price: data.price,
            image: `${req.file.path}`,
            location: data.location,
            country: data.country,
            reviews: [],
            owner: req.user._id
        }
    );
    await listingOne.save();
    res.redirect('/listings');
};

module.exports.renderNewListingForm = (req, res) => {
    { res.render('new'); }
};
module.exports.renderDetailPage = async (req, res) => {

    const { id } = req.params;
    const hotel = await listingModel.findById(id).populate({ path: 'reviews', populate: { path: 'owner' } }).populate('owner');


    res.render('details', { hotel });
};

module.exports.deleteListing = async (req, res) => {

    {
        await listingModel.findByIdAndDelete(req.params.id);
        res.redirect('/listings');
    }
};

module.exports.renderEditForm = async (req, res) => {

    {
        const { id } = req.params;
        const hotel = await listingModel.findById(id);
        let image=hotel.image;
image=image.replace('upload','upload/w_100/q_35/f_auto');

        res.render('edit', { hotel,image });
    }
};

module.exports.editListings = async (req, res) => {
    if (!req.isAuthenticated()) { res.redirect("/login"); }


    else {
        const data = req.body;
        let listingg = await listingModel.findByIdAndUpdate(req.params.id, {
            title: data.name,
            description: data.desc,
            price: data.price,
            image: data.image,
            location: data.location,
            country: data.country
        });

        if (typeof req.file !== 'undefined') {
            console.log(`Here ${req.file.path}`);
            let fileName = `${req.file.path}`;
            listingg.image = `${req.file.path}`;
            await listingg.save();
        }
        res.redirect(`/listings/${req.params.id}`);
    }
};