"use client";

import { useState } from "react";
import { fetchFlightData, Flight } from "../api";

interface FlightSearchFormProps {
    onSearchStart: () => void;
    onSearchComplete: (flight: Flight | null) => void;
}

export default function FlightSearchForm({
    onSearchStart,
    onSearchComplete,
}: FlightSearchFormProps) {
    const [flightNumber, setFlightNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!flightNumber.trim()) return;

        setIsLoading(true);
        setError(false);
        onSearchStart();

        try {
            const result = await fetchFlightData(flightNumber);
            onSearchComplete(result);
            if (!result) {
                setError(true);
            }
        } catch (err) {
            console.error(err);
            setError(true);
            onSearchComplete(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md relative z-10">
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center bg-white dark:bg-zinc-900 rounded-xl p-2 border border-zinc-200 dark:border-zinc-800 shadow-xl">
                    <div className="pl-4 text-zinc-400">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={flightNumber}
                        onChange={(e) => {
                            setFlightNumber(e.target.value);
                            if (error) setError(false);
                        }}
                        placeholder="Enter Flight Number (e.g., BA123)"
                        className="w-full bg-transparent border-none focus:ring-0 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 px-4 py-2 text-lg outline-none"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg px-6 py-2 font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px] flex justify-center"
                    >
                        {isLoading ? (
                            <svg
                                className="animate-spin h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        ) : (
                            "Search"
                        )}
                    </button>
                </div>
            </div>
            {error && (
                <div className="absolute top-full left-0 w-full mt-2 text-center text-red-500 text-sm font-medium animate-pulse">
                    Flight not found. Please try again.
                </div>
            )}
        </form>
    );
}
