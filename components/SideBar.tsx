import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown, ChevronRight, LayoutDashboard, DollarSign, FileText, HelpCircle, LogOut } from 'lucide-react'

const MenuItem = ({ icon: Icon, label, href, subItems }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Link 
        href={href} 
        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
        onClick={(e) => {
          if (subItems) {
            e.preventDefault()
            setIsOpen(!isOpen)
          }
        }}
      >
        <Icon className="mr-3 h-5 w-5" />
        <span className="text-base font-medium">{label}</span>
        {subItems && (
          <span className="ml-auto">
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </span>
        )}
      </Link>
      {isOpen && subItems && (
        <div className="ml-12 mt-1">
          {subItems.map((item, index) => (
            <Link 
              key={index} 
              href={item.href} 
              className="block py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {item.label}
            </Link>
          ))}
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
          icon={DollarSign} 
          label="Sales" 
          href="/sales" 
          subItems={[
            { label: 'Sales Dashboard', href: '/sales/dashboard' },
            { label: 'Company', href: '/sales/company' },
            { label: 'Lead', href: '/sales/lead' },
            { label: 'Deal', href: '/sales/deal' },
          ]} 
        />
        <MenuItem 
          icon={FileText} 
          label="Billing" 
          href="/billing" 
          subItems={[
            { label: 'Billing Dashboard', href: '/billing/dashboard' },
            { label: 'Estimate', href: '/billing/estimate' },
            { label: 'Invoice', href: '/billing/invoice' },
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