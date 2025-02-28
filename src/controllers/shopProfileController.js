const shopProfileModel = require('../models/shopProfileModel');


// update shop profile
const updateProfile = async (req, res) => {
    try {
        const { GSTIN, PAN, address, city, state, country, pincode, alternative_phone, profile_image, shop_images } = req.body;

        var obj = {
            shop_id: req.user.id,
            shop_details: {
                GSTIN: GSTIN,
                PAN: PAN,
                alternative_phone: alternative_phone,
                profile_image: profile_image,
                shop_images: shop_images
            },
            address_details: {
                address: address,
                city: city,
                state: state,
                country: country,
                pincode: pincode,
            }
        }
        const shopProfile = new shopProfileModel(obj);

        //await shopProfile.save();
        shopProfile.save().then(result => {
            res.status(200).json({
                success: true,
                msg: "Shop profile registration successful!",
                data: result
            })

        }).catch(err => {
            console.log(err);
            res.status(400).json({
                success: false,
                msg: "Unable to submit your request. We encountered a glitch. Please try again.",
                //error: err
            })
        })

    } catch (err) {
        res.status(400).json({
            success: false,
            msg: "We are experiencing a technical glitch. Please try again later.",
            //error: err
        })
    }
}


// get shop profile details
const getProfile = async (req, res) => {
    try {
        const shopProfile = await shopProfileModel.findOne({ shop_id: req.user.id });

        if (shopProfile) {
            res.status(200).json({
                success: true,
                msg: "Shop profile details found!",
                data: shopProfile
            })
        }

    } catch (err) {
        res.status(400).json({
            success: false,
            msg: "We are experiencing a technical glitch. Please try again later.",
            //error: err
        })
    }

}

module.exports = {
    updateProfile,
    getProfile
};