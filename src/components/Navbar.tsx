import { Calculator, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Calculator className="h-8 w-8 text-[#00D09C]" />
            <span className="ml-2 text-xl font-bold text-gray-900 tracking-tight">FundCalc</span>
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <a href="#" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-[#00D09C] text-sm font-medium">
              Calculator
            </a>
            <a href="#about" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium transition-colors">
              About Mutual Funds
            </a>
            <a href="#faq" className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium transition-colors">
              FAQ
            </a>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#00D09C]"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden bg-white border-b border-gray-200">
          <div className="pt-2 pb-3 space-y-1">
            <a href="#" className="bg-[#00D09C]/10 border-[#00D09C] text-[#00D09C] block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
              Calculator
            </a>
            <a href="#about" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
              About Mutual Funds
            </a>
            <a href="#faq" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
              FAQ
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
