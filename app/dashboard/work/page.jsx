"use client"

import { useState,useEffect } from "react"
import { useForm } from "react-hook-form"

export default function Work() {
  const [websites, setWebsites] = useState([])
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        websiteName: "Example Site",
        url: "https://example.com",
        pageName: "Home",
        description: "An example website",
        date: "2023-05-01",
      },
      {
        id: 2,
        websiteName: "Test Site",
        url: "https://test.com",
        pageName: "About",
        description: "A test website",
        date: "2023-05-02",
      },
    ]
    setWebsites(mockData)
  }, [])

  const handleEdit = (id) => {
    setEditingId(id)
  }

  const handleSave = (id) => {
    setEditingId(null)
  }

  const handleDelete = (id) => {
    setWebsites(websites.filter((website) => website.id !== id))
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = (data) => {
    const newWebsite = {
      id: Date.now(),
      ...data,
    }
    setWebsites([...websites, newWebsite])
    reset()
  }

  return (
    <>
    <div className="container w-full max-w-9/10">
    <form onSubmit={handleSubmit(onSubmit)} className="m-8 bg-gray-800 p-6 rounded-lg shadow-lg">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="websiteName" className="block mb-2">
          Website Name
        </label>
        <input
          id="websiteName"
          {...register("websiteName", { required: "Website name is required" })}
          className="w-full p-2 bg-gray-700 rounded"
          placeholder="Enter Website Name Here"
        />
        {errors.websiteName && <span className="text-red-500 text-sm">{errors.websiteName.message}</span>}
      </div>
      <div>
        <label htmlFor="url" className="block mb-2">
          URL
        </label>
        <input
          id="url"
          {...register("url", {
            required: "URL is required",
            pattern: {
              value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
              message: "Invalid URL format",
            },
          })}
          className="w-full p-2 bg-gray-700 rounded"
          placeholder="Example : www.google.com"
        />
        {errors.url && <span className="text-red-500 text-sm">{errors.url.message}</span>}
      </div>
      <div>
        <label htmlFor="pageName" className="block mb-2">
          Page Name
        </label>
        <input
          id="pageName"
          {...register("pageName", { required: "Page name is required" })}
          className="w-full p-2 bg-gray-700 rounded"
          placeholder="Enter Page Name you Work"
        />
        {errors.pageName && <span className="text-red-500 text-sm">{errors.pageName.message}</span>}
      </div>
      <div>
        <label htmlFor="date" className="block mb-2">
          Date
        </label>
        <input
          id="date"
          type="date"
          {...register("date", { required: "Date is required" })}
          className="w-full p-2 bg-gray-700 rounded"
          defaultValue={new Date().toISOString().split("T")[0]}
        />
        {errors.date && <span className="text-red-500 text-sm">{errors.date.message}</span>}
      </div>
      <div>
        <label htmlFor="description" className="block mb-2">
          Description
        </label>
        <textarea
          id="description"
          {...register("description", { required: "Description is required" })}
          className="w-full p-2 bg-gray-700 rounded"
          placeholder="Enter Description you Work"
        ></textarea>
        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
      </div>
    </div>
    <button
      type="submit"
      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
    >
      Add Website
    </button>
  </form>
  <div className="overflow-x-auto  m-8">
      <table className="w-full bg-gray-800 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Website Name</th>
            <th className="p-3 text-left">URL</th>
            <th className="p-3 text-left">Page Name</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {websites.map((website) => (
            <tr key={website.id} className="border-t border-gray-700">
              <td className="p-3">{website.id}</td>
              <td className="p-3">
                {editingId === website.id ? (
                  <input type="text" defaultValue={website.websiteName} className="bg-gray-700 p-1 rounded" />
                ) : (
                  website.websiteName
                )}
              </td>
              <td className="p-3">
                {editingId === website.id ? (
                  <input type="text" defaultValue={website.url} className="bg-gray-700 p-1 rounded" />
                ) : (
                  website.url
                )}
              </td>
              <td className="p-3">
                {editingId === website.id ? (
                  <input type="text" defaultValue={website.pageName} className="bg-gray-700 p-1 rounded" />
                ) : (
                  website.pageName
                )}
              </td>
              <td className="p-3">
                {editingId === website.id ? (
                  <input type="text" defaultValue={website.description} className="bg-gray-700 p-1 rounded" />
                ) : (
                  website.description
                )}
              </td>
              <td className="p-3">
                {editingId === website.id ? (
                  <input type="date" defaultValue={website.date} className="bg-gray-700 p-1 rounded" />
                ) : (
                  website.date
                )}
              </td>
              <td className="p-3">
                {editingId === website.id ? (
                  <button
                    onClick={() => handleSave(website.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600 transition-colors"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(website.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(website.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  </>
  )
}

