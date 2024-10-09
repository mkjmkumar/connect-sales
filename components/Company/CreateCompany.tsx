"use client"

import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Header from '../Header'
import Sidebar from '../SideBar'
import { useToast } from "../../hooks/use-toast"
import { Toaster } from "../ui/toaster"
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X } from "lucide-react"

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function CreateCompany() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm({
    defaultValues: {
      branchOffices: [],
      subsidiaryOffices: []
    }
  })

  const { fields: branchOffices, append: appendBranchOffice, remove: removeBranchOffice } = useFieldArray({
    control: form.control,
    name: "branchOffices"
  })

  const { fields: subsidiaryOffices, append: appendSubsidiaryOffice, remove: removeSubsidiaryOffice } = useFieldArray({
    control: form.control,
    name: "subsidiaryOffices"
  })

  const { data: countries, error: countriesError } = useSWR('/api/countries', fetcher)
  const [states, setStates] = useState([])
  const { data: industries, error: industriesError } = useSWR('/api/industries', fetcher)
  const { data: stages, error: stagesError } = useSWR('/api/company-stages', fetcher)
  const { data: statuses, error: statusesError } = useSWR('/api/company-statuses', fetcher)
  const [selectedUsers, setSelectedUsers] = useState([])
  const { data: users, error: usersError } = useSWR('/api/users', fetcher)
  const [branchOfficeStates, setBranchOfficeStates] = useState({});
  const [subsidiaryOfficeStates, setSubsidiaryOfficeStates] = useState({});

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/companies-add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: "Company created",
          description: "We've created the company for you.",
        })

        router.push('/companies')
      } else {
        throw new Error('Failed to create company')
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: error.message,
      })
    }
  }

  const handleReset = () => {
    form.reset()
  }

  const handleBack = () => {
    // Implement your back navigation logic here
    // For example: router.push('/companies')
  }

  useEffect(() => {
    if (selectedCountry) {
      fetch(`/api/states?country_id=${selectedCountry}`)
        .then(res => res.json())
        .then(data => setStates(data))
        .catch(error => console.error('Error fetching states:', error))
    } else {
      setStates([])
    }
  }, [selectedCountry])

  return (
    <div className="flex h-screen bg-gray-100">
      {isSidebarOpen && <Sidebar />}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Company</h1>
            <nav className="text-sm font-medium mb-8" aria-label="Breadcrumb">
              <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <a href="/dashboard" className="text-gray-500 hover:text-gray-900">Dashboard</a>
                  <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
                </li>
                <li className="flex items-center">
                  <a href="/companies" className="text-gray-500 hover:text-gray-900">Company</a>
                  <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
                </li>
                <li>
                  <span className="text-blue-600" aria-current="page">Create Company</span>
                </li>
              </ol>
            </nav>
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
                  <h4 className="text-lg font-semibold text-gray-700 border-b pb-2">General Information</h4>
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Website link *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="eg: www.google.com" className="border-gray-300" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name_en"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Company Name (EN) *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="eg: Tata Consultancy Services" className="border-gray-300" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="name_jp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Company Name (JP) *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="eg: タタ・コンサルタンシー・サービシズ" className="border-gray-300" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Country *</FormLabel>
                          <Select 
                            onValueChange={(value) => {
                              field.onChange(value)
                              setSelectedCountry(value)
                              form.setValue('state', '') // Reset state when country changes
                            }} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countries?.map((country) => (
                                <SelectItem key={country.country_id} value={country.country_id.toString()}>
                                  {country.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">State *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {states.map((state) => (
                                <SelectItem key={state.state_id} value={state.state_id.toString()}>
                                  {state.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Address</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="eg: 2/59,street name..." className="border-gray-300" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="telephone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Telephone</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="eg: +919574636445" className="border-gray-300" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="employee_count"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Employee count *</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" placeholder="eg: 50" className="border-gray-300" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Industry *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {industries?.map((industry) => (
                                <SelectItem key={industry.industry_id} value={industry.industry_id.toString()}>
                                  {industry.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="capital_currency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Capital *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="JPY" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="JPY">JPY</SelectItem>
                              <SelectItem value="USD">USD</SelectItem>
                              {/* Add more currencies as needed */}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="capital_amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>&nbsp;</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" placeholder="eg: 100000" className="border-gray-300" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="capital_unit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>&nbsp;</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Million" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Million">Million</SelectItem>
                              <SelectItem value="Billion">Billion</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="stage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Stage *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {stages?.map((stage) => (
                                <SelectItem key={stage.id} value={stage.id.toString()}>
                                  {stage.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Status *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {statuses?.map((status) => (
                                <SelectItem key={status.id} value={status.id.toString()}>
                                  {status.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="text-xl font-semibold mb-4">Branch Offices / Subsidiaries</h4>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <span className="text-gray-700 w-40">Branch office</span>
                        <Button
                          type="button"
                          onClick={() => appendBranchOffice({ 
                            name: '', 
                            country: '', 
                            state: '', 
                            address: '', 
                            telephone: '' 
                          })}
                          variant="secondary"
                          size="icon"
                          className="bg-[#1e2a4a] text-white hover:bg-[#152238] ml-2"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      {branchOffices.map((field, index) => (
                        <div key={field.id} className="space-y-4 p-4 border rounded-md">
                          <div className="flex justify-between items-center">
                            <h5 className="font-semibold">Branch Office {index + 1}</h5>
                            <Button
                              type="button"
                              onClick={() => removeBranchOffice(index)}
                              variant="destructive"
                              size="icon"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>
                          <FormField
                            control={form.control}
                            name={`branchOffices.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="eg: Green Branches" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`branchOffices.${index}.country`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Country *</FormLabel>
                                  <Select 
                                    onValueChange={(value) => {
                                      field.onChange(value)
                                      form.setValue(`branchOffices.${index}.state`, '')
                                      // Fetch states for the selected country
                                      fetch(`/api/states?country_id=${value}`)
                                        .then(res => res.json())
                                        .then(data => {
                                          setBranchOfficeStates(prevState => ({
                                            ...prevState,
                                            [index]: data
                                          }))
                                        })
                                        .catch(error => console.error('Error fetching states:', error))
                                    }} 
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select..." />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {countries?.map((country) => (
                                        <SelectItem key={country.country_id} value={country.country_id.toString()}>
                                          {country.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`branchOffices.${index}.state`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>State *</FormLabel>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    value={field.value}
                                    disabled={!form.getValues(`branchOffices.${index}.country`)}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select..." />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {branchOfficeStates[index]?.map((state) => (
                                        <SelectItem key={state.state_id} value={state.state_id.toString()}>
                                          {state.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name={`branchOffices.${index}.address`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="eg: 3/66, street name..." />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`branchOffices.${index}.telephone`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Telephone</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="eg: +919574636445" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}

                      <div className="flex items-center mt-4">
                        <span className="text-gray-700 w-40">Subsidiary office</span>
                        <Button
                          type="button"
                          onClick={() => appendSubsidiaryOffice({ 
                            name: '', 
                            country: '', 
                            state: '', 
                            address: '', 
                            telephone: '' 
                          })}
                          variant="secondary"
                          size="icon"
                          className="bg-[#1e2a4a] text-white hover:bg-[#152238] ml-2"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      {subsidiaryOffices.map((field, index) => (
                        <div key={field.id} className="space-y-4 p-4 border rounded-md">
                          <div className="flex justify-between items-center">
                            <h5 className="font-semibold">Subsidiary Office {index + 1}</h5>
                            <Button
                              type="button"
                              onClick={() => removeSubsidiaryOffice(index)}
                              variant="destructive"
                              size="icon"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>
                          <FormField
                            control={form.control}
                            name={`subsidiaryOffices.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="eg: Green Subsidiaries" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`subsidiaryOffices.${index}.country`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Country *</FormLabel>
                                  <Select 
                                    onValueChange={(value) => {
                                      field.onChange(value)
                                      form.setValue(`subsidiaryOffices.${index}.state`, '')
                                      // Fetch states for the selected country
                                      fetch(`/api/states?country_id=${value}`)
                                        .then(res => res.json())
                                        .then(data => {
                                          setSubsidiaryOfficeStates(prevState => ({
                                            ...prevState,
                                            [index]: data
                                          }))
                                        })
                                        .catch(error => console.error('Error fetching states:', error))
                                    }} 
                                    value={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select..." />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {countries?.map((country) => (
                                        <SelectItem key={country.country_id} value={country.country_id.toString()}>
                                          {country.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`subsidiaryOffices.${index}.state`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>State *</FormLabel>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    value={field.value}
                                    disabled={!form.getValues(`subsidiaryOffices.${index}.country`)}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select..." />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {subsidiaryOfficeStates[index]?.map((state) => (
                                        <SelectItem key={state.state_id} value={state.state_id.toString()}>
                                          {state.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name={`subsidiaryOffices.${index}.address`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="eg: 3/66, street name..." />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`subsidiaryOffices.${index}.telephone`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Telephone</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="eg: +917867868664" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold text-gray-700 border-b pb-2">Sales Information</h4>
                    <div className="mt-4">
                      <FormLabel className="text-gray-700">Managed by *</FormLabel>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedUsers.map((user) => (
                          <div key={user.id} className="flex items-center bg-gray-100 rounded-full pl-1 pr-2 py-1">
                            <Avatar className="h-6 w-6 mr-1">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{user.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="ml-1 h-4 w-4 p-0"
                              onClick={() => setSelectedUsers(selectedUsers.filter(u => u.id !== user.id))}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8"
                            >
                              Add Person
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80">
                            <div className="space-y-4">
                              <h4 className="font-medium">Add User</h4>
                              <Input
                                type="text"
                                placeholder="Search users..."
                                onChange={(e) => {
                                  // Implement search logic here
                                }}
                              />
                              <div className="max-h-48 overflow-y-auto">
                                {users?.map((user) => (
                                  <div
                                    key={user.id}
                                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                      if (!selectedUsers.find(u => u.id === user.id)) {
                                        setSelectedUsers([...selectedUsers, user])
                                      }
                                    }}
                                  >
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={user.avatar} alt={user.name} />
                                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span>{user.name}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4 mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleReset}
                      className="bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    >
                      Reset
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-[#1e2a4a] text-white hover:bg-[#152238]"
                    >
                      Save
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  )
}