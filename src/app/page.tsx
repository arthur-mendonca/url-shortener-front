"use client";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import axiosRequest, { ShortUrl } from "./axios";

const baseURL = "http://localhost:5000";

export default function Home() {
  const [shortenedUrl, setShortenedUrl] = useState<ShortUrl | null>(null);
  const [showUrl, setShowUrl] = useState(false);

  useEffect(() => {
    if (shortenedUrl) {
      setShowUrl(true);
    }
  }, [shortenedUrl]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setShowUrl(false);
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const urlInput = form.elements.namedItem("url") as HTMLInputElement;

    const response = (await axiosRequest()).post(baseURL, {
      full: urlInput.value,
    });

    setShortenedUrl(await response);

    setTimeout(() => {
      setShowUrl(true);
    }, 100);
  };

  return (
    <div className="min-h-screen relative font-[family-name:var(--font-geist-sans)]">
      <header className="container mx-auto">
        <nav className="">
          <div className="flex justify-between items-center p-4">
            <Link className="" href="/">
              <p className="text-lg">URL Shortener</p>
            </Link>

            <button
              id="toggle-dark-mode"
              className="border p-4 rounded-lg transform ease-in-out transition duration-150 ease-in-out hover:bg-zinc-600">
              Toggle Dark Mode
            </button>
          </div>
        </nav>
      </header>

      <main className="container bg-zinc-900 rounded-lg p-8 mx-auto">
        <div className="px-40">
          <div className="flex justify-between items-center ">
            <form
              onSubmit={(e) => onSubmit(e)}
              className="flex gap-4 items-center">
              <button className="border px-4 py-2 rounded-lg transform ease-in-out transition duration-150  bg-sky-700 hover:bg-sky-800">
                <p>Shorten URL now</p>
              </button>

              <div className="rounded-lg border-2 text-black">
                <input type="url" name="url" required className="px-4 py-2" />
              </div>
            </form>

            <div>
              <h1 className="text-4xl font-bold">URL Shortener</h1>
              <p className="text-lg">
                Shorten your long URLs to make them easier to share.
              </p>
            </div>
          </div>

          {shortenedUrl && (
            <div
              className={`mt-8  text-center transition-opacity duration-1000 ease-in-out ${
                showUrl ? "opacity-100 " : "opacity-0 "
              }`}>
              <p className="text-lg">Shortened URL:</p>
              <Link
                rel="noopener noreferrer"
                target="_blank"
                href={`https://url-shortener-bfyh.onrender.com/${shortenedUrl?.short}`}
                className="text-blue-500">
                {`${shortenedUrl?.short}`}
              </Link>
            </div>
          )}
        </div>
      </main>

      <footer className="h-14 bg-zinc-900 absolute bottom-0 w-full">
        <div className="container w-full h-14 mx-auto"></div>
      </footer>
    </div>
  );
}
