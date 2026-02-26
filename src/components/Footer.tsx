import { Calculator } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Calculator className="h-8 w-8 text-[#00D09C]" />
              <span className="ml-2 text-xl font-bold tracking-tight">FundCalc</span>
            </div>
            <p className="text-gray-400 text-sm max-w-md">
              Empowering your financial journey with accurate, easy-to-use mutual fund calculators. Plan your SIPs and lumpsum investments to achieve your financial goals.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">Calculators</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">SIP Calculator</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Lumpsum Calculator</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Step-up SIP</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">SWP Calculator</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} FundCalc. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2 md:mt-0 max-w-xl text-center md:text-right">
            Mutual Fund investments are subject to market risks, read all scheme related documents carefully. The calculators are for illustrative purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
