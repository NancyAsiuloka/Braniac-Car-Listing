/**
 * @swagger
 * components:
 *   schemas:
 *     CarListing:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The car listing ID
 *         make:
 *           type: string
 *           description: Car make
 *         model:
 *           type: string
 *           description: Car model
 *         description:
 *           type: string
 *           description: Description of the car
 *         status:
 *           type: string
 *           description: Status of the car
 *         mileage:
 *           type: integer
 *           description: Car mileage
 *         price:
 *           type: number
 *           description: Price of the car
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: URLs of car images
 *     CarListingSummary:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The car listing ID
 *         make:
 *           type: string
 *           description: Car make
 *         model:
 *           type: string
 *           description: Car model
 *         price:
 *           type: number
 *           description: Price of the car
 *         mileage:
 *           type: integer
 *           description: Car mileage
 *         thumbnail:
 *           type: string
 *           description: URL of the car's thumbnail image
 *     CarListingDetails:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The car listing ID
 *         make:
 *           type: string
 *           description: Car make
 *         model:
 *           type: string
 *           description: Car model
 *         description:
 *           type: string
 *           description: Description of the car
 *         price:
 *           type: number
 *           description: Price of the car
 *         mileage:
 *           type: integer
 *           description: Car mileage
 *         status:
 *           type: string
 *           description: Status of the car
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: URLs of car images
 *         seller:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             phone:
 *               type: string
 */

