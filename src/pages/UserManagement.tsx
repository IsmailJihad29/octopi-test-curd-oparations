/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaEye, FaPen, FaTrashAlt } from "react-icons/fa";
import { useGetUsersQuery, useDeleteUserMutation } from "../redux/api/baseApi";
import Header from "../components/Header";
import AddUserModal from "../components/AddUserModal";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const UserManagement = () => {
  const { data: users, isLoading } = useGetUsersQuery("");
  const [deleteUser] = useDeleteUserMutation(); // Hook for deleting users
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (userId: string) => {
    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(userId).unwrap();
          Swal.fire("Deleted!", "User has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to delete the user.", "error");
        }
      }
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* Header */}
      <Header />

      {/* Content */}
      <div className="mt-6">
        <div className="p-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
          >
            Add User
          </button>

          <AddUserModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>

        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <table className="min-w-full table-auto">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold">Image</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Name</th>
                <th className="py-3 px-4 text-left text-sm font-semibold hidden md:table-cell">Email</th>
                <th className="py-3 px-4 text-left text-sm font-semibold hidden lg:table-cell">Phone</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <tr key={index} className="border-b animate-pulse">
                      <td className="py-3 px-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell">
                        <div className="h-4 w-48 bg-gray-200 rounded"></div>
                      </td>
                      <td className="py-3 px-4 hidden lg:table-cell">
                        <div className="h-4 w-28 bg-gray-200 rounded"></div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                      </td>
                    </tr>
                  ))
                : users?.map((user: any) => (
                    <tr key={user._id} className="border-b hover:bg-blue-50 transition duration-200 ease-in-out">
                      <td className="py-3 px-4">
                        <img
                          src={user.image}
                          alt="User"
                          className="w-12 h-12 rounded-full border border-gray-300 shadow-sm"
                        />
                      </td>
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4 hidden md:table-cell">{user.email}</td>
                      <td className="py-3 px-4 hidden lg:table-cell">{user.phone}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-4">
                         <Link to={`/users/details/${user._id}`}>
                         <button className="text-green-600 hover:text-green-800">
                            <FaEye />
                          </button>
                          </Link>
                          <Link to={`/users/edit/${user._id}`} className="text-blue-600 hover:text-blue-800">
                            <FaPen />
                          </Link>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
