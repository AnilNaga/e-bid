// // import React, { useEffect, useState } from "react";
// // import { Loader2, ArrowLeft } from "lucide-react";
// // import Navbar from "./Navbar";
// // import Footer from "./Footer";
// // import { useNavigate } from "react-router-dom";

// // const AuctionUserDashboard: React.FC = () => {
// //   const [userId, setUserId] = useState<string | null>(null);
// //   const [userAuctions, setUserAuctions] = useState<any[]>([]);
// //   const [wonAuctions, setWonAuctions] = useState<any[]>([]);
// //   const [filteredAuctions, setFilteredAuctions] = useState<any[]>([]);
// //   const [filteredWon, setFilteredWon] = useState<any[]>([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [searchWonTerm, setSearchWonTerm] = useState("");
// //   const [searchWonPrice, setSearchWonPrice] = useState("");
// //   const [searchWonDate, setSearchWonDate] = useState("");
// //   const [sortBy, setSortBy] = useState("name"); // Default sorting by name
// //   const [loading, setLoading] = useState(true);
// //   const [loadingWon, setLoadingWon] = useState(true);

// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const storedUserId = localStorage.getItem("userId");
// //     if (storedUserId) {
// //       setUserId(storedUserId);
// //     } else {
// //       navigate("/");
// //     }
// //   }, [navigate]);

// //   useEffect(() => {
// //     const fetchUserAuctions = async () => {
// //       if (!userId) return;
// //       try {
// //         const response = await fetch(`http://localhost:8080/user/auctions/${userId}`);
// //         const data = await response.json();
// //         setUserAuctions(data);
// //         setFilteredAuctions(data);
// //       } catch (error) {
// //         console.error(error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     const fetchWonAuctions = async () => {
// //       if (!userId) return;
// //       try {
// //         const response = await fetch(`http://localhost:8080/user/wonAuctions/${userId}`);
// //         const data = await response.json();
// //         setWonAuctions(data);
// //       } catch (error) {
// //         console.error(error);
// //       } finally {
// //         setLoadingWon(false);
// //       }
// //     };

// //     if (userId) {
// //       fetchUserAuctions();
// //       fetchWonAuctions();
// //     }
// //   }, [userId]);

// //   useEffect(() => {
// //     const filtered = userAuctions.filter((auction) =>
// //       auction.name.toLowerCase().includes(searchTerm.toLowerCase())
// //     );
// //     setFilteredAuctions(filtered);
// //   }, [searchTerm, userAuctions]);

// //   useEffect(() => {
// //     const filtered = wonAuctions
// //       .filter((auction) => {
// //         const matchesName = auction.name.toLowerCase().includes(searchWonTerm.toLowerCase());
// //         const matchesPrice = searchWonPrice === "" || auction.highestBidAmount >= parseFloat(searchWonPrice);
// //         const matchesDate = searchWonDate === "" || new Date(auction.endDate) >= new Date(searchWonDate);
// //         return matchesName && matchesPrice && matchesDate;
// //       })
// //       .sort((a, b) => {
// //         if (sortBy === "name") {
// //           return a.name.localeCompare(b.name);
// //         }
// //         if (sortBy === "price") {
// //           return b.highestBidAmount - a.highestBidAmount;
// //         }
// //         if (sortBy === "date") {
// //           return new Date(b.endDate) - new Date(a.endDate);
// //         }
// //         return 0;
// //       });
// //     setFilteredWon(filtered);
// //   }, [searchWonTerm, searchWonPrice, searchWonDate, wonAuctions, sortBy]);

// //   return (
// //     <div>
// //       <div className="p-6 min-h-screen">
// //         <div className="fixed top-0 bg-[#8B8B5F] text-white left-0 w-full z-50 shadow-sm">
// //           <Navbar />
// //         </div>
// //         <br /><br /><br />

// //         <div className="flex items-center gap-3 mb-6 cursor-pointer text-indigo-600" onClick={() => navigate(-1)}>
// //           <ArrowLeft className="h-5 w-5" />
// //           <span className="font-medium text-sm">Back</span>
// //         </div>

