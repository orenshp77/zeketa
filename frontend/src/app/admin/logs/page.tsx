'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Filter, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useStore } from '@/stores/useStore';

interface Log {
  id: string;
  level: string;
  message: string;
  source: string;
  createdAt: string;
}

export default function LogsPage() {
  const { locale } = useStore();
  const [logs, setLogs] = useState<Log[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const isRTL = locale === 'he';

  useEffect(() => {
    // Placeholder logs
    setLogs([
      { id: '1', level: 'INFO', message: 'Successful login: admin@zeketa.com', source: 'auth', createdAt: '2024-02-26T10:30:00Z' },
      { id: '2', level: 'WARNING', message: 'Failed login attempt: test@test.com', source: 'auth', createdAt: '2024-02-26T10:25:00Z' },
      { id: '3', level: 'INFO', message: 'Product updated: SKU-12345', source: 'products', createdAt: '2024-02-26T10:20:00Z' },
      { id: '4', level: 'ERROR', message: 'Payment processing failed', source: 'orders', createdAt: '2024-02-26T10:15:00Z' },
    ]);
    setIsLoading(false);
  }, []);

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'ERROR': return AlertCircle;
      case 'WARNING': return AlertTriangle;
      default: return Info;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR': return 'text-red-400 bg-red-500/20';
      case 'WARNING': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-blue-400 bg-blue-500/20';
    }
  };

  const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.level === filter);

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <FileText className="text-cyan-400" />
            {isRTL ? 'לוגים' : 'System Logs'}
          </h1>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder={isRTL ? 'חיפוש בלוגים...' : 'Search logs...'}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="all">{isRTL ? 'הכל' : 'All'}</option>
            <option value="INFO">Info</option>
            <option value="WARNING">Warning</option>
            <option value="ERROR">Error</option>
          </select>
        </div>

        {/* Logs List */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLogs.map((log) => {
              const LevelIcon = getLevelIcon(log.level);
              return (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gray-800 rounded-lg p-4 flex items-start gap-4"
                >
                  <div className={`p-2 rounded-lg ${getLevelColor(log.level)}`}>
                    <LevelIcon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getLevelColor(log.level)}`}>
                        {log.level}
                      </span>
                      <span className="text-gray-500 text-sm">{log.source}</span>
                    </div>
                    <p className="text-white">{log.message}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      {new Date(log.createdAt).toLocaleString(isRTL ? 'he-IL' : 'en-US')}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
