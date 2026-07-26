// import React, { useState, useRef, useEffect } from 'react';
// import gsap from 'gsap';

// const teamMembers = [
//   {
//     name: "SANDRA LEE",
//     role: "CREATIVE DIRECTOR",
//     image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     name: "CHRISTINA GRANT",
//     role: "LEAD INTERIOR DESIGNER",
//     image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     name: "MATEY BLACK",
//     role: "SPACE PLANNER",
//     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     name: "MARY PETTERSON",
//     role: "3D VISUALIZER / CGI ARTIST",
//     image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
//   },
// ];

// export default function TeamSection() {
//   const [hoveredIndex, setHoveredIndex] = useState(null);
//   const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
//   const floatingImageRef = useRef(null);

//   // Track mouse position relative to section to smoothly follow cursor
//   const handleMouseMove = (e) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     setCursorPos({ x, y });

//     if (floatingImageRef.current) {
//       gsap.to(floatingImageRef.current, {
//         x: x - 110, // Center offset
//         y: y - 150,
//         duration: 0.3,
//         ease: "power2.out",
//       });
//     }
//   };

//   return (
//     <section 
//       onMouseMove={handleMouseMove}
//       className="relative w-full bg-[#f0ede8] text-[#2c221e] py-20 px-6 md:px-16 lg:px-24 overflow-hidden min-h-screen flex flex-col justify-center"
//     >
//       {/* Floating Interactive Image with GSAP */}
//       <div 
//         ref={floatingImageRef}
//         className={`absolute pointer-events-none z-30 w-48 h-64 md:w-56 md:h-76 rounded-lg overflow-hidden shadow-2xl transition-opacity duration-300 ${
//           hoveredIndex !== null ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
//         }`}
//         style={{ left: 0, top: 0 }}
//       >
//         {hoveredIndex !== null && (
//           <img 
//             src={teamMembers[hoveredIndex].image} 
//             alt={teamMembers[hoveredIndex].name}
//             className="w-full h-full object-cover"
//           />
//         )}
//       </div>

//       {/* Section Header */}
//       <div className="max-w-7xl mx-auto w-full mb-16">
//         <div className="flex items-center space-x-2 mb-4">
//           <span className="w-1.5 h-1.5 rounded-full bg-[#732c14]"></span>
//           <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-medium">
//             The People Behind The Design
//           </span>
//         </div>
//         <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-neutral-900">
//           THE MINDS AND HANDS BEHIND <br />
//           <span className="font-normal">OUR SIGNATURE INTERIORS</span>
//         </h2>
//       </div>

//       {/* Team Member List */}
//       <div className="max-w-7xl mx-auto w-full border-t border-neutral-300/80">
//         {teamMembers.map((member, index) => {
//           const isHovered = hoveredIndex === index;

//           return (
//             <div
//               key={member.name}
//               onMouseEnter={() => setHoveredIndex(index)}
//               onMouseLeave={() => setHoveredIndex(null)}
//               className="group relative flex flex-col md:flex-row items-start md:items-center justify-between py-8 md:py-10 border-b border-neutral-300/80 cursor-pointer transition-colors duration-300"
//             >
//               {/* Name & Role */}
//               <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 z-10">
//                 <h3 
//                   className={`text-2xl sm:text-4xl lg:text-5xl font-light tracking-wide transition-all duration-300 ${
//                     isHovered ? 'text-[#732c14] translate-x-3' : 'text-neutral-400 group-hover:text-neutral-900'
//                   }`}
//                 >
//                   {member.name}
//                 </h3>
//                 <span className={`text-xs sm:text-sm tracking-widest uppercase transition-colors duration-300 ${
//                   isHovered ? 'text-neutral-700 font-medium' : 'text-neutral-400'
//                 }`}>
//                   / {member.role}
//                 </span>
//               </div>

//               {/* Read More Button */}
//               <div className="mt-4 md:mt-0 z-10">
//                 <a
//                   href="#read-more"
//                   className={`inline-flex items-center justify-center px-6 py-3 text-xs uppercase tracking-widest font-medium transition-all duration-300 border ${
//                     isHovered 
//                       ? 'bg-[#732c14] text-white border-[#732c14] shadow-md' 
//                       : 'bg-transparent text-neutral-800 border-neutral-400 hover:border-neutral-800'
//                   }`}
//                 >
//                   Read More
//                 </a>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }




// 2nd code


// import React, { useState } from 'react';

// const teamMembers = [
//   {
//     name: "SANDRA LEE",
//     role: "CREATIVE DIRECTOR",
//     image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     name: "CHRISTINA GRANT",
//     role: "LEAD INTERIOR DESIGNER",
//     image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     name: "MATEY BLACK",
//     role: "SPACE PLANNER",
//     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
//   },
//   {
//     name: "MARY PETTERSON",
//     role: "3D VISUALIZER / CGI ARTIST",
//     image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
//   },
// ];

// export default function TeamSection() {
//   const [hoveredIndex, setHoveredIndex] = useState(null);

//   return (
//     <section 
//       className="relative w-full bg-[#f0ede8] text-[#2c221e] py-20 px-6 md:px-16 lg:px-24 overflow-hidden min-h-screen flex flex-col justify-center"
//     >
//       {/* Section Header */}
//       <div className="max-w-7xl mx-auto w-full mb-16">
//         <div className="flex items-center space-x-2 mb-4">
//           <span className="w-1.5 h-1.5 rounded-full bg-[#732c14]"></span>
//           <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-medium">
//             The People Behind The Design
//           </span>
//         </div>
//         <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-neutral-900">
//           THE MINDS AND HANDS BEHIND <br />
//           <span className="font-normal">OUR SIGNATURE INTERIORS</span>
//         </h2>
//       </div>

