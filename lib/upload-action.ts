"use server";

import cloudinary from "./cloudinary";

export async function uploadImage(file: File) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "indialand_legal_docs",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            resolve(result?.secure_url);
          }
        }
      ).end(buffer);
    });
  } catch (error) {
    console.error("Upload process error:", error);
    throw new Error("Failed to upload to Cloudinary");
  }
}
