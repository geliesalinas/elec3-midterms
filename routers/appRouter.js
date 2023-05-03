const express = require("express");
const router = express.Router();
const mainController = require("../controllers/appController");
const multer = require('multer');

//image storing configuration
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images');
    },
    filename: function (req, file, callback) {
        console.log(file);
        callback(null, file.originalname);
    }
});

//middleware for image
var upload = multer({storage:storage}).single('img');

router.get("/", appController.getIndex);
router.get("/addMovie", appController.getAddMovie);
router.post("/addMovie", upload, appController.postAddMovie);
router.get("/EditMovie/:id", appController.getEditMovie);
router.post("/EditMovie/:id", upload, appController.postEditMovie);
router.get("/delete/:id", appController.deleteMovie);

module.exports = router;


