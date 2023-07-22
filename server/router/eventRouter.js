const express = require('express');
const router = express.Router();

const eventController = require("../controllers/eventController");
const homePageController = require('../controllers/homePageController');

router.get("/", homePageController); // Display home page
router.get("/events", eventController.getAllEvents);
router.post("/events", eventController.postEvent);
router.delete("/events/:id", eventController.deleteEvent);
router.put("/events/:id", eventController.updateEvent);
router.get("/events/user/:userId", eventController.getAllUserEvents);
router.get("/events/:id", eventController.getOneEvent);
router.get("/events/search/city/:city", eventController.searchByCity);

module.exports = router;




