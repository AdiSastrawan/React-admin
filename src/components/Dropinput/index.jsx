import React, { useRef, useState } from "react";

function Dropinput({ setPayload, setIsDrag, isDrag, payload }) {
  const [previewImage, setPreviewImage] = useState(payload?.image ? `${import.meta.env.VITE_BASE_URL}/${payload?.image}` : "");
  const dropHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDrag(false);
    setPayload((prev) => {
      let tmp = { ...prev };
      tmp.image = e.dataTransfer.files[0];
      return tmp;
    });
    setPreviewImage(URL.createObjectURL(e.dataTransfer.files[0]));
  };
  const imageRef = useRef();
  return (
    <div
      className={`bg-background relative flex group justify-center py-2 cursor-pointer transition-colors hover:bg-secondary rounded-md`}
      onClick={() => {
        imageRef.current.click();
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDrag(true);
      }}
      onDrop={dropHandler}
    >
      <div className={`bg-primary flex items-center text-center justify-center ${isDrag ? "opacity-80 text-xl z-[9999]" : "opacity-0 text-base z-[-400]"} transition-all  w-full h-full absolute  text-white `}>Drop here</div>
      {previewImage == "" ? (
        <div className="flex h-60 text-center items-center">
          <h2 className="">Click or drop the image here</h2>
        </div>
      ) : (
        <img className="h-60 group-hover:scale-105 group-hover:shadow-xl transition-all object-contain" src={previewImage} alt={payload?.name} />
      )}
      <input
        hidden
        ref={imageRef}
        type="file"
        id="image"
        name="image"
        onChange={(e) => {
          setPreviewImage(() => {
            setPayload((prev) => {
              let tmp = { ...prev };
              tmp.image = e.target.files[0];
              return tmp;
            });
            return URL.createObjectURL(e.target.files[0]);
          });
        }}
        accept={"image/jpeg,image/png,image/gif"}
      />
    </div>
  );
}

export default Dropinput;
