'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Edit2, Trash2, Shield, User } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useStore } from '@/stores/useStore';

interface UserType {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  lastLogin: string;
}

export default function UsersPage() {
  const { locale } = useStore();
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isRTL = locale === 'he';

  useEffect(() => {
    // Placeholder - will fetch from API when backend endpoint is ready
    setUsers([
      {
        id: '1',
        email: 'admin@zeketa.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN',
        isActive: true,
        lastLogin: '2024-02-26T10:30:00Z',
      },
    ]);
    setIsLoading(false);
  }, []);

  const getRoleIcon = (role: string) => {
    return role === 'ADMIN' ? Shield : User;
  };

  const getRoleColor = (role: string) => {
    return role === 'ADMIN' ? 'text-cyan-400' : 'text-gray-400';
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Users className="text-cyan-400" />
            {isRTL ? 'משתמשים' : 'Users'}
          </h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors">
            <Plus size={20} />
            {isRTL ? 'משתמש חדש' : 'Add User'}
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="grid gap-4">
            {users.map((user) => {
              const RoleIcon = getRoleIcon(user.role);
              return (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800 rounded-xl p-6 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                      <RoleIcon className={getRoleColor(user.role)} size={24} />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">
                        {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === 'ADMIN' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {user.role}
                      </span>
                    </div>

                    <div className="text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {user.isActive ? (isRTL ? 'פעיל' : 'Active') : (isRTL ? 'לא פעיל' : 'Inactive')}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                        <Edit2 size={18} className="text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                        <Trash2 size={18} className="text-red-400" />
                      </button>
                    </div>
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
