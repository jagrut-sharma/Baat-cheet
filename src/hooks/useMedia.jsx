import { toast } from "react-toastify";
import { toastConfig } from "../utils/constants";

function useMedia() {
  const uploadMedia = async (media, setUserDetails) => {
    const mediaType = media.type.split("/")[0];
    if (mediaType === "video" && Math.round(media.size / 1024000) > 10)
      toast.error("Video size should be less than 10MB", toastConfig);
    else if (Math.round(media.size / 1024000) > 4)
      toast.error("Image size should be less than 4MB", toastConfig);
    else {
      const data = new FormData();
      data.append("file", media);
      data.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );
      data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
      data.append("folder", "user-profile-pics");
      const requestOptions = {
        method: "POST",
        body: data,
      };
      const url =
        mediaType === "video"
          ? `https://api.cloudinary.com/v1_1/${
              import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
            }/video/upload`
          : `https://api.cloudinary.com/v1_1/${
              import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
            }/image/upload`;
      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((json) => {
          setUserDetails((prev) => ({ ...prev, pic: json.url }));
          console.log(json.url);
          return [json.secure_url];
        })
        .catch((error) => {
          console.error(error);
          toast.error("Media Uploading failed", toastConfig);
        });
    }
  };

  return { uploadMedia };
}

export { useMedia };
