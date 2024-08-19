const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'ddzujeut6',
  api_key: '698646112743323',
  api_secret: 'tAZUzSdb6oeeSp6NDo_doT1Mx00'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'imageupload_DEV',
    format: async (req, file) => {
      const ext = file.mimetype.split('/')[1];
      return ext === 'png' || ext === 'jpg' || ext === 'jpeg' ? ext : 'jpg';
    },
    public_id: (req, file) => `listing_${Date.now()}`,
  },
});

module.exports = {
  cloudinary,
  storage
};
