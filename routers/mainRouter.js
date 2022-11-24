const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
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

router.get("/", mainController.getIndex);
router.get("/addMovie", mainController.getAddMovie);
router.post("/addMovie", upload, mainController.postAddMovie);
router.get("/EditMovie/:id", mainController.getEditMovie);
router.post("/EditMovie/:id", upload, mainController.postEditMovie);
router.get("/delete/:id", mainController.deleteMovie);

module.exports = router;


