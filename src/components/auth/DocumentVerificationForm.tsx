// import React, { useState } from 'react';
// import { Upload, FileText, Building2, User, Mail, Phone, MapPin } from 'lucide-react';
// import Button from '../ui/Button';
// import Input from '../ui/Input';

// interface DocumentVerificationFormProps {
//   onSuccess: () => void;
//   onClose: () => void;
// }

// const DocumentVerificationForm: React.FC<DocumentVerificationFormProps> = ({ onSuccess, onClose }) => {
//   const [formData, setFormData] = useState({
//     businessName: '',
//     businessType: '',
//     registrationNumber: '',
//     taxId: '',
//     address: '',
//     city: '',
//     state: '',
//     country: '',
//     zipCode: '',
//     contactPerson: '',
//     email: '',
//     phone: '',
//     documents: {
//       businessRegistration: null as File | null,
//       taxCertificate: null as File | null,
//       bankStatement: null as File | null,
//       idProof: null as File | null,
//     }
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isLoading, setIsLoading] = useState(false);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name } = e.target;
//     const file = e.target.files?.[0] || null;
    
//     setFormData(prev => ({
//       ...prev,
//       documents: {
//         ...prev.documents,
//         [name]: file
//       }
//     }));
//   };

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     // Required fields validation
//     const requiredFields = [
//       'businessName', 'businessType', 'registrationNumber', 'taxId',
//       'address', 'city', 'state', 'country', 'zipCode',
//       'contactPerson', 'email', 'phone'
//     ];

//     requiredFields.forEach(field => {
//       if (!formData[field as keyof typeof formData]) {
//         newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
//       }
//     });

//     // Email validation
//     if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Invalid email format';
//     }

//     // Phone validation
//     if (formData.phone && !/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
//       newErrors.phone = 'Invalid phone number';
//     }

//     // Document validation
//     Object.entries(formData.documents).forEach(([key, value]) => {
//       if (!value) {
//         newErrors[key] = `${key.split(/(?=[A-Z])/).join(' ')} is required`;
//       }
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // Create FormData object for file upload
//       const submitData = new FormData();
      
//       // Append all form fields
//       Object.entries(formData).forEach(([key, value]) => {
//         if (key === 'documents') {
//           Object.entries(value).forEach(([docKey, docValue]) => {
//             if (docValue) {
//               submitData.append(`documents.${docKey}`, docValue);
//             }
//           });
//         } else {
//           submitData.append(key, value as string);
//         }
//       });

//       // Make API call to submit verification
//       const response = await fetch('http://localhost:8080/api/auth/verify-documents', {
//         method: 'POST',
//         body: submitData,
//       });

//       if (response.ok) {
//         onSuccess();
//       } else {
//         const error = await response.text();
//         setErrors({ submit: error });
//       }
//     } catch (error) {
//       setErrors({ submit: 'An error occurred while submitting the form' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {errors.submit && (
//         <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
//           {errors.submit}
//         </div>
//       )}

//       {/* Business Information */}
//       <div className="space-y-4">
//         <h3 className="text-lg font-semibold flex items-center">
//           <Building2 className="h-5 w-5 mr-2" />
//           Business Information
//         </h3>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <Input
//             label="Business Name"
//             name="businessName"
//             value={formData.businessName}
//             onChange={handleInputChange}
//             error={errors.businessName}
//             required
//           />
          
//           <Input
//             label="Business Type"
//             name="businessType"
//             value={formData.businessType}
//             onChange={handleInputChange}
//             error={errors.businessType}
//             required
//           />
          
//           <Input
//             label="Registration Number"
//             name="registrationNumber"
//             value={formData.registrationNumber}
//             onChange={handleInputChange}
//             error={errors.registrationNumber}
//             required
//           />
          
//           <Input
//             label="Tax ID"
//             name="taxId"
//             value={formData.taxId}
//             onChange={handleInputChange}
//             error={errors.taxId}
//             required
//           />
//         </div>
//       </div>

//       {/* Address Information */}
//       <div className="space-y-4">
//         <h3 className="text-lg font-semibold flex items-center">
//           <MapPin className="h-5 w-5 mr-2" />
//           Address Information
//         </h3>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <Input
//             label="Address"
//             name="address"
//             value={formData.address}
//             onChange={handleInputChange}
//             error={errors.address}
//             required
//           />
          
