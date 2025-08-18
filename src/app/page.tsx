"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState("");

  useEffect(() => {
    const img = imgRef.current;
    const canvas = canvasRef.current;

    if (!img || !canvas) return;

    const context = canvas.getContext("2d");

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context?.drawImage(img, 0, 0, img.width, img.height);
    };
  }, []);
  // pass the nuber as client.x and y gives you a number instead of saying client which is the mouse event, then you get x and y froom that
  const getColor = (x: number, y: number) => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    const location = canvas.getBoundingClientRect();
    const context = canvas.getContext("2d");

    const xPos = x - location.left;
    const yPos = y - location.top;
    const pixel = context?.getImageData(xPos, yPos, 1, 1).data;
    if (!pixel) return;
    const rgba = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${
      pixel[3] / 255
    })`;
    setColor(rgba);
  };
  return (
    <div>
      <img
        src="https://picsum.photos/300"
        ref={imgRef}
        height={200}
        width={200}
        alt=""
        onClick={(e) => getColor(e.clientX, e.clientY)}
      />
      <canvas className="hidden" ref={canvasRef} />
      {color ? <div className={`bg-[${color}] h-96 w-96`}></div> : ""}
    </div>
  );
}
