import React, { useState, useEffect } from "react";
import { useUpdateUserMutation, useGetUserByIdQuery } from "../redux/api/baseApi";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateUsers: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetUserByIdQuery(userId);
  console.log(user);
  const [updateUser] = useUpdateUserMutation();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [nid, setNid] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [gender, setGender] = useState("");
  const [educationalQualifications, setEducationalQualifications] = useState({
    degree: "",
    university: "",
    session: "",
    cgpa: "",
  });

  useEffect(() => {
    if (user) {
      setName(user.name);
      setImage(user.image);
      setAge(user.age);
      setNationality(user.nationality);
      setSkills(user.skills || []);
      setNid(user.nid);
      setAddress(user.address);
      setEmail(user.email);
      setPhone(user.phone);
      setWebsite(user.website);
      setGender(user.gender);
      setEducationalQualifications(user.educationalQualifications || {
        degree: "",
        university: "",
        session: "",
        cgpa: "",
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData = {
      name,
      image,
      age,
      nationality,
      skills,
      nid,
      address,
      email,
      phone,
      website,
      gender,
      educationalQualifications,
    };

    try {
      await updateUser({ userId, ...updatedData });

      Swal.fire({
        position: "center",
        icon: "success",
        title: "User updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/"); // Navigate to users list or another desired page
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (isLoading) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
        Update User
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-primary-font"
      >
        {/* Left Column */}
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 transition-all p-2"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              id="image"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 transition-all p-2"
            />
          </div>

          <div>
            <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">
              Nationality
            </label>
            <input
              id="nationality"
              type="text"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 transition-all p-2"
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 transition-all p-2"
            />
          </div>

          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
              Skills
            </label>
            <input
              id="skills"
              type="text"
              value={skills.join(", ")}
              onChange={(e) =>
                setSkills(e.target.value.split(",").map((skill) => skill.trim()))
              }
              className="mt-2 block w-full rounded-md border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 transition-all p-2"
            />
          </div>

          <div>
            <label htmlFor="nid" className="block text-sm font-medium text-gray-700">
              NID
            </label>
            <input
              id="nid"
              type="text"
              value={nid}
              onChange={(e) => setNid(e.target.value)}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 transition-all p-2"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 transition-all p-2"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 transition-all p-2"
            />
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
              Website
            </label>
            <input
              id="website"
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 transition-all p-2"
            />
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 transition-all p-2"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="educational-qualifications" className="block text-sm font-medium text-gray-700">
              Educational Qualifications
            </label>
            <input
              type="text"
              placeholder="Degree"
              value={educationalQualifications.degree}
              onChange={(e) =>
                setEducationalQualifications({
                  ...educationalQualifications,
                  degree: e.target.value,
                })
              }
              className="mt-2 block w-full rounded-md border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 transition-all p-2"
            />
            <input
              type="text"
              placeholder="University"
              value={educationalQualifications.university}
              onChange={(e) =>
                setEducationalQualifications({
                  ...educationalQualifications,
                  university: e.target.value,
                })
              }
              className="mt-2 block w-full rounded-md border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 transition-all p-2"
            />
            <input
              type="text"
              placeholder="Session"
              value={educationalQualifications.session}
              onChange={(e) =>
                setEducationalQualifications({
                  ...educationalQualifications,
                  session: e.target.value,
                })
              }
              className="mt-2 block w-full rounded-md border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 transition-all p-2"
            />
            <input
              type="text"
              placeholder="CGPA"
              value={educationalQualifications.cgpa}
              onChange={(e) =>
                setEducationalQualifications({
                  ...educationalQualifications,
                  cgpa: e.target.value,
                })
              }
              className="mt-2 block w-full rounded-md border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 transition-all p-2"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-md shadow-md py-2 hover:bg-blue-700 transition"
          >
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUsers;
