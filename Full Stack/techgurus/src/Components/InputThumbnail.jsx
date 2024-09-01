import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Player } from "video-react";

import { FiUploadCloud } from "react-icons/fi";
import "video-react/dist/video-react.css";

const InputThumbnail = ({ register, isVideo = false, label, setThumbnail }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !isVideo
      ? {
          "image/*": [".jpeg", ".jpg", ".png"],
        }
      : {
          "video/*": [".mp4"],
        },
    onDrop,
  });

  function onDrop(acceptedFile) {
    const file = acceptedFile[0];
    console.log("I am draging", file);
    if (file) {
      changePreview(file);
      setThumbnail(file);
    }
  }

  function changePreview(fileData) {
    console.log(" Preview data ", fileData);
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    console.log(previewImage);
  }

  return (
    <div className="mb-2 mt-2 flex flex-col gap-3 items-start w-full relative">
      <div className="text-[#F1F2FF] text-md ml-1">
        {label} <sup className="text-[#EF476F] text-md ">*</sup>
      </div>
      <div
        className={` ${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[220px]  w-full cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >
        {previewImage ? (
          <div className="">
            {!isVideo ? (
              <img
                src={`${previewImage}`}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <Player aspectRatio="16:9" playsInline src={previewImage} />
            )}

            <button
              type="button"
              onClick={() => {
                setPreviewImage("");
                setThumbnail(null);
              }}
              className="mt-3 text-richblack-400 underline"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="mb-2 mt-2 flex flex-col gap-3 items-start w-full">
            <div
              className="flex w-full flex-col items-center p-6 "
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <div className="aspect-square rounded-full bg-[#171717] p-5 ">
                <FiUploadCloud className="text-2xl text-[#FFD60A] " />
              </div>

              <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
                Drag and drop an {!isVideo ? "image" : "video"}, or click to{" "}
                <span className="font-semibold text-yellow-50">Browse</span> a
                file
              </p>
              <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
                <li>Aspect ratio 16:9</li>
                <li>Recommended size 1024x576</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputThumbnail;
