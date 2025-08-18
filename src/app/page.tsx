"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [url, setUrl] = useState("");
  const [color, setColor] = useState("");
  const [rgba, setRgba] = useState("");

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
  }, [color, url]);
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const blob = URL.createObjectURL(file);
      setUrl(blob);
    }
  };
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
    setRgba(String("" + pixel[0] + ", " + pixel[1] + ", " + pixel[2]));
  };

  return (
    <main className="flex gap-5">
      {!url ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="bg-gray-100 w-[480px] rounded-md flex flex-col items-center justify-center text-4xl text-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            className="w-40 h-40"
            fill="currentColor"
          >
            <path d="M352 96C352 78.3 337.7 64 320 64C302.3 64 288 78.3 288 96L288 306.7L246.6 265.3C234.1 252.8 213.8 252.8 201.3 265.3C188.8 277.8 188.8 298.1 201.3 310.6L297.3 406.6C309.8 419.1 330.1 419.1 342.6 406.6L438.6 310.6C451.1 298.1 451.1 277.8 438.6 265.3C426.1 252.8 405.8 252.8 393.3 265.3L352 306.7L352 96zM160 384C124.7 384 96 412.7 96 448L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 448C544 412.7 515.3 384 480 384L433.1 384L376.5 440.6C345.3 471.8 294.6 471.8 263.4 440.6L206.9 384L160 384zM464 440C477.3 440 488 450.7 488 464C488 477.3 477.3 488 464 488C450.7 488 440 477.3 440 464C440 450.7 450.7 440 464 440z" />
          </svg>
          Image here
        </div>
      ) : (
        <img
          src={url}
          ref={imgRef}
          height={200}
          width={200}
          crossOrigin="anonymous"
          className="hidden"
          alt=""
          onClick={(e) => getColor(e.clientX, e.clientY)}
        />
      )}

      <canvas
        ref={canvasRef}
        className={url ? "cursor-crosshair rounded-md" : "hidden"}
        height={480}
        width={480}
        onClick={(e) => getColor(e.clientX, e.clientY)}
      />
      <section>
        <div
          className="h-96 w-full rounded-md"
          style={
            color
              ? { backgroundColor: `#${color}` }
              : { backgroundColor: "#111" }
          }
        ></div>
        <div className="flex items-center justify-start gap-3">
          <p className="font-bold mt-5">Hex Color: #{color}</p>
          <p className="font-bold mt-5">RGB Color: rgb({rgba})</p>
        </div>
      </section>
    </main>
  );
}
