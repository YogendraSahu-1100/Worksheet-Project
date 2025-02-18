"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function Work() {
  const [formData, setFormData] = useState({
    id: "",
    websiteName: "",
    pageOnWork: "",
    description: "",
    date: "",
  })
  const [tableData, setTableData] = useState([])
  const [editMode, setEditMode] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = (e) => {
    e.preventDefault();
    if (editMode) {
      setTableData((prev) => prev.map((item) => (item.id === formData.id ? formData : item)))
      setEditMode(false)
    } else {
      setTableData((prev) => [...prev, { ...formData, id: Date.now().toString() }])
    }
    setFormData({ id: "", websiteName: "", pageOnWork: "", description: "", date: "" })
  }

  const handleEdit = (id) => {
    const itemToEdit = tableData.find((item) => item.id === id)
    if (itemToEdit) {
      setFormData(itemToEdit)
      setEditMode(true)
    }
  }

  const handleDelete = (id) => {
    setTableData((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-violet-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Work Page Management
        </motion.h1>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl shadow-2xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4">{editMode ? "Edit Entry" : "Add New Entry"}</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="websiteName" className="block text-sm font-medium text-gray-300 mb-1">
                  Website Name
                </label>
                <input
                  id="websiteName"
                  name="websiteName"
                  value={formData.websiteName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 bg-opacity-50 rounded-md border border-gray-600 focus:border-violet-400 focus:ring focus:ring-violet-300 focus:ring-opacity-50 text-white px-4 py-2 transition duration-200"
                />
              </div>

              <div>
                <label htmlFor="pageOnWork" className="block text-sm font-medium text-gray-300 mb-1">
                  Page On Work
                </label>
                <input
                  id="pageOnWork"
                  name="pageOnWork"
                  value={formData.pageOnWork}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 bg-opacity-50 rounded-md border border-gray-600 focus:border-violet-400 focus:ring focus:ring-violet-300 focus:ring-opacity-50 text-white px-4 py-2 transition duration-200"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 bg-opacity-50 rounded-md border border-gray-600 focus:border-violet-400 focus:ring focus:ring-violet-300 focus:ring-opacity-50 text-white px-4 py-2 transition duration-200 min-h-[100px]"
                />
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
                  Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 bg-opacity-50 rounded-md border border-gray-600 focus:border-violet-400 focus:ring focus:ring-violet-300 focus:ring-opacity-50 text-white px-4 py-2 transition duration-200"
                />
              </div>

              <button
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-opacity-50"
              >
                {editMode ? "Update" : "Save"}
              </button>
            </form>
          </motion.div>

          <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl shadow-2xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Entries</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Id
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Website
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Page
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {tableData.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-700 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">{row.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{row.websiteName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{row.pageOnWork}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{row.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleEdit(row.id)}
                          className="text-blue-400 hover:text-blue-300 mr-2 transition duration-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(row.id)}
                          className="text-red-400 hover:text-red-300 transition duration-200"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

