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

    const location = canvas.getBoundingClientRect();

    const context = canvas.getContext("2d");

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context?.drawImage(img, 0, 0, img.width, img.height);
    };
  }, [color]);

  const rgbaToHex = (r: number, g: number, b: number) => {
    const toHex = (n: number) => {
      return n.toString(16).length === 1
        ? "0" + n.toString(16)
        : n.toString(16);
    };

    return toHex(r) + toHex(g) + toHex(b);
  };
  // pass the nuber as client.x and y gives you a number instead of saying client which is the mouse event, then you get x and y froom that
  const getColor = (x: number, y: number) => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    const location = canvas.getBoundingClientRect();
    const context = canvas.getContext("2d");

    // basically, the canvas itself is smaller than when we use flexbox, which scales it up/down
    // so, we see how much it was scaled by and scale the user input down/up the same amount
    // because, the # of pixels they are moving / mouse location is relative to the size of the image as how we calculate it
    // so we scale it down
    const scaleX = canvas.width / location.width;
    const scaleY = canvas.height / location.height;
    const xPos = (x - location.left) * scaleX;
    const yPos = (y - location.top) * scaleY;
    console.log(location.left, location.top, x, y);
    const pixel = context?.getImageData(xPos, yPos, 1, 1).data;
    if (!pixel) return;

    setColor(rgbaToHex(pixel[0], pixel[1], pixel[2]));
  };

  return (
    <main className="flex gap-5">
      <img
        src="https://picsum.photos/300"
        ref={imgRef}
        height={200}
        width={200}
        crossOrigin="anonymous"
        className="hidden"
        alt=""
        onClick={(e) => getColor(e.clientX, e.clientY)}
      />
      <canvas
        ref={canvasRef}
        className="cursor-crosshair rounded-md"
        onClick={(e) => getColor(e.clientX, e.clientY)}
      />
      {color ? (
        <section>
          <div
            className="h-96 w-96 rounded-md"
            style={{ backgroundColor: `#${color}` }}
          ></div>
          <p className="font-bold mt-5">Hex Color: #{color}</p>
        </section>
      ) : (
        ""
      )}
    </main>
  );
}
