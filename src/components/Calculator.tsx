import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { calculateSIP, calculateLumpsum } from '../utils/calculations';

export default function Calculator() {
  const [calcType, setCalcType] = useState<'sip' | 'lumpsum'>('sip');
  
  // Inputs
  const [investment, setInvestment] = useState<number | ''>(25000);
  const [returnRate, setReturnRate] = useState<number | ''>(12);
  const [timePeriod, setTimePeriod] = useState<number | ''>(10);
  const [showTable, setShowTable] = useState<boolean>(false);

  const safeInvestment = Number(investment) || 0;
  const safeReturnRate = Number(returnRate) || 0;
  const safeTimePeriod = Number(timePeriod) || 0;

  const results = useMemo(() => {
    if (calcType === 'sip') {
      return calculateSIP(safeInvestment, safeReturnRate, safeTimePeriod);
    } else {
      return calculateLumpsum(safeInvestment, safeReturnRate, safeTimePeriod);
    }
  }, [calcType, safeInvestment, safeReturnRate, safeTimePeriod]);

  const chartData = [
    { name: 'Invested Amount', value: results.investedAmount },
    { name: 'Est. Returns', value: results.estimatedReturns },
  ];

  const yearlyData = useMemo(() => {
    const data = [];
    for (let year = 1; year <= safeTimePeriod; year++) {
      if (calcType === 'sip') {
        const res = calculateSIP(safeInvestment, safeReturnRate, year);
        data.push({
          year,
          invested: res.investedAmount,
          returns: res.estimatedReturns,
          total: res.totalValue,
        });
      } else {
        const res = calculateLumpsum(safeInvestment, safeReturnRate, year);
        data.push({
          year,
          invested: res.investedAmount,
          returns: res.estimatedReturns,
          total: res.totalValue,
        });
      }
    }
    return data;
  }, [calcType, safeInvestment, safeReturnRate, safeTimePeriod]);

  const COLORS = ['#e2e8f0', '#00D09C']; // slate-200, Groww Green

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setInvestment('');
      return;
    }
    const num = Number(val);
    const max = calcType === 'sip' ? 1000000 : 10000000;
    if (num <= max) {
      setInvestment(num);
    } else {
      setInvestment(max);
    }
  };

  const handleReturnRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setReturnRate('');
      return;
    }
    const num = Number(val);
    if (num <= 30) {
      setReturnRate(num);
    } else {
      setReturnRate(30);
    }
  };

  const handleTimePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setTimePeriod('');
      return;
    }
    const num = Number(val);
    if (num <= 40) {
      setTimePeriod(num);
    } else {
      setTimePeriod(40);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {calcType === 'sip' ? 'SIP Calculator' : 'Lumpsum Calculator'}
        </h2>
        
        {/* Tabs */}
        <div className="flex space-x-2 mb-10">
          <button
            className={`px-6 py-2 rounded-full font-medium text-sm transition-colors ${
              calcType === 'sip' ? 'bg-[#00D09C]/10 text-[#00D09C]' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => {
              setCalcType('sip');
              if (safeInvestment > 1000000) setInvestment(1000000);
            }}
          >
            SIP
          </button>
          <button
            className={`px-6 py-2 rounded-full font-medium text-sm transition-colors ${
              calcType === 'lumpsum' ? 'bg-[#00D09C]/10 text-[#00D09C]' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => {
              setCalcType('lumpsum');
              if (safeInvestment < 500) setInvestment(500);
            }}
          >
            Lumpsum
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Section */}
          <div className="space-y-10">
            {/* Investment Amount */}
            <div>
              <div className="flex justify-between mb-4 items-center">
                <label className="text-gray-700 font-medium">
                  {calcType === 'sip' ? 'Monthly investment' : 'Total investment'}
                </label>
                <div className="flex items-center bg-[#00D09C]/10 rounded px-3 py-1.5 focus-within:ring-1 focus-within:ring-[#00D09C] transition-shadow">
                  <span className="text-[#00D09C] font-medium mr-1">₹</span>
                  <input
                    type="number"
                    value={investment}
                    onChange={handleInvestmentChange}
                    className="bg-transparent text-[#00D09C] font-medium w-20 outline-none text-right"
                  />
                </div>
              </div>
              <input
                type="range"
                min={500}
                max={calcType === 'sip' ? 1000000 : 10000000}
                step={500}
                value={safeInvestment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#00D09C]"
              />
            </div>

            {/* Expected Return Rate */}
            <div>
              <div className="flex justify-between mb-4 items-center">
                <label className="text-gray-700 font-medium">Expected return rate (p.a)</label>
                <div className="flex items-center bg-[#00D09C]/10 rounded px-3 py-1.5 focus-within:ring-1 focus-within:ring-[#00D09C] transition-shadow">
                  <input
                    type="number"
                    value={returnRate}
                    onChange={handleReturnRateChange}
                    className="bg-transparent text-[#00D09C] font-medium w-12 outline-none text-right"
                  />
                  <span className="text-[#00D09C] font-medium ml-1">%</span>
                </div>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                step={0.1}
                value={safeReturnRate}
                onChange={(e) => setReturnRate(Number(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#00D09C]"
              />
            </div>

            {/* Time Period */}
            <div>
              <div className="flex justify-between mb-4 items-center">
                <label className="text-gray-700 font-medium">Time period</label>
                <div className="flex items-center bg-[#00D09C]/10 rounded px-3 py-1.5 focus-within:ring-1 focus-within:ring-[#00D09C] transition-shadow">
                  <input
                    type="number"
                    value={timePeriod}
                    onChange={handleTimePeriodChange}
                    className="bg-transparent text-[#00D09C] font-medium w-12 outline-none text-right"
                  />
                  <span className="text-[#00D09C] font-medium ml-1">Yr</span>
                </div>
              </div>
              <input
                type="range"
                min={1}
                max={40}
                step={1}
                value={safeTimePeriod}
                onChange={(e) => setTimePeriod(Number(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#00D09C]"
              />
            </div>
          </div>

          {/* Results Section */}
          <div className="flex flex-col">
            <div className="w-full space-y-5 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Invested amount</span>
                <span className="font-medium text-gray-800">{formatCurrency(results.investedAmount)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Est. returns</span>
                <span className="font-medium text-gray-800">{formatCurrency(results.estimatedReturns)}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-500">Total value</span>
                <span className="font-medium text-gray-800">{formatCurrency(results.totalValue)}</span>
              </div>
            </div>

            <div className="w-full h-64 mt-auto">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={0}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Yearly Growth Table Toggle */}
      <div className="border-t border-gray-100 p-6 md:p-8 bg-gray-50/50">
        <button
          onClick={() => setShowTable(!showTable)}
          className="w-full py-3 px-4 border border-[#00D09C] text-[#00D09C] rounded-lg font-medium hover:bg-[#00D09C]/5 transition-colors flex items-center justify-center gap-2"
        >
          {showTable ? 'Hide' : 'Show'} Year by Year Growth
        </button>

        {showTable && (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-sm text-gray-500">
                  <th className="py-3 px-4 font-medium">Year</th>
                  <th className="py-3 px-4 font-medium text-right">Invested Amount</th>
                  <th className="py-3 px-4 font-medium text-right">Est. Returns</th>
                  <th className="py-3 px-4 font-medium text-right">Total Value</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {yearlyData.map((row) => (
                  <tr key={row.year} className="border-b border-gray-100 hover:bg-white transition-colors">
                    <td className="py-3 px-4 text-gray-900">{row.year}</td>
                    <td className="py-3 px-4 text-right text-gray-600">{formatCurrency(row.invested)}</td>
                    <td className="py-3 px-4 text-right text-[#00D09C]">{formatCurrency(row.returns)}</td>
                    <td className="py-3 px-4 text-right font-medium text-gray-900">{formatCurrency(row.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
