import { useState } from 'react'
import Link from 'next/link'
import { 
  ChevronDown, LayoutDashboard, BarChart2, FileText, HelpCircle, LogOut, Building, Users, Briefcase, Calculator, Receipt, ChevronLeft, ChevronRight
} from 'lucide-react'
import { LucideProps } from 'lucide-react'

// Define LucideIcon type
type LucideIcon = React.ComponentType<LucideProps>

interface SubItem {
  label: string;
  href: string;
  icon?: LucideIcon;
}

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  subItems?: SubItem[];
  isCollapsed?: boolean;
}

const MenuItem = ({ icon: Icon, label, href, subItems, isCollapsed }: MenuItemProps & { isCollapsed: boolean }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Link 
        href={href} 
        className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-all duration-200 ease-in-out ${isCollapsed ? 'justify-center' : ''}`}
        onClick={(e) => {
          if (subItems && !isCollapsed) {
            e.preventDefault()
            setIsOpen(!isOpen)
          }
        }}
      >
        <Icon className={`h-5 w-5 text-gray-500 ${isCollapsed ? '' : 'mr-3'}`} />
        {!isCollapsed && (
          <>
            <span className="text-base font-medium">{label}</span>
            {subItems && (
              <span className={`ml-auto transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                <ChevronDown className="h-4 w-4" />
              </span>
            )}
          </>
        )}
      </Link>
      {!isCollapsed && subItems && (
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
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className={`bg-white shadow-md h-screen flex flex-col font-sans transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="px-4 py-3 flex justify-between items-center">
        {!isCollapsed && <img src="/images/logo.png" alt="Indo-Sakura Logo" className="h-12 w-auto" />}
        <button 
          onClick={toggleSidebar} 
          className={`p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 ${isCollapsed ? 'ml-auto' : ''}`}
        >
          {isCollapsed ? (
            <ChevronRight className="h-6 w-6 text-gray-600" />
          ) : (
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>
      <nav className="mt-6 flex-grow space-y-1">
        <MenuItem icon={LayoutDashboard} label="Dashboard" href="/dashboard" isCollapsed={isCollapsed} />
        <MenuItem 
          icon={BarChart2} 
          label="Sales" 
          href="/sales" 
          isCollapsed={isCollapsed}
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
          isCollapsed={isCollapsed}
          subItems={[
            { icon: LayoutDashboard, label: 'Billing Dashboard', href: '/billing/dashboard' },
            { icon: Calculator, label: 'Estimate', href: '/billing/estimate' },
            { icon: Receipt, label: 'Invoice', href: '/billing/invoice' },
          ]} 
        />
        <MenuItem icon={HelpCircle} label="FAQ" href="/faq" isCollapsed={isCollapsed} />
      </nav>
      <div className="mt-auto mb-6">
        <MenuItem icon={LogOut} label="Logout" href="/logout" isCollapsed={isCollapsed} />
      </div>
    </div>
  )
}