import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const images = [
    path.resolve('./images/bathtub.jpg'),
    path.resolve('./images/faucet.jpg'),
    path.resolve('./images/shower.jpg'),
    path.resolve('./images/toilet.jpg'),
    path.resolve('./images/urinal.jpg'),
    path.resolve('./images/washbasin.jpg')
];

const upload = async () => {
    try {
        for (const image of images) {
            console.log('Uploading:', image);
            const result = await cloudinary.uploader.upload(image);
            console.log('Uploaded successfully:', result.secure_url);
        }
    } catch (error) {
        console.error('Error uploading images:', error);
    }
};

  upload();

//export default cloudinary; 