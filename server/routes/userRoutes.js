const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/submit',userController.createProduct);
router.get('/submit',userController.getallProducts);
router.get('/product/:id',userController.getsingleproduct);
router.put('/product/:id',userController.updateproduct);
router.delete('/product/:id',userController.deleteproduct);



module.exports = router;