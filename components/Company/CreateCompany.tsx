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
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json())

// Define a schema for your form using Zod
const formSchema = z.object({
  website: z.string(),
  name_en: z.string(),
  name_jp: z.string(),
  country: z.string(),
  state: z.string(),
  address: z.string(),
  telephone: z.string(),
  employee_count: z.string(),
  industry: z.string(),
  capital_currency: z.string(),
  capital_amount: z.string(),
  capital_unit: z.string(),
  stage: z.string(),
  status: z.string(),
  branchOffices: z.array(z.object({
    name: z.string(),
    country: z.string(),
    state: z.string(),
    address: z.string(),
    telephone: z.string(),
  })),
  subsidiaryOffices: z.array(z.object({
    name: z.string(),
    country: z.string(),
    state: z.string(),
    address: z.string(),
    telephone: z.string(),
  })),
  remarks: z.string(),
  logo_url: z.string(),
});

// Infer the FormValues type from the schema
type FormValues = z.infer<typeof formSchema>;

interface Country {
  country_id: number;
  name: string;
}

interface State {
  state_id: number;
  name: string;
}

interface Industry {
  industry_id: number;
  name: string;
}

interface Stage {
  id: number;
  name: string;
}

interface Status {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  avatar: string;
}

export default function CreateCompany() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      website: '',
      name_en: '',
      name_jp: '',
      country: '',
      state: '',
      address: '',
      telephone: '',
      employee_count: '',
      industry: '',
      capital_currency: '',
      capital_amount: '',
      capital_unit: '',
      stage: '',
      status: '',
      branchOffices: [],
      subsidiaryOffices: [],
      remarks: '',
      logo_url: '',
    },
  })

  const { fields: branchOffices, append: appendBranchOffice, remove: removeBranchOffice } = useFieldArray({
    control: form.control,
    name: "branchOffices"
  })

  const { fields: subsidiaryOffices, append: appendSubsidiaryOffice, remove: removeSubsidiaryOffice } = useFieldArray({
    control: form.control,
    name: "subsidiaryOffices"
  })

  const { data: countries, error: countriesError } = useSWR<Country[]>('/api/countries', fetcher)
  const [states, setStates] = useState<State[]>([])
  const { data: industries, error: industriesError } = useSWR<Industry[]>('/api/industries', fetcher)
  const { data: stages, error: stagesError } = useSWR<Stage[]>('/api/company-stages', fetcher)
  const { data: statuses, error: statusesError } = useSWR<Status[]>('/api/company-statuses', fetcher)
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const { data: users, error: usersError } = useSWR<User[]>('/api/users', fetcher)
  const [branchOfficeStates, setBranchOfficeStates] = useState<{ [key: number]: State[] }>({});
  const [subsidiaryOfficeStates, setSubsidiaryOfficeStates] = useState<{ [key: number]: State[] }>({});

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch('/api/company-add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          employee_count: parseInt(data.employee_count),
          capital: parseFloat(data.capital_amount),
          revenue: 0, // You may want to add this field to your form if needed
          created_by: 1, // Replace with actual user ID from authentication
          branchOffices: data.branchOffices,
          subsidiaryOffices: data.subsidiaryOffices,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create company');
      }

      const result = await response.json();
      toast({
        title: "Success",
        description: result.message,
      });
      router.push('/companies');
    } catch (error) {
      console.error('Error creating company:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create company. Please try again.",
      });
    }
  };

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
        .then((data: State[]) => setStates(data))
        .catch(error => console.error('Error fetching states:', error))
    } else {
      setStates([])
    }
  }, [selectedCountry])

  return (
    <div className="flex h-screen overflow-hidden">
      {isSidebarOpen && <Sidebar />}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Create Company</h1>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-h-[calc(100vh-250px)] overflow-y-auto pr-4">
                    <h4 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-2">General Information</h4>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Website link *</FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                {form.watch('logo_url') && (
                                  <img 
                                    src={form.watch('logo_url')} 
                                    alt="Company Logo" 
                                    className="w-8 h-8 mr-2 object-contain" 
                                    onError={(e) => {
                                      console.error('Error loading image:', e);
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                )}
                                <Input
                                  {...field}
                                  placeholder="eg: www.google.com"
                                  className="border-gray-300"
                                  onBlur={async (e) => {
                                    field.onBlur(e);
                                    if (field.value) {
                                      try {
                                        const response = await fetch(`/api/company-info?website=${encodeURIComponent(field.value)}`);
                                        if (response.ok) {
                                          const data = await response.json();
                                          form.setValue('name_en', data.name_en);
                                          form.setValue('name_jp', data.name_jp);
                                          form.setValue('logo_url', data.logo_url);
                                        }
                                      } catch (error) {
                                        // Error is silently handled here
                                      }
                                    }
                                  }}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="logo_url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Company Logo</FormLabel>
                            <FormControl>
                              <div className="flex items-center">
                                {field.value && (
                                  <img src={field.value} alt="Company Logo" className="w-8 h-8 mr-2 object-contain" />
                                )}
                                <Input {...field} placeholder="Logo URL" className="border-gray-300" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
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
                              <Input {...field} placeholder="eg: タタ・コンサルタシー・サービシズ" className="border-gray-300" />
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
                                <SelectTrigger  className="w-full">
                                  <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {countries?.map((country: Country) => (
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
                                <SelectTrigger  className="w-full">
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
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {industries?.map((industry: Industry) => (
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
                                <SelectTrigger className="w-full">
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
                                <SelectTrigger  className="w-full">
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
                                <SelectTrigger  className="w-full">
                                  <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {stages?.map((stage: Stage) => (
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
                                <SelectTrigger  className="w-full">
                                  <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {statuses?.map((status: Status) => (
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
                        <div className="max-h-80 overflow-y-auto pr-2">
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
                                          <SelectTrigger  className="w-full">
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
                                          <SelectTrigger  className="w-full">
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
                        </div>

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
                        <div className="max-h-80 overflow-y-auto pr-2">
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
                                          <SelectTrigger  className="w-full">
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
                                          <SelectTrigger  className="w-full">
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
                                  {users?.map((user: User) => (
                                    <div
                                      key={user.id}
                                      className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer"
                                      onClick={() => {
                                        if (!selectedUsers.find(u => u.id === user.id)) {
                                          setSelectedUsers([...selectedUsers, user])
                                        }
                                      }}
                                    >
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
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <div className="mt-4">
                        <FormField
                          control={form.control}
                          name="remarks"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">Remarks</FormLabel>
                              <FormControl>
                                <textarea
                                  {...field}
                                  className="w-full p-2 border rounded-md"
                                  rows={4}
                                  placeholder="eg: type some information"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                  </form>
                </Form>
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
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  )
}