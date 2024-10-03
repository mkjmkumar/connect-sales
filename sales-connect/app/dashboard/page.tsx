"use client"

import { useState } from "react"
import { Bell, MessageSquare, Phone, Search, ChevronDown, LayoutGrid } from "lucide-react"
import Image from "next/image"
import CreateLeadForm from "../components/CreateLeadForm"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("All clients")
  const [isCreateLeadFormOpen, setIsCreateLeadFormOpen] = useState(false)

  const openCreateLeadForm = () => {
    setIsCreateLeadFormOpen(true)
  }

  const closeCreateLeadForm = () => {
    setIsCreateLeadFormOpen(false)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg"></div>
          <div>
            <h2 className="font-semibold">Sales-Connect</h2>
            <p className="text-xs text-gray-500">Category</p>
          </div>
        </div>
        <nav className="mt-6">
          <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600">
            Dashboard
          </a>
          <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600">
            Lead
          </a>
          <div className="block px-4 py-2 text-blue-600 bg-blue-50">
            <span>Clients</span>
            <ChevronDown className="inline-block ml-2 h-4 w-4" />
          </div>
          <a href="#" className="block px-8 py-2 text-blue-600 bg-blue-100">
            Contacts
          </a>
          <a href="#" className="block px-8 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600">
            Companies
          </a>
          <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600">
            Task management
          </a>
          <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600">
            Invoice
          </a>
          <a href="#" className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600">
            Settings
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Company List</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Phone className="h-6 w-6" />
              </button>
              <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <MessageSquare className="h-6 w-6" />
              </button>
              <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Bell className="h-6 w-6" />
              </button>
              <button className="ml-3 flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <span className="sr-only">View notifications</span>
                <Image className="h-8 w-8 rounded-full" src="/placeholder.svg" alt="" width={32} height={32} />
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Client list</h2>
          
          {/* Action buttons */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={openCreateLeadForm}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              + New
            </button>
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <button className="ml-2 p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <LayoutGrid className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* New clients this week */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">New clients this week</h3>
              <button className="text-gray-400 hover:text-gray-500">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="border-t border-gray-200">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 p-4">
                {["Cody Fisher", "Tialii Miski", "John Cooper"].map((name, index) => (
                  <div key={index} className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <div className="flex-shrink-0">
                      <Image className="h-10 w-10 rounded-full" src="/placeholder.svg" alt="" width={40} height={40} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <a href="#" className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        <p className="text-sm font-medium text-gray-900">{name}</p>
                        <p className="text-sm text-gray-500 truncate">Fugiat laborum non ani</p>
                      </a>
                    </div>
                    <div className="flex-shrink-0">
                      <button className="text-gray-400 hover:text-gray-500">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Client list tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {["All clients", "Active", "Inactive"].map((tab) => (
                <button
                  key={tab}
                  className={`${
                    activeTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Client table */}
          <div className="mt-8 flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phone
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Latest lead
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { name: "Ashley Lopez", job: "Fashion Designer", phone: "(212) 535-8263", email: "jacobjackson1988@yahoo.com", lead: "#37292", status: "New lead" },
                        { name: "Andrea Sanchez", job: "Economics Professor", phone: "(845) 732-4788", email: "jking@hotmail.com", lead: "#37293", status: "New lead" },
                        { name: "Brian Scott", job: "Lawyer", phone: "(719) 810-7869", email: "ehall@hotmail.com", lead: "#37294", status: "Negotiation" },
                        { name: "Jaime Jimenez", job: "Housekeeper", phone: "(619) 656-7396", email: "bmartinez@yahoo.com", lead: "#37301", status: "Close as lost" },
                        { name: "Anthony Davis", job: "Clinical Psychologist", phone: "(312) 522-6378", email: "john_scott@hotmail.com", lead: "#37296", status: "Close as Won" },
                      ].map((person, personIdx) => (
                        <tr key={personIdx}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <Image className="h-10 w-10 rounded-full" src="/placeholder.svg" alt="" width={40} height={40} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{person.name}</div>
                                <div className="text-sm text-gray-500">{person.job}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{person.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{person.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-blue-600">{person.lead}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              person.status === "New lead" ? "bg-green-100 text-green-800" :
                              person.status === "Negotiation" ? "bg-yellow-100 text-yellow-800" :
                              person.status === "Close as lost" ? "bg-red-100 text-red-800" :
                              "bg-blue-100 text-blue-800"
                            }`}>
                              {person.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-gray-400 hover:text-gray-500">
                              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </a>
              <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </a>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">97</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    <ChevronDown className="h-5 w-5 rotate-90" />
                  </a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    1
                  </a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    2
                  </a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    3
                  </a>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    8
                  </a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    9
                  </a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    10
                  </a>
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    <ChevronDown className="h-5 w-5 -rotate-90" />
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>

      {isCreateLeadFormOpen && (
        <CreateLeadForm onClose={closeCreateLeadForm} />
      )}
    </div>
  )
}