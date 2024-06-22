import express from 'express';
import { getUserProfileController, loginController,
     logoutController, passwordResetController, registerController, udpatePasswordController, updateProfileController, 
     updateProfilePicController} from '../controllers/userController.js';
import { isAuth } from '../middleware/authMiddleware.js';
import { singleUpload } from '../middleware/multer.js';


// router object
const router = express.Router();

// routes

//registr
router.post('/register',registerController)

//login
router.post('/login',loginController)

//profile
router.get('/profile',isAuth,getUserProfileController)

//logout
router.get('/logout',isAuth,logoutController)

//update profle
router.put('/profile-update',isAuth,updateProfileController)

//update Password
router.put('/password-update',isAuth,udpatePasswordController)

//update profile pic
router.put('/update-picture',isAuth,singleUpload,updateProfilePicController)


// FORGOT PASSWORD
router.post("/reset-password", passwordResetController);

export default router