//           <Input
//             label="City"
//             name="city"
//             value={formData.city}
//             onChange={handleInputChange}
//             error={errors.city}
//             required
//           />
          
//           <Input
//             label="State"
//             name="state"
//             value={formData.state}
//             onChange={handleInputChange}
//             error={errors.state}
//             required
//           />
          
//           <Input
//             label="Country"
//             name="country"
//             value={formData.country}
//             onChange={handleInputChange}
//             error={errors.country}
//             required
//           />
          
//           <Input
//             label="ZIP Code"
//             name="zipCode"
//             value={formData.zipCode}
//             onChange={handleInputChange}
//             error={errors.zipCode}
//             required
//           />
//         </div>
//       </div>

//       {/* Contact Information */}
//       <div className="space-y-4">
//         <h3 className="text-lg font-semibold flex items-center">
//           <User className="h-5 w-5 mr-2" />
//           Contact Information
//         </h3>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <Input
//             label="Contact Person"
//             name="contactPerson"
//             value={formData.contactPerson}
//             onChange={handleInputChange}
//             error={errors.contactPerson}
//             required
//           />
          
//           <Input
//             label="Email"
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             error={errors.email}
//             required
//           />
          
//           <Input
//             label="Phone"
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleInputChange}
//             error={errors.phone}
//             required
//           />
//         </div>
//       </div>

//       {/* Document Upload */}
//       <div className="space-y-4">
//         <h3 className="text-lg font-semibold flex items-center">
//           <FileText className="h-5 w-5 mr-2" />
//           Required Documents
//         </h3>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Business Registration Certificate
//             </label>
//             <input
//               type="file"
//               name="businessRegistration"
//               onChange={handleFileChange}
//               className="block w-full text-sm text-gray-500
//                 file:mr-4 file:py-2 file:px-4
//                 file:rounded-md file:border-0
//                 file:text-sm file:font-semibold
//                 file:bg-blue-50 file:text-blue-700
//                 hover:file:bg-blue-100"
//               accept=".pdf,.doc,.docx"
//             />
//             {errors.businessRegistration && (
//               <p className="mt-1 text-sm text-red-600">{errors.businessRegistration}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Tax Certificate
//             </label>
//             <input
//               type="file"
//               name="taxCertificate"
//               onChange={handleFileChange}
//               className="block w-full text-sm text-gray-500
//                 file:mr-4 file:py-2 file:px-4
//                 file:rounded-md file:border-0
//                 file:text-sm file:font-semibold
//                 file:bg-blue-50 file:text-blue-700
//                 hover:file:bg-blue-100"
//               accept=".pdf,.doc,.docx"
//             />
//             {errors.taxCertificate && (
//               <p className="mt-1 text-sm text-red-600">{errors.taxCertificate}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Bank Statement (Last 3 months)
//             </label>
//             <input
//               type="file"
//               name="bankStatement"
//               onChange={handleFileChange}
//               className="block w-full text-sm text-gray-500
//                 file:mr-4 file:py-2 file:px-4
//                 file:rounded-md file:border-0
//                 file:text-sm file:font-semibold
//                 file:bg-blue-50 file:text-blue-700
//                 hover:file:bg-blue-100"
//               accept=".pdf,.doc,.docx"
//             />
//             {errors.bankStatement && (
//               <p className="mt-1 text-sm text-red-600">{errors.bankStatement}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               ID Proof
//             </label>
//             <input
//               type="file"
//               name="idProof"
//               onChange={handleFileChange}
//               className="block w-full text-sm text-gray-500
//                 file:mr-4 file:py-2 file:px-4
//                 file:rounded-md file:border-0
//                 file:text-sm file:font-semibold
//                 file:bg-blue-50 file:text-blue-700
//                 hover:file:bg-blue-100"
//               accept=".pdf,.jpg,.jpeg,.png"
//             />
//             {errors.idProof && (
//               <p className="mt-1 text-sm text-red-600">{errors.idProof}</p>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-end space-x-4">
//         <Button
//           type="button"
//           variant="outline"
//           onClick={onClose}
//         >
//           Cancel
//         </Button>
//         <Button
//           type="submit"
//           variant="primary"
//           isLoading={isLoading}
//         >
//           <Upload className="h-4 w-4 mr-2" />
//           Submit Verification
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default DocumentVerificationForm; 

