export interface Flight {
    flightNumber: string;
    startTime: string;
    endTime: string;
    startLocation: string;
    endLocation: string;
    timeZone: string;
}

const MOCK_FLIGHTS: Flight[] = [
    {
        flightNumber: "BA123",
        startTime: "2023-11-20T10:00:00",
        endTime: "2023-11-20T12:00:00",
        startLocation: "London (LHR)",
        endLocation: "New York (JFK)",
        timeZone: "GMT",
    },
    {
        flightNumber: "AA456",
        startTime: "2023-11-21T14:30:00",
        endTime: "2023-11-21T17:45:00",
        startLocation: "New York (JFK)",
        endLocation: "Los Angeles (LAX)",
        timeZone: "EST",
    },
    {
        flightNumber: "JL789",
        startTime: "2023-11-22T09:15:00",
        endTime: "2023-11-22T22:30:00",
        startLocation: "Tokyo (HND)",
        endLocation: "San Francisco (SFO)",
        timeZone: "JST",
    },
    {
        flightNumber: "AF999",
        startTime: "2023-11-23T18:00:00",
        endTime: "2023-11-23T20:15:00",
        startLocation: "Paris (CDG)",
        endLocation: "Berlin (BER)",
        timeZone: "CET",
    },
];

export const searchFlight = async (flightNumber: string): Promise<Flight | null> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return MOCK_FLIGHTS.find((f) => f.flightNumber.toUpperCase() === flightNumber.toUpperCase()) || null;
};
