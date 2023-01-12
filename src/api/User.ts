import userController from '../controller/userController';
import { Router } from 'express';
import { body } from 'express-validator';
import { verifyToken, isModerator } from '../middlewares/authJWT'
import {v2 as cloudinary} from "cloudinary";
import multer from 'multer';
import User from '../model/User';


const router = Router();
const config = { 
    cloud_name: 'dl8v2gowj', 
    api_key: '135423248915825', 
    api_secret: 'Vpk5UKPssbOvhkdVe-rIEUs8usI' 
  };

cloudinary.config(config) 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage })

router.post('/update-image/:id', upload.single('file'), async (req: any, res: any) => {
    const {id}= req.params
    const {originalname} = req.body

    await User.findByIdAndUpdate( id, {avatar: originalname})
    
    cloudinary.uploader.upload(`./uploads/${originalname}`, (error, result)=>{
        console.log('imagen subida')
    });

    return res.status(200).json({message: "imagen subida"})
})
router.post('/register', body('password').isLength({ min: 6 }), body('email').isEmail(), userController.register);
router.post('/login', userController.login);
router.put('/update/:id', userController.update);

router.get('/profile/:id', userController.profile);
//router.post('/:id/avatar', userController.addAvatar);
router.get('/', userController.getall);
//router.get('/', [verifyToken, isModerator], userController.getall);

router.delete('/:id', userController.deleteUser);
//router.delete('/:id',  [verifyToken, isOwner], userController.deleteUser);

//router.put('/addavatar', userController.addAvatar);
router.put('/addserie/:idUser/:idSerie', userController.addSerie);
router.put('/delserie/:idUser/:idSerie', userController.delSerie);
export default router;