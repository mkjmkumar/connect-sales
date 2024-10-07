import Link from 'next/link'
import { useState } from 'react'
import { 
  ChevronDown, LayoutDashboard, BarChart2, FileText, HelpCircle, LogOut, Building, Users, Briefcase, Calculator, Receipt
} from 'lucide-react'

const MenuItem = ({ icon: Icon, label, href, subItems }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Link 
        href={href} 
        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-all duration-200 ease-in-out"
        onClick={(e) => {
          if (subItems) {
            e.preventDefault()
            setIsOpen(!isOpen)
          }
        }}
      >
        <Icon className="mr-3 h-5 w-5 text-gray-500" />
        <span className="text-base font-medium">{label}</span>
        {subItems && (
          <span className={`ml-auto transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDown className="h-4 w-4" />
          </span>
        )}
      </Link>
      {subItems && (
        <div 
          className={`overflow-hidden transition-all duration-200 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pl-10 py-2 space-y-1">
            {subItems.map((item, index) => (
              <Link 
                key={index} 
                href={item.href} 
                className="flex items-center py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-150 ease-in-out"
              >
                {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md h-screen flex flex-col font-sans">
      <div className="px-6 py-6">
        <img src="/images/logo.png" alt="Indo-Sakura Logo" className="h-16 w-auto" />
      </div>
      <nav className="mt-6 flex-grow space-y-1">
        <MenuItem icon={LayoutDashboard} label="Dashboard" href="/dashboard" />
        <MenuItem 
          icon={BarChart2} 
          label="Sales" 
          href="/sales" 
          subItems={[
            { icon: LayoutDashboard, label: 'Sales Dashboard', href: '/sales/dashboard' },
            { icon: Building, label: 'Company', href: '/sales/company' },
            { icon: Users, label: 'Lead', href: '/sales/lead' },
            { icon: Briefcase, label: 'Deal', href: '/sales/deal' },
          ]} 
        />
        <MenuItem 
          icon={FileText} 
          label="Billing" 
          href="/billing" 
          subItems={[
            { icon: LayoutDashboard, label: 'Billing Dashboard', href: '/billing/dashboard' },
            { icon: Calculator, label: 'Estimate', href: '/billing/estimate' },
            { icon: Receipt, label: 'Invoice', href: '/billing/invoice' },
          ]} 
        />
        <MenuItem icon={HelpCircle} label="FAQ" href="/faq" />
      </nav>
      <div className="mt-auto mb-6">
        <MenuItem icon={LogOut} label="Logout" href="/logout" />
      </div>
    </div>
  )
}