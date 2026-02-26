/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Calculator from './components/Calculator';
import SEO from './components/SEO';
import SocialShare from './components/SocialShare';
import AdSense from './components/AdSense';

export default function App() {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://fundcalc.example.com';

  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
        <SEO 
          title="Mutual Fund SIP & Lumpsum Calculator | Plan Your Investments"
          description="Free online mutual fund calculator for SIP and Lumpsum investments. Calculate expected returns, wealth gain, and total maturity value easily."
          keywords="mutual fund calculator, sip calculator, lumpsum calculator, investment calculator, return calculator, finance"
          url={currentUrl}
        />
        
        <Navbar />

        <main className="flex-grow">
          {/* Hero Section */}
          <div className="bg-white border-b border-gray-200 pt-16 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-4">
                Mutual Fund <span className="text-[#00D09C]">Calculator</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Plan your financial future with precision. Calculate your SIP and Lumpsum returns instantly.
              </p>
              <div className="mt-8 flex justify-center">
                <SocialShare url={currentUrl} title="Check out this awesome Mutual Fund Calculator!" />
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            {/* Top AdSense Placeholder */}
            <div className="mb-8 bg-gray-100 rounded-lg border border-gray-200 p-4 text-center text-gray-400 text-sm">
              <p className="mb-2">Advertisement</p>
              <AdSense client="ca-pub-XXXXXXXXXXXXXXXX" slot="XXXXXXXXXX" className="min-h-[90px]" />
            </div>

            {/* Calculator Component */}
            <div className="max-w-5xl mx-auto">
              <Calculator />
            </div>

            {/* Bottom AdSense Placeholder */}
            <div className="mt-12 bg-gray-100 rounded-lg border border-gray-200 p-4 text-center text-gray-400 text-sm">
              <p className="mb-2">Advertisement</p>
              <AdSense client="ca-pub-XXXXXXXXXXXXXXXX" slot="XXXXXXXXXX" className="min-h-[90px]" />
            </div>

            {/* SEO Content Section */}
            <div className="mt-16 max-w-4xl mx-auto text-gray-600" id="about">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How to use the Mutual Fund Calculator?</h2>
              <p className="mb-4 text-lg leading-relaxed">
                Our mutual fund calculator is designed to help you estimate the potential returns on your mutual fund investments. Whether you are planning to invest a lump sum amount or start a Systematic Investment Plan (SIP), this tool provides a clear picture of your wealth accumulation over time.
              </p>
              
              <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">What is a SIP?</h3>
              <p className="mb-4 text-lg leading-relaxed">
                A Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly (e.g., monthly) in a mutual fund scheme. It instills financial discipline and helps average out the cost of investment through rupee cost averaging.
              </p>

              <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">What is a Lumpsum Investment?</h3>
              <p className="mb-4 text-lg leading-relaxed">
                A lumpsum investment involves investing a significant amount of money in a mutual fund at one go. This strategy is beneficial when you have a large sum of money available, such as a bonus or inheritance, and want to deploy it for long-term growth.
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  );
}
