'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Search, Filter, Eye } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useStore } from '@/stores/useStore';

export default function OrdersPage() {
  const { locale } = useStore();
  const isRTL = locale === 'he';

  // Placeholder data
  const orders = [
    { id: '1001', customer: 'John Doe', total: 299.99, status: 'completed', date: '2024-02-26' },
    { id: '1002', customer: 'Jane Smith', total: 159.50, status: 'pending', date: '2024-02-25' },
    { id: '1003', customer: 'Bob Wilson', total: 450.00, status: 'processing', date: '2024-02-24' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'processing': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    if (!isRTL) return status;
    switch (status) {
      case 'completed': return 'הושלם';
      case 'pending': return 'ממתין';
      case 'processing': return 'בטיפול';
      default: return status;
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <ShoppingCart className="text-cyan-400" />
            {isRTL ? 'הזמנות' : 'Orders'}
          </h1>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder={isRTL ? 'חיפוש הזמנות...' : 'Search orders...'}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700">
            <Filter size={20} />
            {isRTL ? 'סינון' : 'Filter'}
          </button>
        </div>

        {/* Orders Table */}
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">
                  {isRTL ? 'מספר הזמנה' : 'Order ID'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">
                  {isRTL ? 'לקוח' : 'Customer'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">
                  {isRTL ? 'סכום' : 'Total'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">
                  {isRTL ? 'סטטוס' : 'Status'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">
                  {isRTL ? 'תאריך' : 'Date'}
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">
                  {isRTL ? 'פעולות' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {orders.map((order) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-700/50"
                >
                  <td className="px-6 py-4 text-white font-mono">#{order.id}</td>
                  <td className="px-6 py-4 text-white">{order.customer}</td>
                  <td className="px-6 py-4 text-cyan-400">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{order.date}</td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-gray-600 rounded-lg transition-colors">
                      <Eye size={18} className="text-gray-400" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-center text-gray-500">
          {isRTL ? 'מערכת הזמנות תהיה זמינה בקרוב' : 'Orders system coming soon'}
        </div>
      </div>
    </AdminLayout>
  );
}
