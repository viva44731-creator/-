import React from 'react';
import { User, Bell, Lock, Globe, HardDrive, Shield, LogOut } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto pb-20">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">系统设置 (Settings)</h1>

      <div className="space-y-6">
        {/* Profile Section */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
           <div className="p-6 border-b border-gray-100 flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                   V
              </div>
              <div>
                  <h2 className="text-xl font-bold text-gray-900">Viva</h2>
                  <p className="text-gray-500 text-sm">高级AI产品经理 | 爱奇艺创新事业部</p>
              </div>
              <button className="ml-auto px-4 py-2 text-sm font-medium text-[#00CC4C] border border-[#00CC4C] rounded-lg hover:bg-green-50">
                  编辑资料
              </button>
           </div>
           <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">工作邮箱</label>
                  <input type="text" value="viva@qiyi.com" disabled className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm text-gray-500" />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">部门 ID</label>
                  <input type="text" value="IQ-AI-LAB-07" disabled className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm text-gray-500" />
               </div>
           </div>
        </section>

        {/* Preferences */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
           <div className="p-4 border-b border-gray-100 bg-gray-50/50">
               <h3 className="font-bold text-gray-800 flex items-center gap-2">
                   <Globe size={18} /> 通用偏好
               </h3>
           </div>
           <div className="divide-y divide-gray-100">
               <div className="p-4 flex items-center justify-between hover:bg-gray-50">
                   <div>
                       <p className="text-sm font-medium text-gray-900">界面语言 (Language)</p>
                       <p className="text-xs text-gray-500">选择您偏好的显示语言</p>
                   </div>
                   <select className="bg-white border border-gray-300 text-sm rounded-lg p-2">
                       <option>简体中文</option>
                       <option>English</option>
                   </select>
               </div>
               <div className="p-4 flex items-center justify-between hover:bg-gray-50">
                   <div>
                       <p className="text-sm font-medium text-gray-900">默认模型 (Default Model)</p>
                       <p className="text-xs text-gray-500">生成任务首选的基础模型</p>
                   </div>
                   <select className="bg-white border border-gray-300 text-sm rounded-lg p-2">
                       <option>Gemini 2.5 Flash</option>
                       <option>Gemini 3 Pro (Preview)</option>
                   </select>
               </div>
           </div>
        </section>

        {/* Notifications */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
           <div className="p-4 border-b border-gray-100 bg-gray-50/50">
               <h3 className="font-bold text-gray-800 flex items-center gap-2">
                   <Bell size={18} /> 通知设置
               </h3>
           </div>
           <div className="divide-y divide-gray-100">
               <div className="p-4 flex items-center justify-between hover:bg-gray-50">
                   <div>
                       <p className="text-sm font-medium text-gray-900">任务完成通知</p>
                       <p className="text-xs text-gray-500">当批量生成任务完成时发送通知</p>
                   </div>
                   <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                       <input type="checkbox" defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-[#00CC4C] right-0"/>
                       <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[#00CC4C] cursor-pointer"></label>
                   </div>
               </div>
               <div className="p-4 flex items-center justify-between hover:bg-gray-50">
                   <div>
                       <p className="text-sm font-medium text-gray-900">安全合规提醒</p>
                       <p className="text-xs text-gray-500">当生成内容触发敏感词拦截时提醒</p>
                   </div>
                   <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                       <input type="checkbox" defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-[#00CC4C] right-0"/>
                       <label className="toggle-label block overflow-hidden h-5 rounded-full bg-[#00CC4C] cursor-pointer"></label>
                   </div>
               </div>
           </div>
        </section>

        {/* Storage */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
           <div className="p-4 border-b border-gray-100 bg-gray-50/50">
               <h3 className="font-bold text-gray-800 flex items-center gap-2">
                   <HardDrive size={18} /> 存储空间
               </h3>
           </div>
           <div className="p-6">
               <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div className="bg-[#00CC4C] h-2.5 rounded-full" style={{ width: '45%' }}></div>
               </div>
               <div className="flex justify-between text-xs text-gray-500 mb-4">
                  <span>已用 450 GB</span>
                  <span>总容量 1 TB</span>
               </div>
               <button className="text-sm text-red-600 font-medium hover:text-red-700 hover:underline">
                   清理临时缓存文件 (Clear Cache)
               </button>
           </div>
        </section>

        <button className="w-full py-3 mt-4 border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl font-bold flex items-center justify-center transition-colors">
            <LogOut size={18} className="mr-2" /> 退出登录 (Sign Out)
        </button>
      </div>
    </div>
  );
};

export default Settings;