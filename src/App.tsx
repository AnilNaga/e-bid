// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import { AuctionProvider } from './context/AuctionContext';
// import HomePage from './pages/HomePage';
// import AuctionListPage from './pages/AuctionListPage';
// import AuctionDetailPage from './pages/AuctionDetailPage';
// import CategoriesPage from './pages/CategoriesPage';
// import HowItWorksPage from './pages/HowItWorksPage';
// import ServicesPage from './pages/ServicesPage';
// import SearchPage from './pages/SearchPage';
// import RegisterPage from './pages/RegisterPage';
// import AuctionUserDashboard from './components/layout/Dashboard';
// import UserProfile from './components/layout/userProfile';
// import UpdateProfile from './components/layout/updateUser';
// import AdminDashboard from './pages/AdminDashboard';
// import CompletedAuctionDetailPage from './pages/CompletedAuctionDetailPage';
// import UpdateAuctionForm from './pages/auctionUpdate';
// import CurrentAuctionDetailPage from './pages/CurrectAuctions';
// import DocumentVerificationForm from './components/auth/DocumentVerificationForm';
// import VerifyingDocuments from './pages/VerifyingDocuments';

// function App() {
//   return (
//     <AuthProvider>
//       <AuctionProvider>
//         <Router>
//           <Routes>
//             {/**permit all */}
//             <Route path="/" element={<HomePage />} />
//             <Route path="/auctions" element={<AuctionListPage />} />
//             <Route path="/auction/:id" element={<AuctionDetailPage />} />   
//             <Route path="/categories" element={<CategoriesPage />} />
//             <Route path="/how-it-works" element={<HowItWorksPage />} />
//             <Route path="/services" element={<ServicesPage />} />
//             <Route path="/search" element={<SearchPage />} />
//             <Route path="/register" element={<RegisterPage />} />


//             {/**only admin can acces */}
//             <Route 
//               path="/DocumentVerificationForm" 
//               element={<DocumentVerificationForm onSuccess={() => {}} onClose={() => {}} />} 
//             />
//              <Route path="/admin" element={<AdminDashboard />} />
//              <Route path="/UpdateAuctionForm" element={<UpdateAuctionForm />} />
//              <Route path="/VerifingDocuments/:userId" element={<VerifyingDocuments />} />
//              <Route path="/completed-auction/:id" element={<CompletedAuctionDetailPage />} />          
//              <Route path="/CurrentAuctionDetailPage" element={<CurrentAuctionDetailPage />} />

            

//             {/**only user can assec */}
//             <Route path="/AuctionUserDashboard" element={<AuctionUserDashboard />} />
//             <Route path="/UserProfile" element={<UserProfile />} />
//             <Route path="/UpdateProfile" element={<UpdateProfile />} />
          
//           </Routes>
//         </Router>
//       </AuctionProvider>
//     </AuthProvider>
//   );
// }

//  export default App;
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import { AuctionProvider } from './context/AuctionContext';
// import HomePage from './pages/HomePage';
// import AuctionListPage from './pages/AuctionListPage';
// import AuctionDetailPage from './pages/AuctionDetailPage';
// import CategoriesPage from './pages/CategoriesPage';
// import HowItWorksPage from './pages/HowItWorksPage';
// import ServicesPage from './pages/ServicesPage';
// import SearchPage from './pages/SearchPage';
// import RegisterPage from './pages/RegisterPage';
// import AuctionUserDashboard from './components/layout/Dashboard';
// import UserProfile from './components/layout/userProfile';
// import UpdateProfile from './components/layout/updateUser';
// import AdminDashboard from './pages/AdminDashboard';
// import CompletedAuctionDetailPage from './pages/CompletedAuctionDetailPage';
// import UpdateAuctionForm from './pages/auctionUpdate';
// import CurrentAuctionDetailPage from './pages/CurrectAuctions';
// import DocumentVerificationForm from './components/auth/DocumentVerificationForm';
// import VerifyingDocuments from './pages/VerifyingDocuments';
// import ProtectedRoute from './context/ProtectedRoute';// Import the ProtectedRoute component

