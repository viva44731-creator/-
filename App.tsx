import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ScriptBreakdown from './components/ScriptBreakdown';
import PreVizStudio from './components/PreVizStudio';
import VisualDev from './components/VisualDev';
import MarketingStudio from './components/MarketingStudio';
import AssetLibrary from './components/AssetLibrary';
import ProjectManager from './components/ProjectManager';
import Settings from './components/Settings';
import { AppView, VisualDevTab } from './types';
import { Search, Bell } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  // Generic context state to pass data between views (e.g. Dashboard -> specific VisualDev tab)
  const [viewContext, setViewContext] = useState<any>(null);

  const handleViewChange = (view: AppView, context?: any) => {
    setCurrentView(view);
    if (context) {
      setViewContext(context);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard onChangeView={handleViewChange} />;
      case AppView.PROJECT_MANAGEMENT:
        return <ProjectManager />;
      case AppView.SCRIPT_BREAKDOWN:
        return <ScriptBreakdown />;
      case AppView.PRE_VIZ:
        return <PreVizStudio />;
      case AppView.VISUAL_DEV:
        return <VisualDev initialTab={viewContext?.initialTab as VisualDevTab} />;
      case AppView.MARKETING:
        return <MarketingStudio />;
      case AppView.ASSETS:
        return <AssetLibrary />;
      case AppView.SETTINGS:
        return <Settings />;
      default:
        return <Dashboard onChangeView={handleViewChange} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f3f4f6]">
      <Sidebar currentView={currentView} onChangeView={(view) => handleViewChange(view, null)} />
      
      <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm shrink-0">
          <div className="flex items-center flex-1 max-w-xl">
             <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="搜索项目、资产或功能..." 
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                />
             </div>
          </div>
          
          <div className="flex items-center space-x-6">
             <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
             </button>
             <div className="flex items-center space-x-3 pl-6 border-l border-gray-200">
                <div className="text-right hidden md:block">
                   <p className="text-sm font-bold text-gray-800">Viva</p>
                   <p className="text-xs text-gray-500">高级AI产品经理</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md cursor-pointer hover:shadow-lg transition-shadow">
                   V
                </div>
             </div>
          </div>
        </header>

        {/* Main Content Area - Enabled Scroll here for all children */}
        <main className="flex-1 overflow-y-auto relative bg-[#f3f4f6] scroll-smooth">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;