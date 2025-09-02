// src/pages/Dashboard.jsx
import { Card, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-white rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">Total Balance</h2>
            <p className="text-2xl font-bold mt-2">₦120,000</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-white rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">Active Investments</h2>
            <p className="text-2xl font-bold mt-2">₦60,000</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-white rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">Referral Earnings</h2>
            <p className="text-2xl font-bold mt-2">₦15,000</p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Date</th>
              <th className="p-3">Type</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-3">2025-08-25</td>
              <td className="p-3">Deposit</td>
              <td className="p-3">₦20,000</td>
              <td className="p-3 text-green-600 font-medium">Approved</td>
            </tr>
            <tr className="border-b">
              <td className="p-3">2025-08-20</td>
              <td className="p-3">Withdrawal</td>
              <td className="p-3">₦10,000</td>
              <td className="p-3 text-yellow-600 font-medium">Pending</td>
            </tr>
            <tr>
              <td className="p-3">2025-08-15</td>
              <td className="p-3">Investment</td>
              <td className="p-3">₦30,000</td>
              <td className="p-3 text-green-600 font-medium">Approved</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
