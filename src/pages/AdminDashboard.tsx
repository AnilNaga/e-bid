import React, { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import NotificationsPanel from '../components/dashboard/NotificationsPanel';
import { FaChartLine, FaUsers, FaHammer, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
// Define the User type
interface User {
  id: string;
  username: string;
  email: string;
  status: string;
}
const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('adminId');
    if (!isAdminLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [navigate]);
const [showNotifications, setShowNotifications] = useState(false);
const [stats] = useState({
  totalAuctions: 24,
  activeAuctions: 5,
  completedAuctions: 19,
  totalUsers: 42,
  revenue: '$28,750',
});

const [auctionData, setAuctionData] = useState({
  name: '',
  description: '',
  startingPrice: '',
  startDate: '',
  endDate: '',
  status: 'ACTIVE',
  highestBidderId: null,
  createdByAdminId: 1, // Example admin ID (hardcoded)
  createdAt: new Date().toISOString(),
  user: null, // User is null as per your input
});

const [isSubmitting, setIsSubmitting] = useState(false);
const [errorMessage, setErrorMessage] = useState('');
const [successMessage, setSuccessMessage] = useState('');
const handleTabChange = (tab: string) => {
  setActiveTab(tab);
};

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setAuctionData((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrorMessage('');
  setSuccessMessage('');

  // Validate the form fields (if necessary, add validation here)
  if (!auctionData.name || !auctionData.description || !auctionData.startingPrice || !auctionData.startDate || !auctionData.endDate) {
    setErrorMessage('Please fill in all required fields.');
    return;
  }

  // Prepare the auction data for submission
  // const formattedAuctionData = {
  //   ...auctionData,
  //   startingPrice: parseFloat(auctionData.startingPrice), // Ensure startingPrice is a number
  //   startDate: new Date(auctionData.startDate).toISOString(), // Ensure startDate is in ISO format
  //   endDate: new Date(auctionData.endDate).toISOString(), // Ensure endDate is in ISO format
  // };

  const formattedAuctionData = {
    ...auctionData,
    startDate: new Date(auctionData.startDate).toISOString(),
    endDate: new Date(auctionData.endDate).toISOString(),
  };

  // Log formatted auction data to verify the structure
  console.log('Formatted Auction Data:', formattedAuctionData);

  setIsSubmitting(true);

  try {
    // Make sure you're sending the correct payload
    const response = await axios.post('https://metaauction.onrender.com/admin/inserting/auction', formattedAuctionData);

    // On success
    setSuccessMessage('Auction created successfully!');
    console.log('Auction Created', response.data);
  } catch (error: any) {
    if (error.response && error.response.data) {
      setErrorMessage('Failed to create auction: ' + error.response.data.message);
    } else {
      setErrorMessage('An unexpected error occurred.');
    }
  }
   finally {
    setIsSubmitting(false);
  }
};

  const [allAuctions, setAllAuctions] = useState([]); // Typed explicitly as Auction[]

useEffect(() => {
  // Define the async function inside useEffect
  const fetchAllAuctions = async () => {
    try {
      const res = await axios.get('https://metaauction.onrender.com/auction/auctions');
      console.log("Current Connection Data|", res.data); // Debugging fetched data
      setAllAuctions(res.data); // Set the auctions data
    } catch (error) {
      console.error("Error fetching auctions:", error);
    }
  };

  fetchAllAuctions(); // Call the async function
}, []);

useEffect(() => {
  console.log("Current Auctions in the project:", allAuctions);
}, [allAuctions]);



//Current Auctions
const [currentauctions, setCurrentauctions] = useState([]); // Typed explicitly as Auction[]


  useEffect(() => {
    // Define the async function inside useEffect
    const fetchCurrentAuctions = async () => {
      try {
        const res = await axios.get('https://metaauction.onrender.com/auction/runningAuctions');
        console.log("current Connection Data|"+res.data); // You might want to check the data here
        setCurrentauctions(res.data); // Set the auctions data
        
       
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };

    fetchCurrentAuctions(); // Call the async function
  }, []);

{
  useEffect(() => {
    console.log("Current Auctions in the project:", {currentauctions});
  }
)
}
  //view All users
  const [viewAlluser, setViewAlluser] = useState([]); // Typed explicitly as Auction[]


  useEffect(() => {
    // Define the async function inside useEffect
    const fetchViewAllViewsers = async () => {
      try {
        const res = await axios.get('https://metaauction.onrender.com/admin/users');
        console.log("current Connection Data|"+res.data); // You might want to check the data here
        setViewAlluser(res.data); // Set the auctions data
        
       
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };

    fetchViewAllViewsers(); // Call the async function
  }, []);


  useEffect(() => {
    console.log("Current Auctions in the project:-------------------------------------", {viewAlluser});
console.log("Current Auctions in the project:-------------------------------------", {viewAlluser});
  }, [viewAlluser]);


  const [ended, setEnded] = useState([]); // Typed explicitly as Auction[]

 // Typed explicitly as Auction[]
  useEffect(() => {
    // Define the async function inside useEffect
    const fetchViewAllViewsers = async () => {
      try {
        const res = await axios.get('https://metaauction.onrender.com/auction/endedAuctions');
        console.log("current Connection Data|"+res.data); // You might want to check the data here
        setEnded(res.data); // Set the auctions data
        
       
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };

    fetchViewAllViewsers(); // Call the async function
  }, []);


  useEffect(() => {
    console.log("Current Auctions in the project:", viewAlluser);
  }, [viewAlluser]);
  
  
  // const handleDelete = async (userId: string) => {
  //   const confirmed = window.confirm("Are you sure you want to delete this user?");
  //   if (!confirmed) return;
  
  //   try {
  //     console.log(`Attempting to delete user with ID: ${userId}`);
  //     const response = await axios.delete(`http://localhost:8080/admin/delete/user/${userId}`, {
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //     });
  //     console.log("User deleted successfully", response.data);
  // } catch (error) {
  //     console.error("Failed to delete user:"," 'User has auctions, cannot delete");
  //     alert("User has auctions , U cant delete the user .");
  // }
  // } 
  const handleStatusChange = async (userId: string, newStatus: string) => {
    const confirmed = window.confirm(`Are you sure you want to ${newStatus} this user?  `);
    if (!confirmed) return;
  
    try {
      let response;
      if (newStatus === 'active') {
        response = await axios.post(`https://metaauction.onrender.com/admin/active/user/${userId}`, {
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        response = await axios.delete(`https://metaauction.onrender.com/admin/delete/user/${userId}`, {
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      // Check if the API call was successful (status 200)
      if (response.status === 200) {
        // Update the UI state only on success
        setViewAlluser((prevUsers) =>
          prevUsers.map((u) =>
            u.id === Number(userId) ? { ...u, active: newStatus === 'active' ? 1 : 0 } : u
          )
        );
        console.log(`${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)} user successfully`);
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Failed to ${newStatus} user:, error`);
      alert(`Failed to ${newStatus} user. Please try again.`);
    }
  };
  
  // Removed duplicate navigate declaration 
  const handleUpdate = (auction: any) => {
    // Redirect to the UpdateAuctionForm with the auction data in the state
    navigate('/UpdateAuctionForm', { state: { auction } });
  };

  const viewAuction = (auctionid: number) => () => {
    // Redirect to the Auction Detail page, passing auctionid as a URL parameter
    navigate(`/auction-details/${auctionid}`);
  };
  
  // Function to handle the redirection on card click
  const handleCardClick = (auctionId: string) => {
    // Redirect to the CompletedAuctionDetailPage with the auction ID
    navigate(`/completed-auction/${auctionId.id}`);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [sortOption, setSortOption] = useState("");

  // Filtering & Sorting Logic
  const filteredAuctions = allAuctions
    .filter((auction) => {
      const matchesTerm =
        auction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        auction.id.toString().includes(searchTerm);

      const matchesMinPrice =
        minPrice === "" || auction.startingPrice >= parseFloat(minPrice);

      return matchesTerm && matchesMinPrice;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "startDate":
          return new Date(a.startingDate).getTime() - new Date(b.startingDate).getTime();
        case "endDate":
          return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        case "highPrice":
          return b.startingPrice - a.startingPrice;
        case "lowPrice":
          return a.startingPrice - b.startingPrice;
        default:
          return 0;
      }
    });


    const filteredAuctionss = currentauctions
    .filter((auction) => {
      const matchesSearch =
        auction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        auction.id.toString().includes(searchTerm);
      const matchesMinPrice =
        minPrice === "" || auction.startingPrice >= parseFloat(minPrice);
      return matchesSearch && matchesMinPrice;
    })
    .sort((a, b) => {
      if (sortOption === "startDate") {
        return new Date(a.startDate) - new Date(b.startDate);
      } else if (sortOption === "endDate") {
        return new Date(a.endDate) - new Date(b.endDate);
      } else if (sortOption === "highPrice") {
        return b.startingPrice - a.startingPrice;
      } else if (sortOption === "lowPrice") {
        return a.startingPrice - b.startingPrice;
      } else {
        return 0;
      }
    });

  

  const filteredEndedAuctions = ended
    .filter((auction) => {
      const matchesSearch =
        auction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        auction.id.toString().includes(searchTerm);
      const matchesPrice =
        minPrice === "" || auction.startingPrice >= parseFloat(minPrice);
      return matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "endDate":
          return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        case "highPrice":
          return b.startingPrice - a.startingPrice;
        case "lowPrice":
          return a.startingPrice - b.startingPrice;
        default:
          return 0;
      }
    });
  // Filter users by username, email, or ID
  const filteredUsers = viewAlluser.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toString().includes(searchTerm)
    // Debugging filtered users
  );


  type RootStackParamList = {
    VerifingDocuments: { userId: number };
    // other screens...
  };
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="text-2xl font-bold text-gray-800">
              Scrap Auction Admin Dashboard
              <p className="text-gray-500 text-lg font-normal mt-2">
                Monitor and manage your scrap auction platform
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <div className="flex items-center">
                  <FaHammer className="text-blue-500 text-2xl mr-4" />
                  <div>
                    <p className="text-gray-500">Active Auctions</p>
                    <p className="text-2xl font-bold">{currentauctions.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-500 text-2xl mr-4" />
                  <div>
                    <p className="text-gray-500">Completed Auctions</p>
                    <p className="text-2xl font-bold">{ended.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-500 text-2xl mr-4" />
                  <div>
                    <p className="text-gray-500">Total Auctions</p>
                    <p className="text-2xl font-bold">{allAuctions.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                <div className="flex items-center">
                  <FaUsers className="text-purple-500 text-2xl mr-4" />
                  <div>
                    <p className="text-gray-500">Total Users</p>
                    <p className="text-2xl font-bold">{viewAlluser.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        case 'current-bids':
        return (
          <div className="bg-gradient-to-br from-gray-50 to-white p-6 md:p-10 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center gap-2">
            🏷️ Current Auctions
          </h2>
    
          {/* Filter Controls */}
          <div className="flex flex-wrap gap-4 mb-8">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="🔍 Search by name or ID"
              className="px-4 py-3 border border-gray-300 rounded-md w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
    
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="💰 Min Price"
              className="px-4 py-3 border border-gray-300 rounded-md w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
    
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-md w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              <option value="">Sort By</option>
              <option value="startDate">Starting Date</option>
              <option value="endDate">Ending Date</option>
              <option value="highPrice">Highest Price</option>
              <option value="lowPrice">Lowest Price</option>
            </select>
          </div>
    
          {/* Auction Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto max-h-[500px] pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {filteredAuctionss.length > 0 ? (
              filteredAuctionss.map((auction) => (
                <div
                  key={auction.id}
                  className="bg-white border border-gray-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
                >
                  <Link
                    to={`/completed-auction/${auction.id}`}
                    className="flex flex-col flex-grow"
                  >
                    <div className="mb-4">
                      <h3 className="text-xl font-extrabold text-gray-900 mb-1 group-hover:text-blue-600">
                        {auction.name}
                      </h3>
                      <p className="text-sm text-gray-500">{auction.description}</p>
                    </div>
                    <div className="mt-auto">
                      <p className="text-lg font-extrabold text-amber-500 mb-1">
                        ₹{auction.startingPrice.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-400">
                        Ends: {new Date(auction.endDate).toLocaleString()}
                      </p>
                    </div>
                  </Link>
    
                  {/* Update and Delete Buttons */}
                  <div className="flex gap-4 mt-6">
                    <button
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white text-sm font-medium rounded-md transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdate(auction);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white text-sm font-medium rounded-md transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletes(auction);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-lg text-gray-500 col-span-full">
                No current auctions available.
              </p>
            )}
          </div>
        </div>

        );

      case 'upload-bid':
        return (
          <div className="bg-white/30 backdrop-blur-md border border-white/20 p-8 sm:p-10 rounded-2xl shadow-2xl mt-10 max-w-3xl mx-auto transition-all duration-500 ease-in-out transform hover:scale-105">
  <h3 className="text-3xl font-semibold mb-8 text-center text-gray-900 tracking-tight">
    📝 Create New Auction
  </h3>

  <form onSubmit={handleSubmit} className="space-y-6">
    
    {/* Feedback Messages */}
    {errorMessage && (
      <div className="bg-red-100 text-red-700 px-4 py-3 rounded-md text-sm shadow-md">
        {errorMessage}
      </div>
    )}
    {successMessage && (
      <div className="bg-green-100 text-green-700 px-4 py-3 rounded-md text-sm shadow-md">
        {successMessage}
      </div>
    )}

    {/* Auction Name */}
    <div>
      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Auction Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={auctionData.name}
        onChange={handleInputChange}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
        placeholder="e.g. Vintage Clock"
        required
      />
    </div>

    {/* Description */}
    <div>
      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">Description</label>
      <textarea
        id="description"
        name="description"
        value={auctionData.description}
        onChange={handleInputChange}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none transition-all duration-200"
        placeholder="Provide brief details about the item"
        rows={4}
        required
      />
    </div>

    {/* Starting Price */}
    <div>
      <label htmlFor="startingPrice" className="block mb-2 text-sm font-medium text-gray-700">Starting Price (₹)</label>
      <input
        type="number"
        id="startingPrice"
        name="startingPrice"
        value={auctionData.startingPrice}
        onChange={handleInputChange}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
        min={0}
        required
      />
    </div>

    {/* Start Date */}
    <div>
      <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-700">Start Date & Time</label>
      <input
        type="datetime-local"
        id="startDate"
        name="startDate"
        value={auctionData.startDate}
        onChange={handleInputChange}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
        required
      />
    </div>

    {/* End Date */}
    <div>
      <label htmlFor="endDate" className="block mb-2 text-sm font-medium text-gray-700">End Date & Time</label>
      <input
        type="datetime-local"
        id="endDate"
        name="endDate"
        value={auctionData.endDate}
        onChange={handleInputChange}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
        required
      />
    </div>

    {/* Submit Button */}
    <div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 text-white font-semibold rounded-lg text-lg shadow-md transition-all duration-300 ease-in-out transform ${
          isSubmitting
            ? 'bg-blue-300 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 hover:scale-[1.05]'
        }`}
      >
        {isSubmitting ? 'Submitting...' : 'Create Auction'}
      </button>
    </div>
  </form>
</div>


        );

        case 'user-details':
          return (
            <div className="p-6 min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]">
            <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">User Management</h1>
      
            {/* 🔍 Search Box */}
            <div className="mb-10 max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3 rounded-full shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
            </div>
      
            {/* 🧍 User Cards */}
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transform transition-transform hover:-translate-y-1 border border-gray-200 p-6"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">{user.username}</h2>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {user.status}
                      </span>
                    </div>
      
                    <div className="mt-6 space-y-2">
                      <p className="text-gray-600 text-sm mb-1">Account Visibility</p>
                      <div className="flex items-center space-x-6">
                        <label className="flex items-center cursor-pointer space-x-2">
                          <input
                            type="radio"
                            name={`status-${user.id}`}
                            checked={user.active === 1}
                            onChange={() => handleStatusChange(user.id, 'active')}
                            className="peer hidden"
                          />
                          <div className="w-4 h-4 rounded-full border-2 border-blue-500 peer-checked:bg-blue-500 transition-all"></div>
                          <span className="text-sm text-gray-700">Active</span>
                        </label>
      
                        <label className="flex items-center cursor-pointer space-x-2">
                          <input
                            type="radio"
                            name={`status-${user.id}`}
                            checked={user.active === 0}
                            onChange={() => handleStatusChange(user.id, 'inactive')}
                            className="peer hidden"
                          />
                          <div className="w-4 h-4 rounded-full border-2 border-yellow-500 peer-checked:bg-yellow-500 transition-all"></div>
                          <span className="text-sm text-gray-700">Inactive</span>
                        </label>
      
                        <Link
                              to={`/VerifingDocuments/${user.id}  `}
                              className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition inline-block text-center"
                            >
                              View Documents
                            </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 text-lg col-span-full">No matching users found.</p>
              )}
            </div>
          </div> 
          
        );
          case 'completed-auctions':
            return (
              <div className="min-h-screen py-12 px-6 bg-gradient-to-br from-blue-100 via-white to-pink-100">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-4xl font-extrabold mb-10 text-center text-gray-800 tracking-tight drop-shadow-md">
          Completed Auctions
        </h3>

        {/* 🔍 Filter Section */}
        <div className="flex flex-wrap gap-4 mb-10 justify-center items-center">
          <input
            type="text"
            placeholder="🔍 Search by name or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-5 py-3 border border-gray-300 rounded-xl w-full sm:w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
          <input
            type="number"
            placeholder="💰 Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="px-5 py-3 border border-gray-300 rounded-xl w-full sm:w-[180px] shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-5 py-3 border border-gray-300 rounded-xl w-full sm:w-[200px] shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
          >
            <option value="">🔃 Sort By</option>
            <option value="endDate">📅 Ending Date</option>
            <option value="highPrice">⬆️ Highest Price</option>
            <option value="lowPrice">⬇️ Lowest Price</option>
          </select>
        </div>

        {/* 🖼️ Auction Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredEndedAuctions.length > 0 ? (
            filteredEndedAuctions.map((auction) => (
              <div
                key={auction.id}
                className="bg-white/80 backdrop-blur-xl border border-gray-200 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-1"
              >
                <h4 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                  🏷️ {auction.name}
                </h4>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {auction.description}
                </p>

                <div className="flex justify-between items-end mt-6">
                  <div>
                    <p className="text-xl font-bold text-amber-600">
                      ₹{auction.startingPrice.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      ⏱️ {new Date(auction.endDate).toLocaleString()}
                    </p>
                  </div>
                  <Link to={`/completed-auction/${auction.id}`}>
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-200">
                      View →
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 text-lg col-span-full">
              🚫 No auctions found.
            </p>
          )}
        </div>
      </div>
    </div>

            )
          

        case 'all-auctions':
            return (
              <div className="p-6 sm:p-10 bg-gradient-to-br from-indigo-50 via-white to-pink-50 min-h-screen">
              <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12 tracking-tight">
                🎯 Auction Dashboard
              </h2>
        
              {/* 🔎 Filter Section */}
              <div className="flex flex-wrap gap-4 mb-10 justify-center">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or ID"
                  className="px-5 py-3 w-full sm:w-72 rounded-2xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                />
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min Price"
                  className="px-5 py-3 w-full sm:w-52 rounded-2xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
                />
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="px-5 py-3 w-full sm:w-60 rounded-2xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
                >
                  <option value="">Sort By</option>
                  <option value="startDate">Starting Date</option>
                  <option value="endDate">Ending Date</option>
                  <option value="highPrice">Highest Price</option>
                  <option value="lowPrice">Lowest Price</option>
                </select>
              </div>
        
              {/* 🧾 Auction Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAuctions.length > 0 ? (
                  filteredAuctions.map((auction) => (
                    <div
                      key={auction.id}
                      className="relative group p-6 bg-white/30 border border-white/50 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 hover:scale-[1.02]"
                    >
                      <h4 className="text-xl font-bold text-gray-800 mb-2 truncate">
                        {auction.name}
                      </h4>
                      <p className="text-sm text-gray-700 mb-4 line-clamp-2">{auction.description}</p>
        
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-lg font-bold text-green-600">
                            ₹{auction.startingPrice.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            ⏳ Ends: {new Date(auction.endDate).toLocaleString()}
                          </p>
                        </div>
                        <Link to={`/auction/${auction.id}`}>
                          <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm px-4 py-2 rounded-xl hover:scale-105 hover:shadow-lg transition-all">
                            View
                          </button>
                        </Link>
                      </div>
        
                      {/* Light overlay on hover */}
                      <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-lg text-gray-500 col-span-full">
                    🚫 No auctions found.
                  </p>
                )}
              </div>
            </div>


            );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onTabChange={handleTabChange} />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-6 overflow-y-auto">{renderContent()}</div>
        {showNotifications && <NotificationsPanel />}
      </div>
    </div>
  );
};

export default AdminDashboard;

function setUsers(arg0: any) {
  throw new Error('Function not implemented.');
}


// import React, { useState } from 'react';
// import Sidebar from '../components/dashboard/Sidebar';
// import Header from '../components/dashboard/Header';
// import NotificationsPanel from '../components/dashboard/NotificationsPanel';
// import { FaChartLine, FaUsers, FaHammer, FaCheckCircle } from 'react-icons/fa';
// import axios from 'axios';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// // Define the User type
// interface User {
//   id: string;
//   username: string;
//   email: string;
//   status: string;
// }
// const AdminDashboard: React.FC = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
// const [showNotifications, setShowNotifications] = useState(false);
// const [stats] = useState({
//   totalAuctions: 24,
//   activeAuctions: 5,
//   completedAuctions: 19,
//   totalUsers: 42,
//   revenue: '$28,750',
// });

// const [auctionData, setAuctionData] = useState({
//   name: '',
//   description: '',
//   startingPrice: '',
//   startDate: '',
//   endDate: '',
//   status: 'ACTIVE',
//   highestBidderId: null,
//   createdByAdminId: 1, // Example admin ID (hardcoded)
//   createdAt: new Date().toISOString(),
//   user: null, // User is null as per your input
// });

// const [isSubmitting, setIsSubmitting] = useState(false);
// const [errorMessage, setErrorMessage] = useState('');
// const [successMessage, setSuccessMessage] = useState('');
// const handleTabChange = (tab: string) => {
//   setActiveTab(tab);
// };

// const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//   const { name, value } = e.target;
//   setAuctionData((prevState) => ({
//     ...prevState,
//     [name]: value,
//   }));
// };

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setErrorMessage('');
//   setSuccessMessage('');

//   // Validate the form fields (if necessary, add validation here)
//   if (!auctionData.name || !auctionData.description || !auctionData.startingPrice || !auctionData.startDate || !auctionData.endDate) {
//     setErrorMessage('Please fill in all required fields.');
//     return;
//   }
 
  
//   // Prepare the auction data for submission
//   const formattedAuctionData = {
//     ...auctionData,
//     startingPrice: parseFloat(auctionData.startingPrice), // Ensure startingPrice is a number
//     startDate: new Date(auctionData.startDate).toISOString(), // Ensure startDate is in ISO format
//     endDate: new Date(auctionData.endDate).toISOString(), // Ensure endDate is in ISO format
//   };

//   // Log formatted auction data to verify the structure
//   console.log('Formatted Auction Data:', formattedAuctionData);

//   setIsSubmitting(true);

//   try {
//     // Make sure you're sending the correct payload
//     const response = await axios.post('http://localhost:8080/admin/inserting/auction', formattedAuctionData);

//     // On success
//     setSuccessMessage('Auction created successfully!');
//     console.log('Auction Created', response.data);
//   } catch (error) {
//     // On error
    
    
//   } finally {
//     setIsSubmitting(false);
//   }
// };


     
//   const [allAuctions, setAllAuctions] = useState([]); // Typed explicitly as Auction[]

// useEffect(() => {
//   // Define the async function inside useEffect
//   const fetchAllAuctions = async () => {
//     try {
//       const res = await axios.get('http://localhost:8080/auction/auctions');
//       console.log("Current Connection Data|", res.data); // Debugging fetched data
//       setAllAuctions(res.data); // Set the auctions data
//     } catch (error) {
//       console.error("Error fetching auctions:", error);
//     }
//   };

//   fetchAllAuctions(); // Call the async function
// }, []);

// useEffect(() => {
//   console.log("Current Auctions in the project:", allAuctions);
// }, [allAuctions]);



// //Current Auctions
// const [currentauctions, setCurrentauctions] = useState([]); // Typed explicitly as Auction[]


//   useEffect(() => {
//     // Define the async function inside useEffect
//     const fetchCurrentAuctions = async () => {
//       try {
//         const res = await axios.get('http://localhost:8080/auction/runningAuctions');
//         console.log("current Connection Data|"+res.data); // You might want to check the data here
//         setCurrentauctions(res.data); // Set the auctions data
        
       
//       } catch (error) {
//         console.error("Error fetching auctions:", error);
//       }
//     };

//     fetchCurrentAuctions(); // Call the async function
//   }, []);


//   //view All users
//   const [viewAlluser, setViewAlluser] = useState([]); // Typed explicitly as Auction[]


//   useEffect(() => {
//     // Define the async function inside useEffect
//     const fetchViewAllViewsers = async () => {
//       try {
//         const res = await axios.get('http://localhost:8080/admin/users');
//         console.log("current Connection Data|"+res.data); // You might want to check the data here
//         setViewAlluser(res.data); // Set the auctions data
        
       
//       } catch (error) {
//         console.error("Error fetching auctions:", error);
//       }
//     };

//     fetchViewAllViewsers(); // Call the async function
//   }, []);


//   useEffect(() => {
//     console.log("Current Auctions in the project:", viewAlluser);
//   }, [viewAlluser]);


//   const [ended, setEnded] = useState([]); // Typed explicitly as Auction[]


//   useEffect(() => {
//     // Define the async function inside useEffect
//     const fetchViewAllViewsers = async () => {
//       try {
//         const res = await axios.get('http://localhost:8080/auction/endedAuctions');
//         console.log("current Connection Data|"+res.data); // You might want to check the data here
//         setEnded(res.data); // Set the auctions data
        
       
//       } catch (error) {
//         console.error("Error fetching auctions:", error);
//       }
//     };

//     fetchViewAllViewsers(); // Call the async function
//   }, []);


//   useEffect(() => {
//     console.log("Current Auctions in the project:", viewAlluser);
//   }, [viewAlluser]);
  
  

//   const handleDelete = async (userId: string) => {
//     const confirmed = window.confirm("Are you sure you want to delete this user?");
//     if (!confirmed) return;
  
//     try {
//       const response = await axios.delete(`http://localhost:8080/admin/delete/${userId}`, {
//         headers: {
//           // Include Authorization only if your backend requires it
//           ...(localStorage.getItem("authToken") && {
//             Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           }),
//           "Content-Type": "application/json",
//         },
//       });
  
//       if (response.status === 204) {
//         // Update UI after successful deletion
//         setUsers((prevUsers: User[]) =>
//           prevUsers.filter((user: User) => user.id !== userId)
//         );
//         console.log("User deleted successfully.");
//       } else {
//         console.error("Unexpected response status:", response.status);
//         alert("Failed to delete the user. Please try again.");
//       }
//     } catch (error: any) {
//       console.error("Failed to delete user:", error);
//       if (error.response?.status === 403) {
//         alert("You do not have permission to delete this user.");
//       } else {
//         alert("An error occurred while deleting the user. Please try again later.");
//       }
//     }
//   };

  
  
//   const renderContent = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return (
//           <div className="space-y-6">
//             <div className="text-2xl font-bold text-gray-800">
//               Scrap Auction Admin Dashboard
//               <p className="text-gray-500 text-lg font-normal mt-2">
//                 Monitor and manage your scrap auction platform
//               </p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
//                 <div className="flex items-center">
//                   <FaHammer className="text-blue-500 text-2xl mr-4" />
//                   <div>
//                     <p className="text-gray-500">Active Auctions</p>
//                     <p className="text-2xl font-bold">{stats.activeAuctions}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
//                 <div className="flex items-center">
//                   <FaCheckCircle className="text-green-500 text-2xl mr-4" />
//                   <div>
//                     <p className="text-gray-500">Completed Auctions</p>
//                     <p className="text-2xl font-bold">{stats.completedAuctions}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
//                 <div className="flex items-center">
//                   <FaUsers className="text-purple-500 text-2xl mr-4" />
//                   <div>
//                     <p className="text-gray-500">Total Users</p>
//                     <p className="text-2xl font-bold">{stats.totalUsers}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
//                 <div className="flex items-center">
//                   <FaChartLine className="text-yellow-500 text-2xl mr-4" />
//                   <div>
//                     <p className="text-gray-500">Total Revenue</p>
//                     <p className="text-2xl font-bold">{stats.revenue}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//         case 'current-bids':
//         return (
//             <div>
//             <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
             
//               Current Auctions
//             </h2>
// {/* current data */}
//             <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2 scrollbar-thin">
//               {currentauctions.map((auction) => (
                
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="text-lg font-medium text-white mb-1">{auction.name}</h3>
//                       <p className="text-base text-blue-200">{auction.description}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-lg font-bold text-amber-400">
//                         {(auction.startingPrice)}
//                       </p>
//                       <p className="text-base text-red-200">
//                         {(auction.endDate)}
//                       </p>
//                     </div>
//                   </div>
             
//               ))}
//             </div>
//           </div>
//         );

//       case 'upload-bid':
//         return (
//           <div className="bg-white p-6 rounded-lg shadow-md mt-6">
//   <h3 className="text-xl font-semibold mb-4">Insert New Auction</h3>
//   <form onSubmit={handleSubmit} className="space-y-4">
//     {errorMessage && <div className="text-red-500">{errorMessage}</div>}
//     {successMessage && <div className="text-green-500">{successMessage}</div>}

//     <div>
//       <label htmlFor="name" className="block text-gray-700">Auction Name</label>
//       <input
//         type="text"
//         id="name"
//         name="name"
//         value={auctionData.name}
//         onChange={handleInputChange}
//         className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
//         required
//       />
//     </div>

//     <div>
//       <label htmlFor="description" className="block text-gray-700">Description</label>
//       <textarea
//         id="description"
//         name="description"
//         value={auctionData.description}
//         onChange={handleInputChange}
//         className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
//         required
//       />
//     </div>

//     <div>
//       <label htmlFor="startingPrice" className="block text-gray-700">Starting Price</label>
//       <input
//         type="number"
//         id="startingPrice"
//         name="startingPrice"
//         value={auctionData.startingPrice}
//         onChange={handleInputChange}
//         className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
//         required
//       />
//     </div>

//     <div>
//       <label htmlFor="startDate" className="block text-gray-700">Start Date</label>
//       <input
//         type="datetime-local"
//         id="startDate"
//         name="startDate"
//         value={auctionData.startDate}
//         onChange={handleInputChange}
//         className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
//         required
//       />
//     </div>

//     <div>
//       <label htmlFor="endDate" className="block text-gray-700">End Date</label>
//       <input
//         type="datetime-local"
//         id="endDate"
//         name="endDate"
//         value={auctionData.endDate}
//         onChange={handleInputChange}
//         className="mt-2 block w-full p-3 border border-gray-300 rounded-md"
//         required
//       />
//     </div>

//     <div>
//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="bg-blue-600 text-white py-3 px-6 rounded-md w-full"
//       >
//         {isSubmitting ? 'Submitting...' : 'Create Auction'}
//       </button>
//     </div>
//   </form>
// </div>

//         );

//         case 'user-details':
//           return (
//             <div className="bg-white p-6 rounded-lg shadow-md mt-6">
//   <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Users</h2>
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//     {viewAlluser.length > 0 ? (
//       viewAlluser.map((user: any) => (
//         <div
//           key={user.id}
//           className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
//         >
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">{user.username}</h3>
//           <p className="text-sm text-gray-600 mb-2">{user.email}</p>
//           <div
//             className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
//               user.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
//             }`}
//           >
//             {user.status}
//           </div>
//           <div className="mt-4">
//             <p className="text-sm text-gray-500">ID: {user.id}</p>
//           </div>

//           {/* Delete Button */}
//           <button
//             className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 focus:outline-none"
//             onClick={() => handleDelete(user.id)}
//           >
//             Delete
//           </button>
//         </div>
//       ))
//     ) : (
//       <p className="text-center text-lg text-gray-600 col-span-full">No users found.</p>
//     )}
//   </div>
// </div>

//           );
//           case 'completed-auctions':
//             return (
//               <div className="bg-white p-6 rounded-lg shadow-md mt-6">
//               <h3 className="text-xl font-semibold mb-4 text-gray-800">Completed Auctions</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {ended.map((auction) => (
//                   <div
//                     key={auction.id}
//                     className="bg-gray-50 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
//                   >
//                     <h3 className="text-lg font-semibold text-gray-900 mb-2">{auction.name}</h3>
//                     <p className="text-base text-gray-700 mb-4">{auction.description}</p>
            
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="text-lg font-bold text-amber-400">${auction.startingPrice.toFixed(2)}</p>
//                         <p className="text-sm text-red-500">{new Date(auction.endDate).toLocaleString()}</p>
//                       </div>
//                       <div>
//                         <button
//                           className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
//                         >
//                           View Auction
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             )
          

//         case 'all-auctions':
//             return (
//               <div className="bg-white p-6 rounded-lg shadow-md mt-6">
//               <h3 className="text-xl font-semibold mb-4 text-gray-800">All Auctions</h3>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {allAuctions.map((auction) => (
//                   <div
//                     key={auction.id}
//                     className="bg-gray-50 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
//                   >
//                     <h3 className="text-lg font-semibold text-gray-900 mb-2">{auction.name}</h3>
//                     <p className="text-base text-gray-700 mb-4">{auction.description}</p>
            
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="text-lg font-bold text-amber-400">${auction.startingPrice.toFixed(2)}</p>
//                         <p className="text-sm text-red-500">{new Date(auction.endDate).toLocaleString()}</p>
//                       </div>
//                       <div>
//                         <button
//                           className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
//                         >
//                           View Auction
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
            


//             );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar onTabChange={handleTabChange} />
//       <div className="flex-1 flex flex-col">
//         <Header />
//         <div className="flex-1 p-6 overflow-y-auto">{renderContent()}</div>
//         {showNotifications && <NotificationsPanel />}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// function setUsers(arg0: any) {
//   throw new Error('Function not implemented.');
// }
