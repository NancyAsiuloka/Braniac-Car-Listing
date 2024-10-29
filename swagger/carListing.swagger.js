/**
 * @swagger
 * tags:
 *   name: Car Listings
 *   description: Endpoints for car listing management
 */

/**
 * @swagger
 * /car-listings:
 *   post:
 *     summary: Create a car listing
 *     tags: [Car Listings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               make:
 *                 type: string
 *                 description: Car make
 *               model:
 *                 type: string
 *                 description: Car model
 *               description:
 *                 type: string
 *                 description: Description of the car
 *               status:
 *                 type: string
 *                 description: Status of the car
 *               mileage:
 *                 type: integer
 *                 description: Car mileage
 *               price:
 *                 type: number
 *                 description: Price of the car
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Car images
 *     responses:
 *       201:
 *         description: Car listing created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 carListing:
 *                   $ref: '#/components/schemas/CarListing'
 *       403:
 *         description: Only sellers can add car listings
 *       400:
 *         description: Error parsing form data
 */

/**
 * @swagger
 * /car-listings/search:
 *   get:
 *     summary: Search car listings
 *     tags: [Car Listings]
 *     parameters:
 *       - in: query
 *         name: make
 *         schema:
 *           type: string
 *         description: Filter by car make
 *       - in: query
 *         name: model
 *         schema:
 *           type: string
 *         description: Filter by car model
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Filter by car year
 *       - in: query
 *         name: price
 *         schema:
 *           type: number
 *         description: Filter by price range
 *       - in: query
 *         name: mileage
 *         schema:
 *           type: integer
 *         description: Filter by mileage range
 *     responses:
 *       200:
 *         description: List of car listings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 results:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CarListingSummary'
 */

/**
 * @swagger
 * /car-listings/{carId}:
 *   get:
 *     summary: Get details of a specific car listing
 *     tags: [Car Listings]
 *     parameters:
 *       - in: path
 *         name: carId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the car listing
 *     responses:
 *       200:
 *         description: Car listing details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/CarListingDetails'
 *       404:
 *         description: Car listing not found
 */
