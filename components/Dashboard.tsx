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
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
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
import { Building, Users, Briefcase, CheckCircle } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

// Define an interface for the stats object
interface Stats {
  total_companies: number;
  total_leads: number;
  total_deals: number;
  closed_deals: number;
  // Add other stat properties as needed
}

// Summary Statistics Component
const SummaryStats = ({ stats }: { stats: Stats }) => {
  const iconMap = {
    total_companies: Building,
    total_leads: Users,
    total_deals: Briefcase,
    closed_deals: CheckCircle,
  } as const;

  // Define a type for the icon map keys
  type IconMapKey = keyof typeof iconMap;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {(Object.entries(stats) as [IconMapKey, number][]).map(([key, value]) => {
        const Icon: LucideIcon = iconMap[key as IconMapKey] || Building;
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

// Define an interface for the TargetAchievement data
interface TargetAchievementData {
  percentage: number;
  target: number;
  achievement: number;
}

// Target vs Achievement Component
const TargetAchievement = ({ data }: { data: TargetAchievementData }) => {
  const percentage = data.percentage || 0;
  const target = data.target || 0;
  const achievement = data.achievement || 0;

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={[{ value: percentage }, { value: 100 - percentage }]}
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={0}
            dataKey="value"
          >
            <Cell fill="#3182CE" />
            <Cell fill="#EDF2F7" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="text-3xl font-bold mt-4">{percentage}%</div>
      <div className="text-sm text-gray-500">Achievement</div>
      <div className="flex justify-between w-full mt-4">
        <div className="text-center">
          <div className="text-2xl font-bold">{achievement}</div>
          <div className="text-sm text-gray-500">Achieved</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{target}</div>
          <div className="text-sm text-gray-500">Target</div>
        </div>
      </div>
    </div>
  );
};

// Define an interface for the ProgressByQuarter data
interface ProgressByQuarterData {
  quarter: string;
  target: number;
  achievement: number;
  percentage: number;
}

// Progress by Quarter Component
const ProgressByQuarter = ({ data }: { data: ProgressByQuarterData[] }) => (
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

// Define an interface for the LeadGeneration data
interface LeadGenerationData {
  month: string;
  monthly_sales: number;
  // Add any other properties that might be present in your data
}

// Lead Generation Chart Component
const LeadGenerationChart = ({ data }: { data: LeadGenerationData[] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="monthly_sales" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
)

// Deal Conversation Component
interface DealConversationData {
  week: string;
  client: number;
  hot: number;
  warm: number;
  cold: number;
  contact: number;
  dead: number;
  other: number;
}

const DealConversation = ({ data }: { data: DealConversationData[] }) => {
  const [timeframe, setTimeframe] = useState('Weekly')

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button
          variant={timeframe === 'Weekly' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTimeframe('Weekly')}
          className="mr-2"
        >
          Weekly
        </Button>
        <Button
          variant={timeframe === 'Quarterly' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setTimeframe('Quarterly')}
        >
          Quarterly
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{timeframe}</TableHead>
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
    </>
  )
}

// Define an interface for the TopClients data
interface TopClientData {
  company: string;
  revenue: number;
  percentage: number;
}

// Top Clients Component
const TopClients = ({ data }: { data: TopClientData[] }) => (
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

interface DealConversationActivityData {
  activity_type: string;
  count: number;
}

const DealConversationActivities = ({ data }: { data: DealConversationActivityData[] }) => {
  const [timeframe, setTimeframe] = useState('Today')

  console.log('DealConversationActivities data:', data)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deal Conversation Activities</CardTitle>
        <div className="flex space-x-2">
          {['Today', 'Week', 'Month'].map((period) => (
            <Button
              key={period}
              variant={timeframe === period ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeframe(period)}
            >
              {period}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Activity Type</TableHead>
              <TableHead>Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((activity) => (
                <TableRow key={activity.activity_type}>
                  <TableCell>{activity.activity_type}</TableCell>
                  <TableCell>{activity.count}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center">No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

const TopClientsTable = ({ data }: { data: TopClientData[] }) => (
  <Card>
    <CardHeader>
      <CardTitle>Top Client</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead>%</TableHead>
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
  const [targetAchievement, setTargetAchievement] = useState<TargetAchievementData>({
    percentage: 0,
    target: 0,
    achievement: 0
  });
  const [progressByQuarter, setProgressByQuarter] = useState([])
  const [leadGeneration, setLeadGeneration] = useState([])
  const [dealConversation, setDealConversation] = useState([])
  const [topClients, setTopClients] = useState([])
  const [dealConversationActivities, setDealConversationActivities] = useState([])



  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard-data')
      if (response.ok) {
        const data = await response.json()
        setSummaryStats(data.summaryStats)
        setTargetAchievement({
          percentage: data.targetAchievement.percentage,
          target: data.targetAchievement.target,
          achievement: data.targetAchievement.achievement
        })
        setProgressByQuarter(data.progressByQuarter)
        setLeadGeneration(data.leadGeneration)
        setDealConversation(data.dealConversation)
        setTopClients(data.topClients)
        setDealConversationActivities(data.dealConversationActivities)
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
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="col-span-1">
                      <CardHeader>
                        <CardTitle>Target vs Achievement</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <TargetAchievement data={targetAchievement} />
                      </CardContent>
                    </Card>
                    <Card className="col-span-1 lg:col-span-2">
                      <CardHeader>
                        <CardTitle>Progress by Quarter</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ProgressByQuarter data={progressByQuarter} />
                      </CardContent>
                    </Card>
                    <Card className="col-span-1">
                      <CardHeader>
                        <CardTitle>Lead Generation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <LeadGenerationChart data={leadGeneration} />
                      </CardContent>
                    </Card>
                    <Card className="col-span-1 lg:col-span-2">
                      <CardHeader>
                        <CardTitle>Deal Conversation Activities</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <DealConversationActivities data={dealConversationActivities} />
                      </CardContent>
                    </Card>
                    <Card className="col-span-1 lg:col-span-2">
                      <CardHeader>
                        <CardTitle>Deal Conversation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <DealConversation data={dealConversation} />
                      </CardContent>
                    </Card>
                    <Card className="col-span-1">
                      <CardHeader>
                        <CardTitle>Top Client</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <TopClientsTable data={topClients} />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}