import { video } from "../models/videoSchema.js"
import cloudinary from "../config/cloudinary.js"

export const uploadVideo = async (req, res) => {

    try {
        console.log("file", req.file)
        console.log("body", req.body)


        if (!req.file) {
            return res.status(400).json({ message: 'No video file available!' });
        }

        const uploadOptions = {
            resource_type: "video",
            folder: "upload_mp4_videos",

        };

        let cloudinaryResult = await new Promise((resolve, reject) => {

            cloudinary.uploader.upload(
                `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,
                uploadOptions,
                (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                }
            );
        });


        // Save video metadata to MongoDB
        const newVideo = new video({
            title: req.body.title || 'Untitled Video',
            description: req.body.description || '',

            cloudinaryUrl: cloudinaryResult.secure_url,
            cloudinaryPublicId: cloudinaryResult.public_id,
            user: req.body.userId

        });

        const savedVideo = await newVideo.save();

        res.status(200).json({
            message: 'Video uploaded successfully!',
            video: savedVideo,

        });







    } catch (error) {
        console.log("upload error==>", error)
        return res.status(500).json({ message: error.message })
    }
}


export const getVideos = async (req, res) => {
    try {
        const title = req.headers.title || ""
        const query = { title: { $regex: title, $options: "i" }, user: req.userId }
        const allVideos = await video.find(query)

        return res.status(200).json({
            message: "All videos fetched successfully!",

            allVideos
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}


export const deleteVideo = async (req, res) => {
    try {
        const id = req.headers.vid;
        
      


        const videoToDelete = await video.findById(id);

        if (!videoToDelete) {
            return res.status(404).json({ message: 'Video not found!' });
        }

        console.log(55,videoToDelete.cloudinaryPublicId)


        if (videoToDelete.cloudinaryPublicId) {
            const cloudinaryResult = await cloudinary.uploader.destroy(videoToDelete.cloudinaryPublicId, {
                resource_type: 'video'
            });

            console.log("res",cloudinaryResult)
         

            if (cloudinaryResult.result !== 'ok' && cloudinaryResult.result !== 'not found') {
        
                console.warn(`Cloudinary deletion for public ID ${videoToDelete.cloudinaryPublicId} returned: ${cloudinaryResult.result}`);
            }
        }

    
        await video.findByIdAndDelete(id);

        res.status(200).json({ message: 'Video deleted successfully!'});

    } catch (error) {
        console.error('Error deleting video:', error);
        res.status(500).json({ message: 'Error deleting video.', error: error.message });
    }
}
    ;