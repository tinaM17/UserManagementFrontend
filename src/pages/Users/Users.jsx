import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState();
  const [editUser, setEditUser] = useState(null); // User being edited
  const [editForm, setEditForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mob: "",
    company: "",
    image: "",
    active: false
  });

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/users`);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };


  const handleSearch = async () => {
    try {
      const res = await axios.get(`
      http://localhost:3000/api/user?search=${search}
      `);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (userId) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/users/${userId}`
      );
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (user) => {
    setEditUser(user);
    setEditForm({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      mob: user.mob,
      company: user.company,
      image: user.image,
      active: user.active
    });
  };

  const handleEditSubmit = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/users/${editUser._id}`,
        editForm
      );
      console.log("User updated successfully");
      closeEditModal();
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const closeEditModal = () => {
    setEditUser(null);
    setEditForm({
      firstname: "",
      lastname: "",
      email: "",
      mob: "",
      company: "",
      image: "",
      active: false
    });
  };
  return (
    <>
      <div className="h-screen mt-10">
        <div className="flex justify-between m-5 mb-10">
          <div>
            <h2 className="text-2xl text-sky-600">User Management</h2>
          </div>
          <div>
            <form>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  className="block w-[400px] p-4 pl-10 pr-5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Users by username,email..."
                  required
                />
                <button
                  type="button"
                  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Full name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Mob No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Company
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="flex flex-row">
                      <img
                        src={user.image}
                        alt=""
                        className="w-[30px] h-[30px] rounded-2xl"
                      />
                      {user.firstname + " " + user.lastname}
                    </div>
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.mob}</td>
                  <td className="px-6 py-4">{user.company}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-row">
                      <img
                        src={"/src/assets/pencil.png"}
                        alt=""
                        className="w-[20px] h-[20px] mr-5"
                        onClick={() => handleEdit(user)}
                      />
                      <img
                        src={"/src/assets/delete.png"}
                        alt=""
                        className="w-[20px] h-[20px]"
                        onClick={() => handleDelete(user._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Edit User Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md w-96">
            <h2 className="text-2xl mb-4">Edit User</h2>
            <form>
              <div className="flex flex-col">
                <label htmlFor="editFirstname">
                  First Name:
                  <input
                    type="text"
                    id="editFirstname"
                    value={editForm.firstname}
                    className="ml-5"
                    onChange={(e) =>
                      setEditForm({ ...editForm, firstname: e.target.value })
                    }
                  />
                </label>
                <label htmlFor="editLastname">
                  Last Name:
                  <input
                    type="text"
                    id="editLastname"
                    value={editForm.lastname}
                    className="ml-5"
                    onChange={(e) =>
                      setEditForm({ ...editForm, lastname: e.target.value })
                    }
                  />
                </label>
                <label htmlFor="editEmail">
                  Email:
                  <input
                    type="text"
                    id="editEmail"
                    value={editForm.email}
                    className="ml-5"
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                  />
                </label>
                <label htmlFor="editCompany">
                  Company:
                  <input
                    type="text"
                    id="editCompany"
                    value={editForm.company}
                    className="ml-5"
                    onChange={(e) =>
                      setEditForm({ ...editForm, company: e.target.value })
                    }
                  />
                </label>
                <label htmlFor="editMob">
                  Mob:
                  <input
                    type="text"
                    id="editMob"
                    value={editForm.mob}
                    className="ml-5"
                    onChange={(e) =>
                      setEditForm({ ...editForm, mob: e.target.value })
                    }
                  />
                </label>
                <label htmlFor="editActive">
                  Active:
                  <input
                    type="text"
                    id="editActive"
                    value={editForm.active}
                    className="ml-5"
                    onChange={(e) =>
                      setEditForm({ ...editForm, active: e.target.value })
                    }
                  />
                </label>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={handleEditSubmit}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                  onClick={closeEditModal}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