//       {/* Team Member List */}
//       <div className="max-w-7xl mx-auto w-full border-t border-neutral-300/80">
//         {teamMembers.map((member, index) => {
//           const isHovered = hoveredIndex === index;

//           return (
//             <div
//               key={member.name}
//               onMouseEnter={() => setHoveredIndex(index)}
//               onMouseLeave={() => setHoveredIndex(null)}
//               className="group relative flex flex-col md:flex-row items-start md:items-center justify-between py-8 md:py-10 border-b border-neutral-300/80 cursor-pointer transition-colors duration-300"
//             >
//               {/* Name, Role & Inline Fixed Image Positioned Right After Text */}
//               <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-6 z-10 w-full md:w-auto">
//                 <h3 
//                   className={`text-2xl sm:text-4xl lg:text-5xl font-light tracking-wide transition-all duration-300 ${
//                     isHovered ? 'text-[#732c14] md:translate-x-3' : 'text-neutral-400 group-hover:text-neutral-900'
//                   }`}
//                 >
//                   {member.name}
//                 </h3>
                
//                 <span className={`text-xs sm:text-sm tracking-widest uppercase transition-colors duration-300 ${
//                   isHovered ? 'text-neutral-700 font-medium' : 'text-neutral-400'
//                 }`}>
//                   / {member.role}
//                 </span>

//                 {/* Inline Image fixed directly after the text without floating */}
//                 <div 
//                   className={`overflow-hidden transition-all duration-500 ease-in-out flex items-center shrink-0 ${
//                     isHovered ? 'max-w-37.5 opacity-100 md:mx-4' : 'max-w-0 opacity-0 md:mx-0'
//                   }`}
//                 >
//                   <img 
//                     src={member.image} 
//                     alt={member.name}
//                     className="w-28 h-36 md:w-32 md:h-40 object-cover rounded-md shadow-lg shrink-0"
//                   />
//                 </div>
//               </div>

//               {/* Read More Button */}
//               <div className="mt-4 md:mt-0 z-10">
//                 <a
//                   href="#read-more"
//                   className={`inline-flex items-center justify-center px-6 py-3 text-xs uppercase tracking-widest font-medium transition-all duration-300 border ${
//                     isHovered 
//                       ? 'bg-[#732c14] text-white border-[#732c14] shadow-md' 
//                       : 'bg-transparent text-neutral-800 border-neutral-400 hover:border-neutral-800'
//                   }`}
//                 >
//                   Read More
//                 </a>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }







import React, { useState } from 'react';

const teamMembers = [
  {
    name: "SANDRA LEE",
    role: "CREATIVE DIRECTOR",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "CHRISTINA GRANT",
    role: "LEAD INTERIOR DESIGNER",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "MATEY BLACK",
    role: "SPACE PLANNER",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "MARY PETTERSON",
    role: "3D VISUALIZER / CGI ARTIST",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  },
];

export default function TeamSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section 
      className="relative w-full bg-[#f0ede8] text-[#2c221e] py-20 px-6 md:px-16 lg:px-24 overflow-hidden min-h-screen flex flex-col justify-center"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto w-full mb-16">
        <div className="flex items-center space-x-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#732c14]"></span>
          <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-medium">
            The People Behind The Design
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-neutral-900">
          THE MINDS AND HANDS BEHIND <br />
          <span className="font-normal">OUR SIGNATURE INTERIORS</span>
        </h2>
      </div>

      {/* Team Member List */}
      <div className="max-w-7xl mx-auto w-full border-t border-neutral-300/80">
        {teamMembers.map((member, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={member.name}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex flex-col md:flex-row items-start md:items-center justify-between py-6 md:py-8 border-b border-neutral-300/80 cursor-pointer transition-colors duration-300"
            >
              {/* Name, Role & Inline Fixed Image Positioned Right After Text */}
              <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-6 z-10 w-full md:w-auto">
                <h3 
                  className={`text-2xl sm:text-4xl lg:text-5xl font-light tracking-wide transition-all duration-300 ${
                    isHovered ? 'text-[#732c14] md:translate-x-3' : 'text-neutral-400 group-hover:text-neutral-900'
                  }`}
                >
                  {member.name}
                </h3>
                
                <span className={`text-xs sm:text-sm tracking-widest uppercase transition-colors duration-300 ${
                  isHovered ? 'text-neutral-700 font-medium' : 'text-neutral-400'
                }`}>
                  / {member.role}
                </span>

                {/* Inline Image with higher z-index and slightly larger height than text container */}
                <div 
                  className={`relative z-20 overflow-visible transition-all duration-500 ease-in-out flex items-center shrink-0 ${
                    isHovered ? 'max-w-45 opacity-100 md:mx-4' : 'max-w-0 opacity-0 md:mx-0'
                  }`}
                >
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-32 h-44 md:w-36 md:h-48 object-cover rounded-md shadow-2xl shrink-0 -my-3"
                  />
                </div>
              </div>

              {/* Read More Button */}
              <div className="mt-4 md:mt-0 z-10">
                <a
                  href="#read-more"
                  className={`inline-flex items-center justify-center px-6 py-3 text-xs uppercase tracking-widest font-medium transition-all duration-300 border ${
                    isHovered 
                      ? 'bg-[#732c14] text-white border-[#732c14] shadow-md' 
                      : 'bg-transparent text-neutral-800 border-neutral-400 hover:border-neutral-800'
                  }`}
                >
                  Read More
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}



