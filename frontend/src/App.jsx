import React from "react";
import {Link} from  "react-router-dom"

function App() {
  const users = [
    { id: 1, name: "Shubham Singh", email: "shubham@example.com", role: "Admin" },
    { id: 2, name: "Kashish Singh", email: "kashish@example.com", role: "Editor" },
    { id: 3, name: "Riya Sharma", email: "riya@example.com", role: "Viewer" },
  ];

  const cardsData = [
        {
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
            name: 'Briar Martin',
            handle: '@neilstellar',
        },
        {
            image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
            name: 'Avery Johnson',
            handle: '@averywrites',
        },
        {
            image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
            name: 'Jordan Lee',
            handle: '@jordantalks',
        },
        {
            image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
            name: 'Avery Johnson',
            handle: '@averywrites',
        },
    ];

    const CreateCard = ({ card }) => (
        <div
      key={card.id}
      className="bg-blue-200 p-4 rounded-xl inline-block"
    >
      <div className="max-w-sm mx-auto">
        <div className="text-sm border border-gray-200 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5">

          {/* Image */}
          <div className="flex flex-col items-center px-5 py-4 relative">
            <img
              className="h-24 w-24 absolute -top-14 rounded-full border-3 border-gray-300"
              src={card.image}
              alt={card.name}
            />
          </div>

          {/* Description */}
          <p className="text-gray-500 px-6 text-center pt-6">
            {card.description}
          </p>

          {/* Name + Role */}
          <h1 className="text-sm font-medium text-gray-800 pt-2 text-center">
            {card.name}{" "}
            <span className="text-gray-600/80 text-xs">
              {card.role}
            </span>
          </h1>
        </div>
      </div>
    </div>
    
    );

  return (
    // <div style={{ padding: "20px" }}>
    //   <h2>User List</h2>
    //   <table border="1" cellPadding="10">
    //     <thead>
    //       <tr>
    //         <th>ID</th>
    //         <th>Name</th>
    //         <th>Email</th>
    //         <th>Role</th>
    //         <th>Detals </th>

    //       </tr>
    //     </thead>
    //     <tbody>
    //       {users.map((user) => (
    //         <tr key={user.id}>
    //           <td>{user.id}</td>
    //           <td>{user.name}</td>
    //           <td>{user.email}</td>
    //           <td>{user.role}</td>
    //           <td>
    //             <Link to={`/details/${user.id}`}  state={user}>New</Link>
    //             </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  
    

    
        <>
            <style>{`
            @keyframes marqueeScroll {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
            }

            .marquee-inner {
                animation: marqueeScroll 25s linear infinite;
            }

            .marquee-reverse {
                animation-direction: reverse;
            }
        `}</style>
{/* 
            <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
                    {[...cardsData, ...cardsData].map((card, index) => (
                        <CreateCard key={index} card={card} />
                    ))}
                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
            </div> */}

            <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>
                <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-10 pb-5">
                    {[...cardsData, ...cardsData].map((card, index) => (
                        // <CreateCard key={index} card={card} />
                        <div
      key={card.id}
      className="bg-blue-200 p-4 rounded-xl inline-block"
    >
      <div className="max-w-sm mx-auto">
        <div className="text-sm border border-gray-200 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5">

          {/* Image */}
          <div className="flex flex-col items-center px-5 py-4 relative">
            <img
              className="h-24 w-24 absolute -top-14 rounded-full border-3 border-gray-300"
              src={card.image}
              alt={card.name}
            />
          </div>

          {/* Description */}
          <p className="text-gray-500 px-6 text-center pt-6">
            {card.description}
          </p>

          {/* Name + Role */}
          <h1 className="text-sm font-medium text-gray-800 pt-2 text-center">
            {card.name}{" "}
            <span className="text-gray-600/80 text-xs">
              {card.role}
            </span>
          </h1>
        </div>
      </div>
    </div>
    
                    ))}
                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
            </div>
        </>
    )
}
 

export default App;
