import download from 'image-downloader';
import mime from "mime-types";

export const downloadImage = async (link, destination) => {
    const mimeType = mime.lookup(link);
    const contentType = mime.contentType(mimeType)
    const extension = mime.extension(contentType)
    
    const filename = `${Date.now()}.${extension}`;
    const fullPatch = `${destination}${filename}`

    try {
        const options = {
            url: link,
            dest: fullPatch, // will be saved to /path/to/dest/photo.jpg
        };
        await download.image(options);

        return filename;

    } catch (error) {
        console.error("Erro arquivo imageDownloader: ", error);
        throw error;
    }

}