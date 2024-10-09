"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr'
import { useForm } from 'react-hook-form'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, MoreHorizontal, Search, Menu, Bell, User } from 'lucide-react'
import Sidebar from '../SideBar'
import Header from '../Header'
import Link from 'next/link'

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function CompanyListing() {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)
  const [filters, setFilters] = useState({})
  const [sortBy, setSortBy] = useState({ column: 'created_at', direction: 'desc' })
  const [searchTerm, setSearchTerm] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const { data, error } = useSWR(
    `/api/companies-list?${new URLSearchParams({
      search: searchTerm,
      filters: JSON.stringify(filters),
      sortBy: JSON.stringify(sortBy),
      page: page.toString(),
      pageSize: pageSize.toString()
    })}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onError: (err) => {
        console.error('Error fetching companies data:', err)
      }
    }
  )

  const { register, handleSubmit } = useForm()

  useEffect(() => {
    if (error) {
        console.error('Error fetching company data:', error)
    }
  }, [error])

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }))
  }

  const handleSort = (column: string) => {
    setSortBy(prev => ({
      column,
      direction: prev.column === column && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const searchInput = form.elements.namedItem('search') as HTMLInputElement
    setSearchTerm(searchInput.value)
  }

  const handleExport = async () => {
    try {
      const response = await fetch('/api/export-companies')
      if (!response.ok) throw new Error('Failed to export companies')
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'companies.csv'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error exporting data:', error)
    }
  }

  const convertToCSV = (data: any[]) => {
    const header = Object.keys(data[0]).join(',')
    const rows = data.map(row => Object.values(row).join(','))
    return [header, ...rows].join('\n')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {isSidebarOpen && <Sidebar />}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-6">
            <div className="px-4 py-6 sm:px-0">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Company List</h1>
                <div className="flex space-x-2">
                  <Button onClick={handleExport}>Export</Button>
                  <Button as={Link} href="/companies/company_add">+ Create</Button>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Top companies this Quarter</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {data?.topCompanies?.map((company: any) => (
                    <Card key={company.id} className="bg-white">
                      <CardHeader>
                        <CardTitle>{company.name_en}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-2">
                          <img src={company.logo_url || '/placeholder.svg'} alt={company.name_en} className="w-12 h-12 rounded-full" />
                          <div>
                            <p>Capital: {formatCurrency(company.capital, company.country)}</p>
                            <p>Revenue: {formatCurrency(company.revenue, company.country)}</p>
                            <p>{company.country}, {company.state}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                <Select onValueChange={(value) => handleFilterChange('status', value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>

                <Select onValueChange={(value) => handleFilterChange('stage', value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="potential">Potential</SelectItem>
                    <SelectItem value="target">Target</SelectItem>
                    <SelectItem value="proposition">Proposition</SelectItem>
                  </SelectContent>
                </Select>

                <Select onValueChange={(value) => handleFilterChange('country', value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Japan">Japan</SelectItem>
                    <SelectItem value="USA">USA</SelectItem>
                    <SelectItem value="UK">UK</SelectItem>
                    {/* Add more countries as needed */}
                  </SelectContent>
                </Select>

                <Select onValueChange={(value) => handleFilterChange('industry', value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Software">Software</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    {/* Add more industries as needed */}
                  </SelectContent>
                </Select>

                <Button variant="outline" onClick={() => setFilters({})}>Reset Filters</Button>
              </div>

              <form onSubmit={handleSearch} className="mb-4">
                <div className="flex">
                  <Input
                    type="search"
                    placeholder="Search companies..."
                    className="mr-2"
                    {...register('search')}
                  />
                  <Button type="submit">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </form>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Company ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Employee Size</TableHead>
                    <TableHead>Capital</TableHead>
                    <TableHead>Revenue Generated</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Deal Count</TableHead>
                    <TableHead>Lead Count</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.companies?.map((company: any) => (
                    <TableRow key={company.company_id}>
                      <TableCell className="font-medium">{company.company_id}</TableCell>
                      <TableCell>{company.name_en}</TableCell>
                      <TableCell>{company.employee_count}</TableCell>
                      <TableCell>{formatCurrency(company.capital, company.country)}</TableCell>
                      <TableCell>{formatCurrency(company.revenue, company.country)}</TableCell>
                      <TableCell>{company.stage}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          company.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {company.status}
                        </span>
                      </TableCell>
                      <TableCell>{company.country}</TableCell>
                      <TableCell>{company.state}</TableCell>
                      <TableCell>{company.industry}</TableCell>
                      <TableCell>{company.deal_count}</TableCell>
                      <TableCell>{company.lead_count}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => router.push(`/companies/${company.company_id}`)}>
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push(`/companies/${company.company_id}/edit`)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDelete(company.company_id)}>
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-4 flex items-center justify-between">
                <Select
                  value={pageSize.toString()}
                  onValueChange={(value) => setPageSize(Number(value))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Entries per page" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25">25 entries per page</SelectItem>
                    <SelectItem value="50">50 entries per page</SelectItem>
                    <SelectItem value="100">100 entries per page</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setPage(prev => Math.max(1, prev - 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <span>Page {page} of {data?.totalPages}</span>
                  <Button
                    variant="outline"
                    onClick={() => setPage(prev => Math.min(data?.totalPages, prev + 1))}
                    disabled={page === data?.totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function formatCurrency(amount: number, country: string) {
  const formatter = new Intl.NumberFormat(country === 'Japan' ? 'ja-JP' : 'en-US', {
    style: 'currency',
    currency: country === 'Japan' ? 'JPY' : 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  if (amount >= 1e9) {
    return formatter.format(amount / 1e9) + ' B'
  } else if (amount >= 1e6) {
    return formatter.format(amount / 1e6) + ' M'
  } else {
    return formatter.format(amount)
  }
}

async function handleDelete(companyId: number) {
  if (confirm('Are you sure you want to delete this company?')) {
    try {
      const response = await fetch(`/api/companies/${companyId}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete company')
      // Refresh the data
      mutate('/api/companies-list')
    } catch (error) {
      console.error('Error deleting company:', error)
    }
  }
}