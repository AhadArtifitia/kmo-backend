require('dotenv').config()
const S3 = require("aws-sdk/clients/s3")
const { S3Client, DeleteObjectCommand} = require('@aws-sdk/client-s3')
const fs = require('fs')
require("aws-sdk/lib/maintenance_mode_message").suppress = true;

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

//upload function
function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }
    return s3.upload(uploadParams).promise()
}

//download function
function getFile(key) {
    const downloadParams = {
        Bucket: bucketName,
        Key: key
    }
    return s3.getObject(downloadParams).createReadStream()
}

//delete function
function deleteFile(fileName) {
    const deleteParams = {
      Bucket: bucketName,
      Key: fileName, 
    };
    return s3Client.send(new DeleteObjectCommand(deleteParams));
};

module.exports = { uploadFile, getFile, deleteFile }