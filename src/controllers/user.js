const User = require("../Models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");
const { getSession } = require("../lib/token");
const QueryFilters = require("../utils/queryFilter");
const CarListing = require("../Models/carListingModel");
const { IncomingForm } = require("formidable");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

class UserController {

  // CREATE CAR LISTINGS
  createCarListing = catchAsync(async (req, res, next) => {
    const { user_id } = getSession(req);
    const user = await User.findById(user_id);

    if (!user || user.role !== "seller") {
      return res
        .status(403)
        .json({ message: "Only sellers can add car listings" });
    }

    const form = new IncomingForm({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) return next(new AppError("Error parsing form data", 400));

      const { make, model, description, status, mileage, price } = fields;
      const { images } = files;

      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
        secure: true,
      });

      try {
        const carData = {
          make: Array.isArray(make) ? make[0] : make,
          model: Array.isArray(model) ? model[0] : model,
          description: Array.isArray(description)
            ? description[0]
            : description,
          status: Array.isArray(status) ? status[0] : status,
          mileage: Array.isArray(mileage)
            ? parseInt(mileage[0])
            : parseInt(mileage),
          price: Array.isArray(price)
            ? parseFloat(price[0])
            : parseFloat(price),
          userId: user_id,
        };

        let allImageUrl = [];

        if (images) {
          const imageFiles = Array.isArray(images) ? images : [images];
          for (let image of imageFiles) {
            const filePath = image.filepath;
            if (filePath) {
              const fileStream = fs.createReadStream(filePath);
              await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                  { folder: "products" },
                  (error, uploadResult) => {
                    if (error) {
                      console.error("Cloudinary upload error:", error);
                      reject(new AppError("Error uploading images", 500));
                    } else {
                      allImageUrl.push(uploadResult.url);
                      resolve();
                    }
                  }
                );
                fileStream.pipe(uploadStream);
              });
            }
          }
        }

        carData.images = allImageUrl;

        const carListing = await CarListing.create(carData);

        res.status(201).json({
          message: "Car listing created successfully",
          carListing,
        });
      } catch (uploadError) {
        next(new AppError("Error uploading images", 500));
      }
    });
  });

  // SEARCH CAR LISTINGS
  searchCarListings = catchAsync(async (req, res, next) => {
    const { user_id } = getSession(req);

    let query = CarListing.find();

    const filters = new QueryFilters(query, req.query)
      .filterByMake()
      .filterByModel()
      .filterByYearRange()
      .filterByPriceRange()
      .filterByMileageRange()
      .sortResults();

    const carListings = await filters.execute();

    res.status(200).json({
      status: "success",
      results: carListings.length,
      data: carListings.map((car) => ({
        userId: user_id,
        _id: car.id,
        make: car.make,
        model: car.model,
        year: car.year,
        price: car.price,
        mileage: car.mileage,
        thumbnail: car.images[0],
      })),
    });
  });

  // GET CAR LISTING DETAILS
  getCarListingDetails = catchAsync(async (req, res, next) => {
    const { user_id } = getSession(req);
    const { carId } = req.params;

    const carListing = await CarListing.findById(carId).populate({
      path: "userId",
      select: "name email phone",
    });

    if (!carListing) {
      return next(new AppError("Car listing not found", 404));
    }

    const carDetails = {
      _id: carListing.id,
      userId: user_id,
      make: carListing.make,
      model: carListing.model,
      description: carListing.description,
      price: carListing.price,
      mileage: carListing.mileage,
      year: carListing.year,
      status: carListing.status,
      images: carListing.images,
      seller: {
        name: carListing.userId.name,
        email: carListing.userId.email,
        phone: carListing.userId.phone,
      },
    };

    res.status(200).json({
      status: "success",
      data: carDetails,
    });
  });
}

module.exports = new UserController();
