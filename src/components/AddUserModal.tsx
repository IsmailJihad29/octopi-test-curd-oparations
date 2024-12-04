import React, { useState, useEffect } from "react";
import { useAddUsersMutation } from "../redux/api/baseApi";
import Swal from "sweetalert2";

type AddUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose }) => {
  const [addUser] = useAddUsersMutation();
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300); // Wait for animation to finish before hiding
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create user data object
    const userData = {
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
      await addUser(userData);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "user added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log("Error adding product:", error);
    }
    console.log(userData);

    // Reset form and close modal
    setName("");
    setImage("");
    setAge("");
    setNationality("");
    setSkills([]);
    setNid("");
    setAddress("");
    setEmail("");
    setPhone("");
    setWebsite("");
    setGender("");
    setEducationalQualifications({
      degree: "",
      university: "",
      session: "",
      cgpa: "",
    });
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-lg shadow-2xl w-full max-w-5xl p-8 transition-all duration-300 transform ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Add New User
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-primary-font"
        >
          {/* Left Column */}
          <div className="space-y-6">
            {/* Name */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
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

            {/* Image */}
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
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

            {/* Nationality */}
            <div className="mb-4">
              <label
                htmlFor="nationality"
                className="block text-sm font-medium text-gray-700"
              >
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

            {/* Age */}
            <div className="mb-4">
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
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

            {/* Skills */}
            <div className="mb-4">
              <label
                htmlFor="skills"
                className="block text-sm font-medium text-gray-700"
              >
                Skills
              </label>
              <input
                id="skills"
                type="text"
                value={skills.join(", ")}
                onChange={(e) =>
                  setSkills(
                    e.target.value.split(",").map((skill) => skill.trim())
                  )
                }
                className="mt-2 block w-full rounded-md border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 transition-all p-2"
              />
            </div>

            {/* NID */}
            <div className="mb-4">
              <label
                htmlFor="nid"
                className="block text-sm font-medium text-gray-700"
              >
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

            {/* Address */}
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
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

            {/* Phone */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
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

            {/* Website */}
            <div className="mb-4">
              <label
                htmlFor="website"
                className="block text-sm font-medium text-gray-700"
              >
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

            {/* Gender */}
            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
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

            {/* Educational Qualifications */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">
                Educational Qualifications
              </h3>
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
        </form>

        {/* Buttons */}
        <div className="mt-8 flex justify-between items-center">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-black rounded-lg py-2 px-6 hover:bg-gray-400 focus:outline-none transition-all"
          >
            Close
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-white rounded-lg py-2 px-6 hover:bg-blue-600 focus:outline-none transition-all"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
