
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { ArrowRight, Maximize2, Minimize2 } from 'lucide-react';


// Fix for default marker icon missing in React Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const openMap = ()=>{
  window.open('https://www.google.com/maps/place/Riverside+Building,+County+Hall,+Westminster+Bridge+Rd,+London+SE1+7JA,+UK/@51.5031864,-0.1195192,17z/data=!3m1!4b1!4m6!3m5!1s0x487604c7c7eb9be3:0x3918653583725b56!8m2!3d51.5031864!4d-0.1195192!16s%2Fg%2F11b62lft4n?entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D')
}
export default function LocationMap() {
  const position = [51.5033, -0.1195]; // London Eye coordinates

  return (
  <div className='w-full'>
    <div className="relative w-full h-[60vh] z-0">
      {/* Leaflet Map taking 50% of screen height */}
      <MapContainer 
        center={position} 
        zoom={13} 
        scrollWheelZoom={true} 
        zoomControl={false} 
        className="w-full h-full"
      >
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        <Marker position={position}>
          <Popup>
            London Eye
          </Popup>
        </Marker>
      </MapContainer>

      {/* Floating Info Card Overlay (Top-Left) */}
      <div className="absolute top-4 left-4 z-999 w-80 bg-white rounded-lg shadow-xl p-4 border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900">London Eye</h2>
        <p className="text-sm text-gray-600 mt-1">
          Riverside Building, County Hall, Westminster Bridge Rd, London SE1 7PB, UK
        </p>

        <div className="flex items-center mt-3 text-sm text-gray-700">
          <span className="font-semibold mr-1">4.5</span>
          <span className="text-yellow-500 mr-1">★</span>
          <span className="text-blue-600 underline cursor-pointer">(203,054)</span>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <button onClick={openMap} className="flex-1 bg-gray-700 hover:bg-gray-800 text-white text-sm font-medium py-2 px-3 rounded-md transition duration-200 flex items-center justify-center gap-1">
            <span>Open in Maps</span>
          </button>
          <button className="p-2 border border-gray-300 hover:bg-gray-50 rounded-md transition duration-200 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>
    </div>



    <div className='h-screen w-full'>
        <div className="w-full max-w-7xl mx-auto px-6 py-16 -m-30 relative z-10 mb-6">
         <div className="bg-[#EFECE6] border border-[#E2DBD0] p-8 md:p-14 shadow-sm">
          
           <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#7A4228] uppercase mb-3">
             <span className="w-1.5 h-1.5 rounded-full border border-[#7A4228]"></span>             Discuss Your Vision
           </div>

           <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-2">
            LET'S DISCUSS YOUR PROJECT
           </h2>
          
           <p className="text-sm text-gray-600 mb-10">
             Your email address will not be published. Required fields are marked *
           </p>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="relative">
                 <input
                   type="text"
                   placeholder="Your Name"
                   className="w-full bg-transparent border-b border-gray-400 py-2.5 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 text-sm transition-colors focus:placeholder-transparent "                 />
               </div>
               <div className="relative">
                 <input
                   type="email"
                   placeholder="Your Email"
                   className="w-full bg-transparent border-b border-gray-400 py-2.5 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 text-sm transition-colors focus:placeholder-transparent"
                 />
              </div>
             </div>

             <div className="relative">
               <input
                 type="text"
                 placeholder="Website"
                 className="w-full bg-transparent border-b border-gray-400 py-2.5 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 text-sm transition-colors focus:placeholder-transparent"
               />
             </div>

             <div className="relative">
               <textarea
                 rows="4"
                 placeholder="Your Comment"
                 className="w-full bg-transparent border-b border-gray-400 py-2.5 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-gray-900 text-sm resize-none transition-colors focus:placeholder-transparent "
               ></textarea>
             </div>

             <div>
              <button
                type="submit"
                className="bg-[#7A3E24] hover:bg-[#EFECE6] border hover:text-[#7A3E24]  text-white text-xs uppercase tracking-widest font-semibold px-10 py-6 flex items-center gap-3 transition-colors focus:placeholder-transparent"
               >
                 Leave A Comment
                 <ArrowRight className="w-4 h-4" />
               </button>
            </div>
          </form>
          </div>
    </div>
    </div>
  </div>
  );
}
