import { Flight } from '../api';

interface FlightResultCardProps {
    flight: Flight;
}

export default function FlightResultCard({ flight }: FlightResultCardProps) {
    // Format date helper
    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Helper to format date for Google Calendar (YYYYMMDDTHHMMSSZ)
    const formatGoogleCalendarDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
    };

    const generateGoogleCalendarUrl = () => {
        const title = `Flight ${flight.airline.name} ${flight.flight.iata}`;
        const start = formatGoogleCalendarDate(flight.departure.scheduled);
        const end = formatGoogleCalendarDate(flight.arrival.scheduled);
        const details = `Flight from ${flight.departure.airport} (${flight.departure.iata}) to ${flight.arrival.airport} (${flight.arrival.iata}). Status: ${flight.flight_status}`;
        const location = `${flight.departure.airport}`;

        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    };

    return (
        <a
            href={generateGoogleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full max-w-md transition-transform hover:scale-[1.02] cursor-pointer"
        >
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white w-full shadow-xl border border-white/20 animate-fade-in-up">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold">{flight.departure.iata}</h2>
                        <p className="text-sm text-gray-300">{flight.departure.airport}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-400 mb-1">{flight.flight.iata}</span>
                        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent relative">
                            <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full animate-pulse"></div>
                        </div>
                        <span className="text-xs text-green-400 mt-1 capitalize">{flight.flight_status}</span>
                    </div>
                    <div className="text-right">
                        <h2 className="text-2xl font-bold">{flight.arrival.iata}</h2>
                        <p className="text-sm text-gray-300">{flight.arrival.airport}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-3 rounded-lg">
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Departure</p>
                        <p className="text-xl font-semibold">{formatDate(flight.departure.scheduled)}</p>
                        <p className="text-xs text-gray-400">{flight.departure.timezone}</p>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg text-right">
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Arrival</p>
                        <p className="text-xl font-semibold">{formatDate(flight.arrival.scheduled)}</p>
                        <p className="text-xs text-gray-400">{flight.arrival.timezone}</p>
                    </div>
                </div>

                <div className="mt-4 text-center text-xs text-gray-400">
                    Airline: {flight.airline.name}
                </div>
            </div>
        </a>
    );
}