// //         <h1 className="text-3xl font-bold mb-8 text-center text-indigo-700">Your Dashboard</h1>

// //         {/* Stats Cards */}
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //           <div className="bg-white rounded-2xl shadow-md p-6 text-center">
// //             <h2 className="text-gray-500 text-sm mb-2">Participated Auctions</h2>
// //             <p className="text-3xl font-bold text-blue-600">
// //               {loading ? <Loader2 className="animate-spin mx-auto" /> : userAuctions.length}
// //             </p>
// //           </div>
// //           <div className="bg-white rounded-2xl shadow-md p-6 text-center">
// //             <h2 className="text-gray-500 text-sm mb-2">Auctions Won</h2>
// //             <p className="text-3xl font-bold text-green-600">
// //               {loadingWon ? <Loader2 className="animate-spin mx-auto" /> : wonAuctions.length}
// //             </p>
// //           </div>
// //         </div>

// //         {/* Won Auctions */}
// //         <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
// //           <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
// //             <h2 className="text-2xl font-semibold text-green-700">Auctions You Won</h2>

// //             {/* Search Filters */}
// //             <div className="flex gap-4">
// //               <input
// //                 type="text"
// //                 placeholder="Search by name"
// //                 value={searchWonTerm}
// //                 onChange={(e) => setSearchWonTerm(e.target.value)}
// //                 className="border rounded-lg px-4 py-2 w-full md:w-72 focus:ring-2 focus:ring-green-300"
// //               />
// //               <input
// //                 type="number"
// //                 placeholder="Min. Winning Bid"
// //                 value={searchWonPrice}
// //                 onChange={(e) => setSearchWonPrice(e.target.value)}
// //                 className="border rounded-lg px-4 py-2 w-full md:w-72 focus:ring-2 focus:ring-green-300"
// //               />
// //               <input
// //                 type="date"
// //                 value={searchWonDate}
// //                 onChange={(e) => setSearchWonDate(e.target.value)}
// //                 className="border rounded-lg px-4 py-2 w-full md:w-72 focus:ring-2 focus:ring-green-300"
// //               />
// //             </div>

// //             {/* Sorting Dropdown */}
// //             <select
// //               value={sortBy}
// //               onChange={(e) => setSortBy(e.target.value)}
// //               className="border rounded-lg px-4 py-2 mt-4 md:mt-0 focus:ring-2 focus:ring-green-300"
// //             >
// //               <option value="name">Sort by Name</option>
// //               <option value="price">Sort by Price</option>
// //               <option value="date">Sort by Date</option>
// //             </select>
// //           </div>

