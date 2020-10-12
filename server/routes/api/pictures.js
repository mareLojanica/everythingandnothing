const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../../config/authMiddlware');
const Picture = require('../../models/Picture');
const MIME_TYPE_MAP = {
						"image/png": "png",
						"image/jpeg": "jpg",
						"image/jpg": "jpg",
					};
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const isValid = MIME_TYPE_MAP[file.mimetype];
		let error = new Error("invalid mime type");
		if (isValid) {
			error = null;
		}
		cb(error, "./public");
	},
	filename: (req, file, cb) => {
		const name = file.originalname.toLowerCase().split(" ").join("-");
		const ext = MIME_TYPE_MAP[file.mimetype];
		cb(null, name + "-" + Date.now() + "." + ext);
	},
});
const upload = multer({ storage: storage });
router.post('/upload' , upload.array("image", 100),auth,  (req,res)=>{
	const url = req.protocol + "://" + req.get("host");
	const path = "/public";
	const files = req.files;
	for(let file of files){
		const picture = new Picture({
			path: `${url}/public/${file.filename}`,
			user : req.body.id,
		});
		picture.save().then((createdPost) => {
			res.status(201).json({
			message: "Post added successfully",
			});
		});
	}
});
router.get('/getusergalery/:id',auth, (req, res) => {
	const id = req.params.id;
	Picture.find({user : id}).sort({date: -1}).then(pictures =>{
		res.json({pictures: pictures})
	}).catch(err => console.log(err));
})
router.get('/getimg/:id',auth, (req, res) => {
	const id = req.params.id;
	const url = req.protocol + "://" + req.get("host");
	const path = "/public";
	Picture.findOne({_id : id}).then(picture =>{
		try {
			const filePath = `${process.mainModule.path}/public/${picture.path.split('public')[1]}`;
			if(fs.existsSync(filePath)) {
				res.download(filePath, 'img.jpg');
			} else {
				res.json({error : 'img does not exists on server'});
			}
		} catch (err) {
			console.error(err);
		}
		
	}).catch(err => console.log(err));
})
router.post('/deleteimg/:id' ,auth, async (req, res) => {
	const id = req.params.id;
	const url = req.protocol + "://" + req.get("host");
	const path = "/public";
	await Picture.findOneAndDelete({_id : id});
	const filePath = `${process.mainModule.path}/public/${req.body.path.split('public')[1]}`;
	try {
		if(fs.existsSync(filePath)) {
			res.send({success : true});
			fs.unlinkSync(filePath);
		} else {
			console.log('The file does not exist.');
		}
	} catch (err) {
		console.error(err);
	}
})
router.get('/getothersgalery/:id',auth, async(req, res) => {
	const id = req.params.id;
	let pictures = await Picture.find({user : { $ne : id}});
	res.json({pictures: pictures});
})
module.exports = router;