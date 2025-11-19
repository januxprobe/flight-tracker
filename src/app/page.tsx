"use client";

import { useState } from "react";
import FlightSearchForm from "@/components/FlightSearchForm";
import FlightResultCard from "@/components/FlightResultCard";
import { Flight } from "@/api";

import Image from "next/image";

export default function Home() {
  const [flight, setFlight] = useState<Flight | null>(null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24 bg-zinc-50 dark:bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="z-10 flex flex-col items-center w-full max-w-3xl">
        <div className="mb-8 relative w-32 h-32 sm:w-40 sm:h-40">
          <Image
            src="/logo.png"
            alt="Flight Tracker Logo"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 text-center">
          Flight Tracker
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-12 text-center text-lg">
          Track your flight status in real-time
        </p>

        <FlightSearchForm
          onSearchStart={() => setFlight(null)}
          onSearchComplete={setFlight}
        />

        {flight && <FlightResultCard flight={flight} />}
      </div>
    </main>
  );
}
