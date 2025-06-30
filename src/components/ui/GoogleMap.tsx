import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import LoadingSpinner from './LoadingSpinner';

interface GoogleMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  className?: string;
}

const containerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '0.75rem',
  overflow: 'hidden',
};

export default function GoogleMapComponent({ lat, lng, zoom = 14, className = '' }: GoogleMapProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  if (loadError) {
    return <div className="text-red-500">Failed to load map.</div>;
  }
  if (!isLoaded) {
    return <LoadingSpinner className="h-32" />;
  }

  return (
    <div className={className} style={{ borderRadius: '0.75rem', overflow: 'hidden' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat, lng }}
        zoom={zoom}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        <Marker position={{ lat, lng }} />
      </GoogleMap>
    </div>
  );
} 