import { CloseIcon } from "@chakra-ui/icons"
import { AlertIcon } from "@chakra-ui/react"
import React, { useRef, useState } from "react"

function Dropinput({ setPayload, setIsDrag, isDrag, payload }) {
  const [previewImage, setPreviewImage] = useState(
    payload.image.map((img) => {
      if (img) {
        return import.meta.env.VITE_BASE_URL + "/" + img
      }
      return []
    })
  )
  console.log(previewImage)
  const [msg, setMsg] = useState("")
  const dropHandler = (e) => {
    console.log(e.dataTransfer.files[0])
    if (!e.dataTransfer.files[0]) {
      return 0
    }
    e.preventDefault()
    e.stopPropagation()
    setIsDrag(false)
    if (payload?.image.length < 5) {
      setPayload((prev) => {
        let tmp = { ...prev }
        tmp.image.push(e.dataTransfer.files[0])
        let images = [...new Set([...tmp.image])]
        tmp.image = [...images]
        return tmp
      })

      setPreviewImage((prev) => {
        let tmp = [...prev]

        tmp.push(URL.createObjectURL(e.dataTransfer.files[0]))

        return tmp
      })
    } else {
      setMsg("Only 5 Pictures allowed!!")
    }
  }
  const imageRef = useRef()
  return (
    <>
      <div
        className={`bg-background relative flex justify-center py-2 cursor-pointer z-[1] transition-colors hover:bg-secondary rounded-md`}
        onClick={() => {
          imageRef.current.click()
        }}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDrag(true)
        }}
        onDrop={dropHandler}
      >
        <div className={`bg-primary flex items-center text-center justify-center ${isDrag ? "opacity-80 text-xl z-[9999]" : "opacity-0 text-base z-[-400]"} transition-all  w-full h-full absolute  text-white `}>Drop here</div>
        {previewImage.length < 1 ? (
          <div className="flex h-60 text-center items-center">
            <h2 className="">Click or drop the image here</h2>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1  z-[9999999]">
            {previewImage.map((image, i) => {
              return (
                <div key={i} className="relative bg-primary/50 p-2  z-[9999999]">
                  <div
                    onClick={() => {
                      setPreviewImage((prev) => {
                        let tmp = [...prev]
                        tmp.splice(i, 1)
                        setPayload((prev) => {
                          let tmp = { ...prev }
                          tmp.image.splice(i, 1)
                          return tmp
                        })
                        return tmp
                      })
                    }}
                    className="absolute rounded-full h-6 w-6 bg-gray-600 top-1 flex justify-center items-center p-2  right-1 z-[9999999]"
                  >
                    <CloseIcon boxSize={3} />
                  </div>{" "}
                  <img className="h-60 hover:scale-105 hover:shadow-xl transition-all object-contain" src={image} alt={payload?.name} />
                </div>
              )
            })}
          </div>
        )}
        <input
          hidden
          ref={imageRef}
          type="file"
          id="image"
          name="image"
          onChange={(e) => {
            if (!e.target.files[0]) {
              return 0
            }
            if (payload?.image.length < 5) {
              setPreviewImage((prev) => {
                let tmp = [...prev]
                setPayload((prev) => {
                  let tmp = { ...prev }
                  tmp.image.push(e.target.files[0])
                  let images = [...new Set([...tmp.image])]
                  tmp.image = [...images]
                  return tmp
                })
                tmp.push(URL.createObjectURL(e.target.files[0]))
                return tmp
              })
            }
          }}
          accept={"image/jpeg,image/png,image/gif"}
        />
      </div>
      {msg != "" && (
        <div className="bg-red-600 text-white text-base px-2">
          <AlertIcon />
          <p> {msg}</p>
        </div>
      )}
    </>
  )
}

export default Dropinput
