import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown, ChevronRight, LayoutDashboard, DollarSign, FileText, HelpCircle } from 'lucide-react'

const MenuItem = ({ icon: Icon, label, href, subItems }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Link 
        href={href} 
        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={() => subItems && setIsOpen(!isOpen)}
      >
        <Icon className="mr-2 h-4 w-4" />
        <span>{label}</span>
        {subItems && (
          <span className="ml-auto">
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </span>
        )}
      </Link>
      {isOpen && subItems && (
        <div className="ml-4">
          {subItems.map((item, index) => (
            <Link 
              key={index} 
              href={item.href} 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
    <div className="w-64 bg-white shadow-md">
      <div className="px-4 py-5">
        <img src="/images/logo.png" alt="Indo-Sakura Logo" className="h-8" />
      </div>
      <nav className="mt-5">
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
    </div>
  )
}