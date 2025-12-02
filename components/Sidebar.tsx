import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Clapperboard, 
  ShoppingBag, 
  Palette, 
  Database, 
  Settings,
  Zap,
  Briefcase
} from 'lucide-react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const menuItems = [
    { id: AppView.DASHBOARD, label: '工作台 (Dashboard)', icon: LayoutDashboard },
    { id: AppView.PROJECT_MANAGEMENT, label: '项目管理 (Projects)', icon: Briefcase },
    { id: AppView.SCRIPT_BREAKDOWN, label: '剧本拆解 (Script)', icon: FileText },
    { id: AppView.VISUAL_DEV, label: '视觉开发 (VisDev)', icon: Palette },
    { id: AppView.PRE_VIZ, label: '动态预演 (Pre-viz)', icon: Clapperboard },
    { id: AppView.MARKETING, label: 'IP 衍生 (Merch)', icon: ShoppingBag },
    { id: AppView.ASSETS, label: '资产库 (Assets)', icon: Database },
  ];

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200 flex flex-col z-20">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-2 text-[#00CC4C]">
          <Zap size={24} fill="#00CC4C" />
          <span className="text-xl font-bold text-gray-800 tracking-tight">影像工坊 <span className="text-xs bg-gray-100 text-gray-500 px-1 rounded">V2.0</span></span>
        </div>
      </div>

      {/* User Project Context */}
      <div className="px-4 py-4 shrink-0">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg border border-green-100 cursor-pointer hover:shadow-sm transition-all">
          <p className="text-xs text-gray-500 mb-1">当前项目</p>
          <p className="text-sm font-bold text-gray-800 truncate">S级古偶剧《云中录》</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-[#00CC4C]/10 text-[#00CC4C]'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon size={20} className={`mr-3 ${isActive ? 'text-[#00CC4C]' : 'text-gray-400'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 shrink-0">
        <button 
          onClick={() => onChangeView(AppView.SETTINGS)}
          className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            currentView === AppView.SETTINGS 
             ? 'bg-gray-100 text-gray-900' 
             : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Settings size={18} className={`mr-3 ${currentView === AppView.SETTINGS ? 'text-gray-900' : 'text-gray-400'}`} />
          设置 (Settings)
        </button>
      </div>
    </div>
  );
};

export default Sidebar;