import React from 'react';
import { CharacterModel } from '../types';
import { Database, Plus, CheckCircle2, Loader2, Image as ImageIcon } from 'lucide-react';

const MOCK_MODELS: CharacterModel[] = [
  { id: '1', name: '东方玄幻 v3.0', triggerWord: '<lora:oriental_fantasy:0.8>', type: 'style', thumbnail: 'https://picsum.photos/id/10/200/200', status: 'ready' },
  { id: '2', name: '女主-苏浅 (Actor A)', triggerWord: 'suqian_face', type: 'face', thumbnail: 'https://picsum.photos/id/64/200/200', status: 'ready' },
  { id: '3', name: '赛博朋克-迷雾', triggerWord: 'cyber_mist', type: 'style', thumbnail: 'https://picsum.photos/id/56/200/200', status: 'ready' },
  { id: '4', name: '男主-顾寒 (Actor B)', triggerWord: 'guhan_face', type: 'face', thumbnail: 'https://picsum.photos/id/100/200/200', status: 'training', trainingProgress: 45 },
];

const AssetLibrary: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">资产库 (Asset Library)</h1>
          <p className="text-gray-500 mt-2">管理项目专属的 LoRA 模型与风格包，确保内容一致性。</p>
        </div>
        <button className="bg-[#00CC4C] text-white px-6 py-2.5 rounded-lg font-medium shadow-lg hover:bg-[#00b342] flex items-center">
            <Plus size={18} className="mr-2" /> 训练新模型
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_MODELS.map((model) => (
          <div key={model.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all group relative">
            <div className="aspect-square relative bg-gray-100">
               <img src={model.thumbnail} className={`w-full h-full object-cover ${model.status === 'training' ? 'opacity-50 blur-sm' : ''}`} alt={model.name} />
               {model.status === 'training' && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <Loader2 className="animate-spin text-blue-600 mb-2" size={32} />
                    <span className="text-sm font-bold text-blue-800 bg-blue-100 px-2 py-1 rounded">Training {model.trainingProgress}%</span>
                 </div>
               )}
               <div className="absolute top-2 right-2">
                 <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${model.type === 'face' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'}`}>
                    {model.type}
                 </span>
               </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800 truncate">{model.name}</h3>
                    <p className="text-xs text-gray-400 font-mono mt-1">{model.triggerWord}</p>
                  </div>
                  {model.status === 'ready' && <CheckCircle2 size={16} className="text-[#00CC4C] mt-1" />}
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 py-1.5 text-xs font-medium bg-gray-50 text-gray-600 rounded border border-gray-200 hover:bg-gray-100">
                   查看版本
                </button>
                <button className="flex-1 py-1.5 text-xs font-medium bg-gray-50 text-gray-600 rounded border border-gray-200 hover:bg-gray-100">
                   测试
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Upload Placeholder */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 p-8 cursor-pointer hover:border-[#00CC4C] hover:text-[#00CC4C] hover:bg-green-50/30 transition-all min-h-[300px]">
           <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-white">
              <Database size={24} />
           </div>
           <p className="font-medium">上传训练素材</p>
           <p className="text-xs mt-2 text-center max-w-[150px]">支持上传 15-20 张同一角色或场景图片</p>
        </div>
      </div>
    </div>
  );
};

export default AssetLibrary;