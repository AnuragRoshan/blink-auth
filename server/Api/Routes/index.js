const router = require("express").Router();




const userController = require("../Controller/userApi");
const auth = require("../Middleware/auth");
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/src/Images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })




router.post("/login", userController.loginUser);
router.post("/register", upload.single("image"), userController.registerUser);
router.post("/logout", userController.logout);

router.get("/getUser", auth, userController.getUser);


module.exports = router;