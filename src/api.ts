export interface Flight {
    flight_date: string;
    flight_status: string;
    departure: {
        airport: string;
        timezone: string;
        iata: string;
        scheduled: string;
        // Add other fields as needed
    };
    arrival: {
        airport: string;
        timezone: string;
        iata: string;
        scheduled: string;
        // Add other fields as needed
    };
    airline: {
        name: string;
        iata: string;
    };
    flight: {
        number: string;
        iata: string;
    };
}

export interface ApiResponse {
    data: Flight[];
}

const API_KEY = process.env.NEXT_PUBLIC_AVIATION_STACK_API_KEY;
const BASE_URL = 'http://api.aviationstack.com/v1/flights';

export async function fetchFlightData(flightIata: string): Promise<Flight | null> {
    try {
        const response = await fetch(`${BASE_URL}?access_key=${API_KEY}&flight_iata=${flightIata}&limit=1`);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        if (data.data && data.data.length > 0) {
            return data.data[0];
        }

        return null;
    } catch (error) {
        console.error('Error fetching flight data:', error);
        throw error;
    }
}
