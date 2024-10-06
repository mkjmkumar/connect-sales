'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Bell, ChevronDown, Menu } from 'lucide-react' 
import { Button } from "@/components/ui/button"
import Sidebar from './SideBar'
import { Building, DollarSign, Diamond, CheckCircle } from 'lucide-react'


// Summary Statistics Component
const SummaryStats = ({ stats }) => {
  const iconMap = {
    total_companies: Building,
    total_leads: DollarSign,
    total_deals: Diamond,
    closed_deals: CheckCircle,
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {Object.entries(stats).map(([key, value]) => {
        const Icon = iconMap[key] || Building
        return (
          <Card key={key} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </CardTitle>
              <Icon className="h-8 w-8 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{value}</div>
            </CardContent>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/10" />
          </Card>
        )
      })}
    </div>
  )
}

// Target vs Achievement Component
const TargetAchievement = ({ data }) => (
  <Card>
    <CardHeader>
      <CardTitle>Target vs Achievement</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-[200px]">
        {/* Implement semi-circular gauge chart here */}
        {/* You may need to use a library like react-gauge-chart for this */}
      </div>
    </CardContent>
  </Card>
)

// Progress by Quarter Component
const ProgressByQuarter = ({ data }) => (
  <Card>
    <CardHeader>
      <CardTitle>Progress by Quarter</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Quarter</TableHead>
            <TableHead>Target</TableHead>
            <TableHead>Achievement</TableHead>
            <TableHead>Percentage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.quarter}>
              <TableCell>{row.quarter}</TableCell>
              <TableCell>{row.target}</TableCell>
              <TableCell>{row.achievement}</TableCell>
              <TableCell>{row.percentage}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

// Lead Generation Chart Component
const LeadGenerationChart = ({ data }) => (
  <Card>
    <CardHeader>
      <CardTitle>Lead Generation</CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="monthly_sales" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
)

// Deal Conversation Component
const DealConversation = ({ data }) => (
  <Card>
    <CardHeader>
      <CardTitle>Deal Conversation</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Week</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Hot</TableHead>
            <TableHead>Warm</TableHead>
            <TableHead>Cold</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Dead</TableHead>
            <TableHead>Other</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.week}>
              <TableCell>{row.week}</TableCell>
              <TableCell>{row.client}</TableCell>
              <TableCell>{row.hot}</TableCell>
              <TableCell>{row.warm}</TableCell>
              <TableCell>{row.cold}</TableCell>
              <TableCell>{row.contact}</TableCell>
              <TableCell>{row.dead}</TableCell>
              <TableCell>{row.other}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

// Top Clients Component
const TopClients = ({ data }) => (
  <Card>
    <CardHeader>
      <CardTitle>Top Clients</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead>Percentage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((client) => (
            <TableRow key={client.company}>
              <TableCell>{client.company}</TableCell>
              <TableCell>{client.revenue}</TableCell>
              <TableCell>{client.percentage}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

// Main Dashboard Component
export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [summaryStats, setSummaryStats] = useState({
    total_companies: 0,
    total_leads: 0,
    total_deals: 0,
    closed_deals: 0,
  })
  const [targetAchievement, setTargetAchievement] = useState({})
  const [progressByQuarter, setProgressByQuarter] = useState([])
  const [leadGeneration, setLeadGeneration] = useState([])
  const [dealConversation, setDealConversation] = useState([])
  const [topClients, setTopClients] = useState([])



  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard-data')
      if (response.ok) {
        const data = await response.json()
        setSummaryStats(data.summaryStats)
        setTargetAchievement(data.targetAchievement)
        setProgressByQuarter(data.progressByQuarter)
        setLeadGeneration(data.leadGeneration)
        setDealConversation(data.dealConversation)
        setTopClients(data.topClients)
      } else {
        console.error('Failed to fetch dashboard data')
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {isSidebarOpen && <Sidebar />}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="mr-4 lg:hidden"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </div>
              <h1 className="text-2xl font-semibold text-gray-900">SalesConnect</h1>
              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <img src="/images/us.png" alt="US Flag" className="w-5 h-5" />
                      <span>English</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <img src="/images/us.png" alt="US Flag" className="w-5 h-5 mr-2" />
                      English
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <img src="/images/jpn.png" alt="Japan Flag" className="w-5 h-5 mr-2" />
                      日本語
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </Button>
                <Button variant="ghost" size="icon">
                  <img src="/images/avatar.jpg" alt="User Avatar" className="h-8 w-8 rounded-full" />
                </Button>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              </div>
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <SummaryStats stats={summaryStats} />
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <TargetAchievement data={targetAchievement} />
                    <Card className="col-span-4">
                      <CardHeader>
                        <CardTitle>Overview</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ProgressByQuarter data={progressByQuarter} />
                      </CardContent>
                    </Card>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <LeadGenerationChart data={leadGeneration} />
                    <Card className="col-span-4">
                      <CardHeader>
                        <CardTitle>Deal Conversation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <DealConversation data={dealConversation} />
                      </CardContent>
                    </Card>
                  </div>
                  <TopClients data={topClients} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}