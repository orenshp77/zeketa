'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Store, Globe, CreditCard, Mail, Save } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useStore } from '@/stores/useStore';

export default function SettingsPage() {
  const { locale } = useStore();
  const isRTL = locale === 'he';

  const [settings, setSettings] = useState({
    storeName: 'ZEKETA',
    storeEmail: 'contact@zeketa.com',
    currency: 'ILS',
    language: 'he',
    freeShippingThreshold: 70,
  });

  const handleSave = () => {
    // TODO: Implement save functionality
    alert(isRTL ? 'ההגדרות נשמרו' : 'Settings saved');
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Settings className="text-cyan-400" />
            {isRTL ? 'הגדרות' : 'Settings'}
          </h1>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors"
          >
            <Save size={20} />
            {isRTL ? 'שמור שינויים' : 'Save Changes'}
          </button>
        </div>

        <div className="space-y-6">
          {/* Store Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-xl p-6"
          >
            <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
              <Store className="text-cyan-400" size={20} />
              {isRTL ? 'הגדרות חנות' : 'Store Settings'}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  {isRTL ? 'שם החנות' : 'Store Name'}
                </label>
                <input
                  type="text"
                  value={settings.storeName}
                  onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  {isRTL ? 'אימייל החנות' : 'Store Email'}
                </label>
                <input
                  type="email"
                  value={settings.storeEmail}
                  onChange={(e) => setSettings({ ...settings, storeEmail: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </motion.div>

          {/* Regional Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 rounded-xl p-6"
          >
            <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
              <Globe className="text-cyan-400" size={20} />
              {isRTL ? 'הגדרות אזוריות' : 'Regional Settings'}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  {isRTL ? 'מטבע' : 'Currency'}
                </label>
                <select
                  value={settings.currency}
                  onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="ILS">ILS (₪)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  {isRTL ? 'שפה ברירת מחדל' : 'Default Language'}
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="he">עברית</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Shipping Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-xl p-6"
          >
            <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
              <CreditCard className="text-cyan-400" size={20} />
              {isRTL ? 'הגדרות משלוח' : 'Shipping Settings'}
            </h2>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                {isRTL ? 'סף משלוח חינם ($)' : 'Free Shipping Threshold ($)'}
              </label>
              <input
                type="number"
                value={settings.freeShippingThreshold}
                onChange={(e) => setSettings({ ...settings, freeShippingThreshold: parseInt(e.target.value) })}
                className="w-full max-w-xs px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}