// function App() {
//   return (
//     <AuthProvider>
//       <AuctionProvider>
//         <Router>
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<HomePage />} />
//             <Route path="/DocumentVerificationForm" element={<DocumentVerificationForm onSuccess={() => {}} onClose={() => {}} />} />
//             <Route path="/auctions" element={<AuctionListPage />} />
//             <Route path="/auction/:id" element={<AuctionDetailPage />} />
//             <Route path="/categories" element={<CategoriesPage />} />
//             <Route path="/how-it-works" element={<HowItWorksPage />} />
//             <Route path="/services" element={<ServicesPage />} />
//             <Route path="/search" element={<SearchPage />} />
//             <Route path="/register" element={<RegisterPage />} />
            
//             {/* Protected Routes for Users */}
//             <Route path="/AuctionUserDashboard" element={<ProtectedRoute role="user"><AuctionUserDashboard /></ProtectedRoute>} />
//             <Route path="/UserProfile" element={<ProtectedRoute role="user"><UserProfile /></ProtectedRoute>} />
//             <Route path="/UpdateProfile" element={<ProtectedRoute role="user"><UpdateProfile /></ProtectedRoute>} />

//             {/* Protected Routes for Admin */}
//             <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
//             <Route path="/UpdateAuctionForm" element={<ProtectedRoute role="admin"><UpdateAuctionForm /></ProtectedRoute>} />
//             <Route path="/CompletedAuctionDetailPage" element={<ProtectedRoute role="admin"><CompletedAuctionDetailPage /></ProtectedRoute>} />
//             <Route path="/VerifyingDocuments/:userId" element={<ProtectedRoute role="admin"><VerifyingDocuments /></ProtectedRoute>} />
            
//             {/* Other Routes */}
//             <Route path="/CurrentAuctionDetailPage" element={<CurrentAuctionDetailPage />} />
//             {/* Add more routes as needed */}
//           </Routes>
//         </Router>
//       </AuctionProvider>
//     </AuthProvider>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuctionProvider } from './context/AuctionContext';

import HomePage from './pages/HomePage';
import AuctionListPage from './pages/AuctionListPage';
import AuctionDetailPage from './pages/AuctionDetailPage';
import CategoriesPage from './pages/CategoriesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ServicesPage from './pages/ServicesPage';
import SearchPage from './pages/SearchPage';
import RegisterPage from './pages/RegisterPage';

import AuctionUserDashboard from './components/layout/Dashboard';
import UserProfile from './components/layout/userProfile';
import UpdateProfile from './components/layout/updateUser';

import AdminDashboard from './pages/AdminDashboard';
import CompletedAuctionDetailPage from './pages/CompletedAuctionDetailPage';
import UpdateAuctionForm from './pages/auctionUpdate';
import CurrentAuctionDetailPage from './pages/CurrectAuctions';
import DocumentVerificationForm from './components/auth/DocumentVerificationForm';
import VerifyingDocuments from './pages/VerifyingDocuments';

import ProtectedRoute from './context/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <AuctionProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/auctions" element={<AuctionListPage />} />
            <Route path="/auction/:id" element={<AuctionDetailPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Admin-only Routes */}
            <Route
              path="/DocumentVerificationForm"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <DocumentVerificationForm onSuccess={() => {}} onClose={() => {}} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/UpdateAuctionForm"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <UpdateAuctionForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/VerifingDocuments/:userId"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <VerifyingDocuments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/completed-auction/:id"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <CompletedAuctionDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/CurrentAuctionDetailPage"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <CurrentAuctionDetailPage />
                </ProtectedRoute>
              }
            />

            {/* User-only Routes */}
            <Route
              path="/AuctionUserDashboard"
              element={
                <ProtectedRoute allowedRoles={['USER']}>
                  <AuctionUserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/UserProfile"
              element={
                <ProtectedRoute allowedRoles={['USER']}>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/UpdateProfile"
              element={
                <ProtectedRoute allowedRoles={['USER']}>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuctionProvider>
    </AuthProvider>
  );
}

export default App;