import React, { useEffect, useState } from 'react';

interface UserData {
  id: string;
  name: string;
  email: string;
  [key: string]: any;
}

const DocumentVerificationForm: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [formData, setFormData] = useState({
    businessRegistration: null as File | null,
    taxCertificate: null as File | null,
    bankStatement: null as File | null,
    idProof: null as File | null,
  });
  const [errors, setErrors] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUserData(parsed);
      } catch (err) {
        console.error("Invalid userData in localStorage", err);
        setErrors("Failed to load user data. Please login again.");
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    const { files } = e.target;
    if (files && files[0]) {
      const originalFile = files[0];
      const fileExtension = originalFile.name.split('.').pop() || '';
      const newFileName = `${docType}.${fileExtension}`;
      const renamedFile = new File([originalFile], newFileName, { type: originalFile.type });

      setFormData(prev => ({ ...prev, [docType]: renamedFile }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors('');
    setSuccess(false);

    if (!userData?.id) {
      setErrors('User ID not found. Please login again.');
      return;
    }

    const data = new FormData();
    if (formData.businessRegistration) data.append('files', formData.businessRegistration);
    if (formData.taxCertificate) data.append('files', formData.taxCertificate);
    if (formData.bankStatement) data.append('files', formData.bankStatement);
    if (formData.idProof) data.append('files', formData.idProof);

    try {
      const response = await fetch(`https://metaauction.onrender.com/documents/upload/${userData.id}`, {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Upload failed');
      }

      setSuccess(true);
    } catch (err: any) {
      setErrors(err.message);
    }
  };

  const handleChangeHome = () => {
    window.location.href = '/';
  };

  const uploadedCount = Object.values(formData).filter(file => file !== null).length;
  const totalDocs = 4;
  const progressPercentage = (uploadedCount / totalDocs) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-teal-50 py-8">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Document Verification</h2>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress: {uploadedCount}/{totalDocs} documents uploaded</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-teal-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {userData && (
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setIsUserInfoOpen(!isUserInfoOpen)}
              className="w-full flex justify-between items-center p-3 bg-gray-100 rounded-md text-gray-900 text-sm font-semibold hover:bg-gray-200"
            >
              <span>User Information</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isUserInfoOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${isUserInfoOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="p-4 bg-gray-50 rounded-md border border-gray-300 mt-2 shadow-sm">
                <p className="text-sm text-gray-700"><strong>ID:</strong> {userData.id}</p>
                <p className="text-sm text-gray-700"><strong>Email:</strong> {userData.email}</p>
                {Object.entries(userData).map(([key, value]) => (
                  key !== 'id' && key !== 'name' && key !== 'email' && (
                    <p key={key} className="text-sm text-gray-700"><strong>{key}:</strong> {value}</p>
                  )
                ))}
              </div>
            </div>
          </div>
        )}

        <div aria-live="polite">
          {errors && <p className="text-sm text-red-600 mb-4 font-medium">{errors}</p>}
          {success && <p className="text-sm text-green-600 mb-4 font-medium">Documents submitted successfully!</p>}
        </div>

        <div className="space-y-4">
          {[
            { name: 'businessRegistration', label: 'Business Registration Document' },
            { name: 'taxCertificate', label: 'Tax Certificate' },
            { name: 'bankStatement', label: 'Bank Statement' },
            { name: 'idProof', label: 'ID Proof' },
          ].map(({ name, label }) => (
            <div key={name} className="bg-blue-50 p-4 rounded-md border border-blue-200 shadow-sm">
              <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  id={name}
                  name={name}
                  accept=".pdf,.jpg,.png"
                  onChange={(e) => handleChange(e, name)}
                  required
                  className="block flex-1 text-sm text-gray-800 border border-blue-300 rounded-md p-2 bg-white hover:border-blue-500 focus:border-blue-600 focus:outline-none"
                />
              </div>
              {formData[name as keyof typeof formData] && (
                <p className="text-sm text-gray-600 mt-1">Selected: {formData[name as keyof typeof formData]?.name}</p>
              )}
            </div>
          ))}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 active:bg-teal-800 shadow-sm"
            >
              Submit Documents
            </button>
            <button
              type="button"
              onClick={handleChangeHome}
              className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 active:bg-gray-700 shadow-sm"
            >
              Verify Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentVerificationForm;
