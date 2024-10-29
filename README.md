User Signup Endpoint: POST /api/v1/signup Description: Allows new users to create an account.

User Login Endpoint: POST /api/v1/login Description: Authenticates a user and provides a token for future requests.

User Update Password Endpoint: PATCH /api/v1/update-password Description: Allow users to update their password.

Create Car Listing Endpoint: POST /api/v1/car-listings Description: Allows sellers to add a new car listing. Required Fields: make, model, year, mileage, price, availability Response: Success message and car listing ID.

Search and Filter Listings Endpoint: GET /api/v1/car-listings Description: Buyers can search and filter listings by make, model, year, price, and mileage. Response: List of cars matching criteria with basic details.

View Car Details Endpoint: GET /api/v1/car-listings/{id} Description: Returns full car details, images, and partially masked seller contact information.

Quick Start Install dependencies: npm install Start server: npm start Run tests: npm test
