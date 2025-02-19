"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import "@/app/Components/Btn-style/btn.css"

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
        date: "01-02-2025",
      },
      {
        id: 2,
        websiteName: "Test Site",
        url: "https://test.com",
        pageName: "About",
        description: "A test website",
        date: "02-01-2025",
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
          <button className="btn-submit" type="submit">
            <span className="circle1" />
            <span className="circle2" />
            <span className="circle3" />
            <span className="circle4" />
            <span className="circle5" />
            <span className="text">Submit</span>
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
                  <td className="p-3 ">
                    {editingId === website.id ? (
                      <input type="date" defaultValue={website.date} className="bg-gray-700 p-1 rounded" />
                    ) : (
                      website.date
                    )}
                  </td>
                  <td className="p-3 flex  ">
                    {editingId === website.id ? (
                      <button
                        onClick={() => handleSave(website.id)}
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600 transition-colors"
                      >
                        Save
                      </button>
                    ) : (
                      <button className="editBtn mr-2" onClick={() => handleEdit(website.id)}>
                        <svg height="1em" viewBox="0 0 512 512">
                          <path
                            d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                          ></path>
                        </svg>
                      </button>
                    )}

                    <button className="button-dlt" onClick={() => handleDelete(website.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 69 14"
                        className="svgIcon bin-top"
                      >
                        <g clipPath="url(#clip0_35_24)">
                          <path
                            fill="black"
                            d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_35_24">
                            <rect fill="white" height="14" width="69"></rect>
                          </clipPath>
                        </defs>
                      </svg>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 69 57"
                        className="svgIcon bin-bottom"
                      >
                        <g clipPath="url(#clip0_35_22)">
                          <path
                            fill="black"
                            d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_35_22">
                            <rect fill="white" height="57" width="69"></rect>
                          </clipPath>
                        </defs>
                      </svg>
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