// //           {/* Display Auctions */}
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             {filteredWon.length > 0 ? (
// //               filteredWon.map((auction) => (
// //                 <div
// //                   key={auction.id}
// //                   className="border border-green-200 bg-white rounded-xl p-5 hover:shadow-lg transition transform hover:scale-[1.01]"
// //                 >
// //                   <div className="flex justify-between items-center mb-2">
// //                     <h3 className="text-xl font-bold text-green-800">{auction.name}</h3>
// //                     <span className="bg-green-100 text-green-700 px-2 py-1 text-xs font-medium rounded-full">
// //                       {auction.status}
// //                     </span>
// //                   </div>
// //                   <p className="text-gray-600 mb-2 italic">{auction.description}</p>
// //                   <div className="mb-2 text-sm text-gray-700 space-y-1">
// //                     <p><strong>Winning Bid:</strong> ₹{auction.highestBidAmount}</p>
// //                     <p><strong>Auction ID:</strong> »{auction.id}</p>
// //                     <p><strong>Ended On:</strong> {new Date(auction.endDate).toLocaleString()}</p>
// //                     <p><strong>Created At:</strong> {new Date(auction.createdAt).toLocaleString()}</p>
// //                   </div>
// //                 </div>
// //               ))
// //             ) : (
// //               <p className="text-center text-lg text-gray-500 col-span-full">
// //                 No auctions found.
// //               </p>
// //             )}
// //           </div>
// //         </div>

// //         {/* Participated Auctions */}
// //         <div className="bg-white rounded-2xl shadow-md p-6">
// //           <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
// //             <h2 className="text-2xl font-semibold text-indigo-700">Participated Auctions</h2>

// //             {/* Search */}
// //             <div className="flex gap-4">
// //               <input
// //                 type="text"
// //                 placeholder="Search by name"
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 className="border rounded-lg px-4 py-2 w-full md:w-72 focus:ring-2 focus:ring-indigo-300"
// //               />
// //             </div>
// //           </div>

// //           {/* Display Participated Auctions */}
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             {filteredAuctions.length > 0 ? (
// //               filteredAuctions.map((auction) => (
// //                 <div
// //                   key={auction.id}
// //                   className="border border-indigo-200 bg-white rounded-xl p-5 hover:shadow-lg transition transform hover:scale-[1.01]"
// //                 >
// //                   <div className="flex justify-between items-center mb-2">
// //                     <h3 className="text-xl font-bold text-indigo-800">{auction.name}</h3>
// //                     <span className="bg-indigo-100 text-indigo-700 px-2 py-1 text-xs font-medium rounded-full">
// //                       {auction.status}
// //                     </span>
// //                   </div>
// //                   <p className="text-gray-600 mb-2 italic">{auction.description}</p>
// //                   <div className="mb-2 text-sm text-gray-700 space-y-1">
// //                     <p><strong>Current Bid:</strong> ₹{auction.currentBid}</p>
// //                     <p><strong>Auction ID:</strong> »{auction.id}</p>
// //                     <p><strong>Ends On:</strong> {new Date(auction.endDate).toLocaleString()}</p>
// //                     <p><strong>Created At:</strong> {new Date(auction.createdAt).toLocaleString()}</p>
// //                   </div>
// //                 </div>
// //               ))
// //             ) : (
// //               <p className="text-center text-lg text-gray-500 col-span-full">
// //                 No auctions found.
// //               </p>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       <Footer />
// //     </div>
// //   );
// // };

// // export default AuctionUserDashboard;

// import React, { useEffect, useState } from "react";
// import { Loader2, ArrowLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import Layout from "./Layout";
// import Footer from "./Footer";

// interface Auction {
//   id: string;
//   name: string;
//   startingPrice: number;
//   endDate: string;
//   startDate: string;
//   description: string;
//   status: string;
//   highestBidderId: string | null;
//   highestBidAmount: number;
//   title: string;
// }

// const AuctionUserDashboard: React.FC = () => {
//   const [userId, setUserId] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const [userAuctions, setUserAuctions] = useState<Auction[]>([]);
//   const [filteredAuctions, setFilteredAuctions] = useState<Auction[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOption, setSortOption] = useState("price-asc");
//   const [loading, setLoading] = useState(true);
//   const [wonAuctions, setWonAuctions] = useState<Auction[]>([]);
//   const [filteredWonAuctions, setFilteredWonAuctions] = useState<Auction[]>([]);
//   const [searchWonTerm, setSearchWonTerm] = useState("");
//   const [sortWonOption, setSortWonOption] = useState("price-asc");
//   const [loadingWon, setLoadingWon] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const storedUserId = localStorage.getItem("userId");
//     if (storedUserId) {
//       setUserId(storedUserId);
//     } else {
//       navigate("/");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     const fetchUserAuctions = async () => {
//       if (!userId) return;
//       try {
//         const response = await fetch(`http://localhost:8080/user/auctions/${userId}`);
//         if (!response.ok) throw new Error("Failed to fetch participated auctions");
//         const data = await response.json();
//         const sanitizedData: Auction[] = data.map((auction: any) => {
//           const startingPrice = Number(auction.startingPrice);
//           if (isNaN(startingPrice)) {
//             console.warn(`Invalid startingPrice for auction ${auction.id}: ${auction.startingPrice}`);
//           }
//           const endDate = auction.endDate && !isNaN(new Date(auction.endDate).getTime())
//             ? auction.endDate
//             : new Date().toISOString();
//           if (!auction.endDate) {
//             console.warn(`Invalid endDate for auction ${auction.id}, using default`);
//           }
//           return {
//             id: String(auction.id ?? "Unknown"),
//             name: auction.name ?? "Unnamed Auction",
//             startingPrice: isNaN(startingPrice) ? 0 : startingPrice,
//             endDate,
//             startDate: auction.startDate && !isNaN(new Date(auction.startDate).getTime())
//               ? auction.startDate
//               : new Date().toISOString(),
//             description: auction.description ?? "No description",
//             status: auction.status ?? "UNKNOWN",
//             highestBidderId: auction.highestBidderId ? String(auction.highestBidderId) : null,
//             highestBidAmount: Number(auction.highestBidAmount) || 0,
//             title: auction.title ?? auction.name ?? "Untitled",
//           };
//         });
//         setUserAuctions(sanitizedData);
//         setFilteredAuctions(sanitizedData);
//       } catch (error) {
//         setError("Error fetching participated auctions");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchWonAuctions = async () => {
//       if (!userId) return;
//       try {
//         const response = await fetch(`http://localhost:8080/user/wonAuctions/${userId}`);
//         if (!response.ok) throw new Error("Failed to fetch won auctions");
//         const data = await response.json();
//         const sanitizedData: Auction[] = data.map((auction: any) => ({
//           id: String(auction.id ?? "Unknown"),
//           name: auction.name ?? "Unnamed Auction",
//           startingPrice: Number(auction.startingPrice) || 0,
//           endDate: auction.endDate && !isNaN(new Date(auction.endDate).getTime())
//             ? auction.endDate
//             : new Date().toISOString(),
//           startDate: auction.startDate && !isNaN(new Date(auction.startDate).getTime())
//             ? auction.startDate
//             : new Date().toISOString(),
//           description: auction.description ?? "No description",
//           status: auction.status ?? "UNKNOWN",
//           highestBidderId: auction.highestBidderId ? String(auction.highestBidderId) : null,
//           highestBidAmount: Number(auction.highestBidAmount) || 0,
//           title: auction.title ?? auction.name ?? "Untitled",
//         }));
//         setWonAuctions(sanitizedData);
//         setFilteredWonAuctions(sanitizedData);
//       } catch (error) {
//         setError("Error fetching won auctions");
//         console.error(error);
//       } finally {
//         setLoadingWon(false);
//       }
//     };

//     if (userId) {
//       fetchUserAuctions();
//       fetchWonAuctions();
//     }
//   }, [userId]);

//   const searchParticipatedAuctions = (auctions: Auction[], term: string): Auction[] => {
//     if (!term.trim()) return auctions;
//     const lowerTerm = term.toLowerCase();
//     return auctions.filter((auction) => {
//       const name = auction.name.toLowerCase();
//       const id = auction.id.toLowerCase();
//       return name.includes(lowerTerm) || id === lowerTerm;
//     });
//   };

//   const searchWonAuctions = (auctions: Auction[], term: string): Auction[] => {
//     if (!term.trim()) return auctions;
//     const lowerTerm = term.toLowerCase();
//     return auctions.filter((auction) => {
//       const name = auction.name.toLowerCase();
//       const id = auction.id.toLowerCase();
//       return name.startsWith(lowerTerm) || id.startsWith(lowerTerm);
//     });
//   };

//   const sortParticipatedAuctions = (auctions: Auction[], option: string): Auction[] => {
//     const sorted = [...auctions];
//     const [key, direction] = option.split("-");
//     if (key === "price") {
//       sorted.sort((a, b) => {
//         const priceA = a.startingPrice;
//         const priceB = b.startingPrice;
//         return direction === "asc" ? priceA - priceB : priceB - priceA;
//       });
//     } else if (key === "time") {
//       sorted.sort((a, b) => {
//         const dateA = new Date(a.endDate).getTime();
//         const dateB = new Date(b.endDate).getTime();
//         if (isNaN(dateA) || isNaN(dateB)) {
//           console.warn("Invalid date encountered:", a.endDate, b.endDate);
//           return 0;
//         }
//         return direction === "asc" ? dateA - dateB : dateB - dateA;
//       });
//     }
//     return sorted;
//   };

//   const sortWonAuctions = (auctions: Auction[], option: string): Auction[] => {
//     const sorted = [...auctions];
//     const [key, direction] = option.split("-");
//     if (key === "price") {
//       sorted.sort((a, b) => {
//         const bidA = a.highestBidAmount;
//         const bidB = b.highestBidAmount;
//         return direction === "asc" ? bidA - bidB : bidB - bidA;
//       });
//     } else if (key === "time") {
//       sorted.sort((a, b) => {
//         const dateA = new Date(a.endDate).getTime();
//         const dateB = new Date(b.endDate).getTime();
//         return direction === "asc" ? dateA - dateB : dateB - dateA;
//       });
//     }
//     return sorted;
//   };

//   useEffect(() => {
//     let result = searchParticipatedAuctions(userAuctions, searchTerm);
//     result = sortParticipatedAuctions(result, sortOption);
//     setFilteredAuctions(result);
//   }, [searchTerm, sortOption, userAuctions]);

//   useEffect(() => {
//     let result = searchWonAuctions(wonAuctions, searchWonTerm);
//     result = sortWonAuctions(result, sortWonOption);
//     setFilteredWonAuctions(result);
//   }, [searchWonTerm, sortWonOption, wonAuctions]);

//   return (
//     <Layout>
//       <div className="p-6 min-h-screen">
//         {error && (
//           <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">{error}</div>
//         )}
//         <div
//           className="flex items-center gap-3 mb-6 cursor-pointer text-indigo-600"
//           onClick={() => navigate(-1)}
//         >
//           <ArrowLeft className="h-5 w-5" />
//           <span className="font-medium text-sm">Back</span>
//         </div>

//         <h1 className="text-3xl font-bold mb-8 text-center text-indigo-700">Your Dashboard</h1>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white rounded-2xl shadow-md p-6">
//             <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Your Participated Auctions</h2>
//             <div className="flex flex-col gap-4">
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search by auction name or ID"
//                 className="border rounded-lg p-2"
//               />
//               <select
//                 value={sortOption}
//                 onChange={(e) => setSortOption(e.target.value)}
//                 className="border rounded-lg p-2"
//               >
//                 <option value="price-asc">Price: Low to High</option>
//                 <option value="price-desc">Price: High to Low</option>
//                 <option value="time-asc">Time: Earliest to Latest</option>
//                 <option value="time-desc">Time: Latest to Earliest</option>
//               </select>
//             </div>

//             {loading ? (
//               <div className="flex justify-center py-10">
//                 <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
//               </div>
//             ) : filteredAuctions.length === 0 ? (
//               <div className="text-center text-gray-500 py-10">No participated auctions match your search.</div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {filteredAuctions.map((auction) => (
//                   <div
//                     key={auction.id}
//                     className="border border-indigo-200 bg-white rounded-xl p-5 hover:shadow-lg transition transform hover:scale-[1.01]"
//                   >
//                     <div className="flex justify-between items-center mb-2">
//                       <h3 className="text-xl font-bold text-indigo-800">{auction.name}</h3>
//                       <span className="bg-indigo-100 text-indigo-700 px-2 py-1 text-xs font-medium rounded-full">
//                         {auction.status}
//                       </span>
//                     </div>
//                     <p className="text-gray-600 mb-2 italic">{auction.description}</p>
//                     <div className="mb-2 text-sm text-gray-700 space-y-1">
//                       <p><strong>Starting Price:</strong> ₹ {auction.startingPrice}</p>
//                       <p><strong>Auction ID:</strong> {auction.id}</p>
//                       <p><strong>Ends On:</strong> {new Date(auction.endDate).toLocaleString()}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="bg-white rounded-2xl shadow-md p-6">
//             <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Auctions You Won</h2>
//             <div className="flex flex-col gap-4">
//               <input
//                 type="text"
//                 value={searchWonTerm}
//                 onChange={(e) => setSearchWonTerm(e.target.value)}
//                 placeholder="Search by auction name or ID"
//                 className="border rounded-lg p-2"
//               />
//               <select
//                 value={sortWonOption}
//                 onChange={(e) => setSortWonOption(e.target.value)}
//                 className="border rounded-lg p-2"
//               >
//                 <option value="price-asc">Price: Low to High</option>
//                 <option value="price-desc">Price: High to Low</option>
//                 <option value="time-asc">Time: Earliest to Latest</option>
//                 <option value="time-desc">Time: Latest to Earliest</option>
//               {/* </selec */}
//             </div>

//             {loadingWon ? (
//               <div className="flex justify-center py-10">
//                 <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
//               </div>
//             ) : filteredWonAuctions.length === 0 ? (
//               <div className="text-center text-gray-500 py-10">No won auctions match your search.</div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {filteredWonAuctions.map((auction) => (
//                   <div
//                     key={auction.id}
//                     className="border border-indigo-200 bg-white rounded-xl p-5 hover:shadow-lg transition transform hover:scale-[1.01]"
//                   >
//                     <div className="flex justify-between items-center mb-2">
//                       <h3 className="text-xl font-bold text-indigo-800">{auction.name}</h3>
//                       <span className="bg-indigo-100 text-indigo-700 px-2 py-1 text-xs font-medium rounded-full">
//                         {auction.status}
//                       </span>
//                     </div>
//                     <p className="text-gray-600 mb-2 italic">{auction.description}</p>
//                     <div className="mb-2 text-sm text-gray-700 space-y-1">
//                       <p><strong>Starting Price:</strong> ₹ {auction.startingPrice}</p>
//                       <p><strong>Auction ID:</strong> {auction.id}</p>
//                       <p><strong>Ends On:</strong> {new Date(auction.endDate).toLocaleString()}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </Layout>
//   );
// };

// export default AuctionUserDashboard;

import React, { useEffect, useState } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import Footer from "./Footer";

interface Auction {
  id: string;
  name: string;
  startingPrice: number;
  endDate: string;
  startDate: string;
  description: string;
  status: string;
  highestBidderId: string | null;
  highestBidAmount: number;
  title: string;
}

const AuctionUserDashboard: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  const [userAuctions, setUserAuctions] = useState<Auction[]>([]);
  const [filteredAuctions, setFilteredAuctions] = useState<Auction[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("price-asc");
  const [loading, setLoading] = useState(true);
  const [wonAuctions, setWonAuctions] = useState<Auction[]>([]);
  const [filteredWonAuctions, setFilteredWonAuctions] = useState<Auction[]>([]);
  const [searchWonTerm, setSearchWonTerm] = useState("");
  const [sortWonOption, setSortWonOption] = useState("price-asc");
  const [loadingWon, setLoadingWon] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUserAuctions = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`https://metaauction.onrender.com/user/auctions/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch participated auctions");
        const data = await response.json();
        const sanitizedData: Auction[] = data.map((auction: any) => {
          const startingPrice = Number(auction.startingPrice);
          if (isNaN(startingPrice)) {
            console.warn(`Invalid startingPrice for auction ${auction.id}: ${auction.startingPrice}`);
          }
          const endDate = auction.endDate && !isNaN(new Date(auction.endDate).getTime())
            ? auction.endDate
            : new Date().toISOString();
          if (!auction.endDate) {
            console.warn(`Invalid endDate for auction ${auction.id}, using default`);
          }
          return {
            id: String(auction.id ?? "Unknown"),
            name: auction.name ?? "Unnamed Auction",
            startingPrice: isNaN(startingPrice) ? 0 : startingPrice,
            endDate,
            startDate: auction.startDate && !isNaN(new Date(auction.startDate).getTime())
              ? auction.startDate
              : new Date().toISOString(),
            description: auction.description ?? "No description",
            status: auction.status ?? "UNKNOWN",
            highestBidderId: auction.highestBidderId ? String(auction.highestBidderId) : null,
            highestBidAmount: Number(auction.highestBidAmount) || 0,
            title: auction.title ?? auction.name ?? "Untitled",
          };
        });
        console.log("Fetched Participated Auctions:", sanitizedData);
        setUserAuctions(sanitizedData);
        setFilteredAuctions(sanitizedData);
      } catch (error) {
        setError("Error fetching participated auctions");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchWonAuctions = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`https://metaauction.onrender.com/user/wonAuctions/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch won auctions");
        const data = await response.json();
        const sanitizedData: Auction[] = data.map((auction: any) => ({
          id: String(auction.id ?? "Unknown"),
          name: auction.name ?? "Unnamed Auction",
          startingPrice: Number(auction.startingPrice) || 0,
          endDate: auction.endDate && !isNaN(new Date(auction.endDate).getTime())
            ? auction.endDate
            : new Date().toISOString(),
          startDate: auction.startDate && !isNaN(new Date(auction.startDate).getTime())
            ? auction.startDate
            : new Date().toISOString(),
          description: auction.description ?? "No description",
          status: auction.status ?? "UNKNOWN",
          highestBidderId: auction.highestBidderId ? String(auction.highestBidderId) : null,
          highestBidAmount: Number(auction.highestBidAmount) || 0,
          title: auction.title ?? auction.name ?? "Untitled",
        }));
        setWonAuctions(sanitizedData);
        setFilteredWonAuctions(sanitizedData);
      } catch (error) {
        setError("Error fetching won auctions");
        console.error(error);
      } finally {
        setLoadingWon(false);
      }
    };

    if (userId) {
      fetchUserAuctions();
      fetchWonAuctions();
    }
  }, [userId]);

  const searchParticipatedAuctions = (auctions: Auction[], term: string): Auction[] => {
    if (!term.trim()) return auctions;
    const lowerTerm = term.toLowerCase();
    return auctions.filter((auction) => {
      const name = auction.name.toLowerCase();
      const id = auction.id.toLowerCase();
      return name.includes(lowerTerm) || id === lowerTerm;
    });
  };

  const searchWonAuctions = (auctions: Auction[], term: string): Auction[] => {
    if (!term.trim()) return auctions;
    const lowerTerm = term.toLowerCase();
    return auctions.filter((auction) => {
      const name = auction.name.toLowerCase();
      const id = auction.id.toLowerCase();
      return name.startsWith(lowerTerm) || id.startsWith(lowerTerm);
    });
  };

  const sortParticipatedAuctions = (auctions: Auction[], option: string): Auction[] => {
    const sorted = [...auctions];
    const [key, direction] = option.split("-");
    if (key === "price") {
      sorted.sort((a, b) => {
        const priceA = a.startingPrice;
        const priceB = b.startingPrice;
        return direction === "asc" ? priceA - priceB : priceB - priceA;
      });
    } else if (key === "time") {
      sorted.sort((a, b) => {
        const dateA = new Date(a.endDate).getTime();
        const dateB = new Date(b.endDate).getTime();
        if (isNaN(dateA) || isNaN(dateB)) {
          console.warn("Invalid date encountered:", a.endDate, b.endDate);
          return 0;
        }
        return direction === "asc" ? dateA - dateB : dateB - dateA;
      });
    }
    return sorted;
  };

  const sortWonAuctions = (auctions: Auction[], option: string): Auction[] => {
    const sorted = [...auctions];
    const [key, direction] = option.split("-");
    if (key === "price") {
      sorted.sort((a, b) => {
        const bidA = a.highestBidAmount;
        const bidB = b.highestBidAmount;
        return direction === "asc" ? bidA - bidB : bidB - bidA;
      });
    } else if (key === "time") {
      sorted.sort((a, b) => {
        const dateA = new Date(a.endDate).getTime();
        const dateB = new Date(b.endDate).getTime();
        return direction === "asc" ? dateA - dateB : dateB - dateA;
      });
    }
    return sorted;
  };

  useEffect(() => {
    console.log("Updating filtered auctions - Search:", searchTerm, "Sort:", sortOption);
    let result = searchParticipatedAuctions(userAuctions, searchTerm);
    result = sortParticipatedAuctions(result, sortOption);
    setFilteredAuctions(result);
  }, [searchTerm, sortOption, userAuctions]);

  useEffect(() => {
    let result = searchWonAuctions(wonAuctions, searchWonTerm);
    result = sortWonAuctions(result, sortWonOption);
    setFilteredWonAuctions(result);
  }, [searchWonTerm, sortWonOption, wonAuctions]);

  return (
    <Layout>
      <div className="p-6 min-h-screen">
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">{error}</div>
        )}
        <div
          className="flex items-center gap-3 mb-6 cursor-pointer text-indigo-600"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium text-sm">Back</span>
        </div>

        <h1 className="text-3xl font-bold mb-8 text-center text-indigo-700">Your Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <h2 className="text-gray-500 text-sm mb-2">Participated Auctions</h2>
            <p className="text-3xl font-bold text-blue-600">
              {loading ? <Loader2 className="animate-spin mx-auto" /> : userAuctions.length}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <h2 className="text-gray-500 text-sm mb-2">Auctions Won</h2>
            <p className="text-3xl font-bold text-green-600">
              {loadingWon ? <Loader2 className="animate-spin mx-auto" /> : wonAuctions.length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-semibold text-green-700">Auctions You Won</h2>
            <input
              type="text"
              placeholder="Search by ID or name..."
              value={searchWonTerm}
              onChange={(e) => setSearchWonTerm(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full md:w-72 focus:ring-2 focus:ring-green-300"
            />
            <select
              value={sortWonOption}
              onChange={(e) => setSortWonOption(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full md:w-48 focus:ring-2 focus:ring-green-300"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="time-asc">Time: Earliest to Latest</option>
              <option value="time-desc">Time: Latest to Earliest</option>
            </select>
          </div>
          {loadingWon ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-10 w-10 animate-spin text-green-600" />
            </div>
          ) : filteredWonAuctions.length === 0 ? (
            <div className="text-center text-gray-500 py-10">No won auctions match your search.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredWonAuctions.map((auction) => (
                <div
                  key={auction.id}
                  className="border border-green-200 bg-white rounded-xl p-5 hover:shadow-lg transition transform hover:scale-[1.01]"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-green-800">{auction.name}</h3>
                    <span className="bg-green-100 text-green-700 px-2 py-1 text-xs font-medium rounded-full">
                      {auction.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2 italic">{auction.description}</p>
                  <div className="mb-2 text-sm text-gray-700 space-y-1">
                    <p><strong>Winning Bid:</strong> ₹ {auction.highestBidAmount}</p>
                    <p><strong>Auction ID:</strong> {auction.id}</p>
                    <p><strong>Ended On:</strong> {new Date(auction.endDate).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-semibold text-indigo-700">Your Participated Auctions</h2>
            <input
              type="text"
              placeholder="Search by ID or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full md:w-72 focus:ring-2 focus:ring-indigo-300"
            />
            <select
              value={sortOption}
              onChange={(e) => {
                console.log("Sort option changed to:", e.target.value);
                setSortOption(e.target.value);
              }}
              className="border rounded-lg px-4 py-2 w-full md:w-48 focus:ring-2 focus:ring-indigo-300"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="time-asc">Time: Earliest to Latest</option>
              <option value="time-desc">Time: Latest to Earliest</option>
            </select>
          </div>
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
            </div>
          ) : filteredAuctions.length === 0 ? (
            <div className="text-center text-gray-500 py-10">No auctions match your search.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredAuctions.map((auction, index) => (
                <div
                  key={`${auction.id}-${index}`}
                  className="bg-white border border-gray-200 rounded-2xl p-5 transition-shadow hover:shadow-md hover:scale-[1.01]"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-indigo-700 truncate">{auction.name}</h3>
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        auction.status === "COMPLETED"
                          ? "bg-red-100 text-red-700"
                          : auction.status === "ACTIVE"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {auction.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2 italic">{auction.description}</p>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p><strong>Auction ID:</strong> {auction.id}</p>
                    <p><strong>Start:</strong> {new Date(auction.startDate).toLocaleString()}</p>
                    <p><strong>End:</strong> {new Date(auction.endDate).toLocaleString()}</p>
                    <p><strong>Starting Price:</strong> ₹ {auction.startingPrice}</p>
                    {auction.highestBidderId && (
                      <p><strong>Top Bidder:</strong> {auction.highestBidderId}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default AuctionUserDashboard;
