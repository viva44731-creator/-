import React from 'react';
import { AppView, VisualDevTab } from '../types';
import { ArrowRight, Star, Clock, Box, Zap, Image as LucideImage, Video, PenTool } from 'lucide-react';

interface DashboardProps {
  onChangeView: (view: AppView, context?: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onChangeView }) => {
  const tools = [
    {
      title: "概念海报 (Poster)",
      desc: "AI捕捉海报创意精髓，支持爱奇艺专用包版与标题排版。",
      icon: LucideImage,
      view: AppView.VISUAL_DEV,
      initialTab: 'poster',
      color: "bg-blue-50 text-blue-600",
      img: "https://picsum.photos/id/28/400/250"
    },
    {
      title: "场景设计 (Scene Gen)",
      desc: "深入剧本解析场景特点，快速生成逼真的视觉草图。",
      icon: Box,
      view: AppView.VISUAL_DEV,
      initialTab: 'scene',
      color: "bg-amber-50 text-amber-600",
      img: "https://picsum.photos/id/56/400/250"
    },
    {
      title: "角色设计 (Character)",
      desc: "基于Actor LoRA训练，生成三视图与定妆照。",
      icon: Star,
      view: AppView.VISUAL_DEV,
      initialTab: 'character',
      color: "bg-purple-50 text-purple-600",
      img: "https://picsum.photos/id/64/400/250"
    },
    {
      title: "分镜生成 (Storyboarding)",
      desc: "精准解读剧本，自动构建包含运镜信息的视觉框架。",
      icon: Clock,
      view: AppView.SCRIPT_BREAKDOWN,
      color: "bg-green-50 text-green-600",
      img: "https://picsum.photos/id/111/400/250"
    },
    {
      title: "Q版/周边 (Merch)",
      desc: "从角色原型提取精髓，智能生成IP衍生品三视图。",
      icon: Zap,
      view: AppView.MARKETING,
      color: "bg-pink-50 text-pink-600",
      img: "https://picsum.photos/id/96/400/250"
    },
    {
      title: "动态预演 (Pre-viz Video)",
      desc: "NEW! 图生视频与运镜控制，辅助导演动态决策。",
      icon: Video,
      view: AppView.PRE_VIZ,
      color: "bg-indigo-50 text-indigo-600",
      img: "https://picsum.photos/id/160/400/250",
      new: true
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#D6F5E3] via-[#E8E8FF] to-[#FCE7F3] p-10 mb-10 shadow-sm">
        <div className="relative z-10">
           <div className="flex items-center space-x-2 mb-2">
             <span className="bg-white/60 backdrop-blur text-xs font-bold px-2 py-1 rounded text-gray-600">INTERNAL ONLY</span>
             <span className="text-xs font-semibold text-purple-600">V2.0 更新已上线</span>
           </div>
           <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">欢迎来到 iQIYI · 影像工坊</h1>
           <p className="text-lg text-gray-700 max-w-2xl mb-6">
             赋能影视工业化全流程。从 <span className="font-semibold text-indigo-600">剧本拆解</span> 到 <span className="font-semibold text-indigo-600">动态预演</span>，GenAI 助力创意极速落地。
           </p>
           <div className="flex gap-4">
             <button onClick={() => onChangeView(AppView.PROJECT_MANAGEMENT)} className="bg-[#00CC4C] text-white px-6 py-2.5 rounded-lg font-medium shadow-lg shadow-green-200 hover:shadow-xl hover:bg-[#00b342] transition-all flex items-center">
               开始新项目 <ArrowRight size={18} className="ml-2" />
             </button>
             <button className="bg-white/80 backdrop-blur text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-white transition-all">
               查看教程
             </button>
           </div>
        </div>
        
        {/* Abstract decorative shapes */}
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 bg-gradient-to-l from-purple-400 to-transparent mix-blend-multiply pointer-events-none"></div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden flex flex-col">
            <div className="h-40 overflow-hidden relative">
               <img src={tool.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={tool.title} />
               <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               {tool.new && (
                 <div className="absolute top-3 right-3 bg-[#00CC4C] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">NEW</div>
               )}
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                 <h3 className="text-lg font-bold text-gray-900">{tool.title}</h3>
                 <div className={`p-2 rounded-lg ${tool.color}`}>
                   <tool.icon size={20} />
                 </div>
              </div>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-1">{tool.desc}</p>
              <button 
                onClick={() => onChangeView(tool.view, tool.initialTab ? { initialTab: tool.initialTab } : undefined)}
                className="w-full py-2.5 rounded-lg border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 group-hover:border-[#00CC4C] group-hover:text-[#00CC4C] transition-colors flex items-center justify-center"
              >
                开始设计 <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Projects Snippet */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            最近项目 
            <span className="ml-2 text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">3</span>
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-1 overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                    <tr>
                        <th className="px-6 py-3 font-medium">项目名称</th>
                        <th className="px-6 py-3 font-medium">类型</th>
                        <th className="px-6 py-3 font-medium">上次修改</th>
                        <th className="px-6 py-3 font-medium">状态</th>
                        <th className="px-6 py-3 font-medium text-right">操作</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                    <tr>
                        <td className="px-6 py-4 font-medium text-gray-800">S级古偶剧《云中录》</td>
                        <td className="px-6 py-4 text-gray-500">剧集 / 古装</td>
                        <td className="px-6 py-4 text-gray-500">2小时前</td>
                        <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">进行中</span></td>
                        <td className="px-6 py-4 text-right"><button onClick={() => onChangeView(AppView.PROJECT_MANAGEMENT)} className="text-blue-600 hover:text-blue-800">打开</button></td>
                    </tr>
                     <tr>
                        <td className="px-6 py-4 font-medium text-gray-800">迷雾剧场《第十三双眼睛》</td>
                        <td className="px-6 py-4 text-gray-500">剧集 / 悬疑</td>
                        <td className="px-6 py-4 text-gray-500">昨天</td>
                        <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">分镜审核</span></td>
                        <td className="px-6 py-4 text-right"><button onClick={() => onChangeView(AppView.PROJECT_MANAGEMENT)} className="text-blue-600 hover:text-blue-800">打开</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;