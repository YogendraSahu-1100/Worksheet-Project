"use client"

import { useState, useEffect } from "react"
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
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

  const handleExportCSV = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Websites");

    worksheet.columns = [
      { header: "ID", key: "id", width: 5 },
      { header: "Website Name", key: "websiteName", width: 20 },
      { header: "Page Name", key: "pageName", width: 15 },
      { header: "URL", key: "url", width: 30 },
      { header: "Date", key: "date", width: 15 },
      { header: "Description", key: "description", width: 30 },
    ];

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4F81BD" },
      };
      cell.alignment = { horizontal: "center", vertical: "middle" };
    });

    websites.forEach((data) => {
      worksheet.addRow(data);
    });

    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        cell.alignment = { horizontal: "center", vertical: "middle" };
      });
    });

    worksheet.autoFilter = {
      from: { row: 1, column: 1 },
      to: { row: worksheet.rowCount, column: worksheet.columnCount },
    };

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "WebsitesData.xlsx");
  };

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
                placeholder="Ex: www.google.com"
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
                name="date"
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

        <button className="Documents-btn ml-8" onClick={handleExportCSV}>
          <span className="folderContainer">
            <svg
              className="fileBack"
              width="146"
              height="113"
              viewBox="0 0 146 113"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 4C0 1.79086 1.79086 0 4 0H50.3802C51.8285 0 53.2056 0.627965 54.1553 1.72142L64.3303 13.4371C65.2799 14.5306 66.657 15.1585 68.1053 15.1585H141.509C143.718 15.1585 145.509 16.9494 145.509 19.1585V109C145.509 111.209 143.718 113 141.509 113H3.99999C1.79085 113 0 111.209 0 109V4Z"
                fill="url(#paint0_linear_117_4)"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear_117_4"
                  x1="0"
                  y1="0"
                  x2="72.93"
                  y2="95.4804"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#8F88C2"></stop>
                  <stop offset="1" stopColor="#5C52A2"></stop>
                </linearGradient>
              </defs>
            </svg>
            <svg
              className="filePage"
              width="88"
              height="99"
              viewBox="0 0 88 99"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="88" height="99" fill="url(#paint0_linear_117_6)"></rect>
              <defs>
                <linearGradient
                  id="paint0_linear_117_6"
                  x1="0"
                  y1="0"
                  x2="81"
                  y2="160.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white"></stop>
                  <stop offset="1" stopColor="#686868"></stop>
                </linearGradient>
              </defs>
            </svg>

            <svg
              className="fileFront"
              width="160"
              height="79"
              viewBox="0 0 160 79"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.29306 12.2478C0.133905 9.38186 2.41499 6.97059 5.28537 6.97059H30.419H58.1902C59.5751 6.97059 60.9288 6.55982 62.0802 5.79025L68.977 1.18034C70.1283 0.410771 71.482 0 72.8669 0H77H155.462C157.87 0 159.733 2.1129 159.43 4.50232L150.443 75.5023C150.19 77.5013 148.489 79 146.474 79H7.78403C5.66106 79 3.9079 77.3415 3.79019 75.2218L0.29306 12.2478Z"
                fill="url(#paint0_linear_117_5)"
              ></path>
              <defs>
                <linearGradient
                  id="paint0_linear_117_5"
                  x1="38.7619"
                  y1="8.71323"
                  x2="66.9106"
                  y2="82.8317"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#C3BBFF"></stop>
                  <stop offset="1" stopColor="#51469A"></stop>
                </linearGradient>
              </defs>
            </svg>
          </span>
          <p className="text">Download Excel</p>
        </button>

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
              {0 !== websites.length ?

                websites.map((website) => (
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
                ))

                : <tr>
                  <td className="flex justify-center my-4">There is NO Data Enter in Table</td>
                </tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

