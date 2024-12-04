import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaPhoneAlt, FaMapMarkerAlt, FaGlobe, FaUniversity, FaSpinner } from "react-icons/fa";
import { useGetUserByIdQuery } from "../redux/api/baseApi";
import 'animate.css'; // Importing Animate.css for animations

// Loading Component
const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 rounded-2xl shadow-lg animate__animated animate__fadeIn">
        <FaSpinner className="text-white text-6xl animate__animated animate__spin infinite animate__slow" />
        <p className="mt-4 text-white text-xl font-semibold animate__animated animate__fadeIn animate__delay-1s">
          Loading user details...
        </p>
      </div>
    </div>
  );
};

const UserDetails = () => {
  const { userId } = useParams(); // Get user ID from the URL
  const { data: user, isLoading, isError } = useGetUserByIdQuery(userId);

  if (isLoading) {
    return <Loading />; // Display the loading component while loading user data
  }

  if (isError || !user) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p>Failed to load user details. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center my-10 text-primary-font">
      <div className="container mx-auto p-4 md:p-6 bg-white rounded-3xl shadow-xl max-w-4xl relative overflow-hidden">
        {/* Hero Section with Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-20 z-0"></div>
        <div className="relative z-10 text-center py-10 animate__animated animate__fadeIn">
          <img
            src={user.image}
            alt={user.name}
            className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg transform transition-all duration-300 hover:scale-110"
          />
          <h1 className="text-3xl font-extrabold text-white mt-4 animate__animated animate__fadeIn animate__delay-1s">{user.name}</h1>
          <p className="text-xl text-white opacity-80 animate__animated animate__fadeIn animate__delay-1.5s">{user.email}</p>
        </div>

        {/* Back Button */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-4 transform transition-all duration-300 hover:scale-110"
        >
          <FaArrowLeft />
          <span>Back to Users</span>
        </Link>

        <div className="mt-6 space-y-6">
          {/* User Details Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 border border-gray-200">
            {/* Contact Details Section */}
            <div className="text-gray-800 space-y-3">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <FaPhoneAlt className="text-blue-600" />
                <span>Contact Details</span>
              </h2>
              <p className="text-gray-600">Phone: {user.phone}</p>
              <p className="text-gray-600">
                <FaMapMarkerAlt className="inline mr-2" /> Address: {user.address || "N/A"}
              </p>
              <p className="text-gray-600">
                <FaGlobe className="inline mr-2" /> Website:{" "}
                <a href={user.website} target="_blank" className="text-blue-600 hover:underline">{user.website}</a>
              </p>
              <p className="text-gray-600">Nationality: {user.nationality || "N/A"}</p>
            </div>

            {/* Educational Information Section */}
            <div className="text-gray-800 space-y-3">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <FaUniversity className="text-blue-600" />
                <span>Educational Information</span>
              </h2>
              <p className="text-gray-600">Degree: {user.educationalQualifications.degree || "N/A"}</p>
              <p className="text-gray-600">University: {user.educationalQualifications.university || "N/A"}</p>
              <p className="text-gray-600">Session: {user.educationalQualifications.session || "N/A"}</p>
              <p className="text-gray-600">CGPA: {user.educationalQualifications.cgpa || "N/A"}</p>
            </div>

            {/* Additional Info Section */}
            <div className="text-gray-800 space-y-3">
              <h2 className="text-xl font-semibold">Additional Information</h2>
              <p className="text-gray-600">Age: {user.age || "N/A"}</p>
              <p className="text-gray-600">Gender: {user.gender || "N/A"}</p>
              <p className="text-gray-600">Skills: {user.skills.join(", ") || "N/A"}</p>
              <p className="text-gray-600">NID: {user.nid || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
