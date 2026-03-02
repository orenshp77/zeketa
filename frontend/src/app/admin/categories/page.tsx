'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FolderTree, Plus, Edit2, Trash2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useStore } from '@/stores/useStore';

interface Category {
  id: string;
  nameHe: string;
  nameEn: string;
  slug: string;
  parentId: string | null;
  children?: Category[];
}

export default function CategoriesPage() {
  const { locale } = useStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isRTL = locale === 'he';

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/tree`);
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCategory = (category: Category, level = 0) => (
    <motion.div
      key={category.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`p-4 bg-gray-800 rounded-lg mb-2 ${level > 0 ? 'mr-6 border-r-2 border-cyan-400' : ''}`}
      style={{ marginRight: isRTL ? level * 24 : 0, marginLeft: isRTL ? 0 : level * 24 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FolderTree className="text-cyan-400" size={20} />
          <span className="text-white font-medium">
            {isRTL ? category.nameHe : category.nameEn}
          </span>
          <span className="text-gray-500 text-sm">({category.slug})</span>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <Edit2 size={16} className="text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <Trash2 size={16} className="text-red-400" />
          </button>
        </div>
      </div>
      {category.children?.map((child) => renderCategory(child, level + 1))}
    </motion.div>
  );

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">
            {isRTL ? 'קטגוריות' : 'Categories'}
          </h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors">
            <Plus size={20} />
            {isRTL ? 'קטגוריה חדשה' : 'Add Category'}
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="space-y-2">
            {categories.map((cat) => renderCategory(cat))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
