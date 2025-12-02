import React, { useState, useEffect } from 'react';
import { generateImageContent, refinePrompt } from '../services/geminiService';
import { VisualAsset, VisualDevTab } from '../types';
import { Wand2, Image as ImageIcon, Sparkles, Loader2, Download, RefreshCw, Layers, User, MonitorPlay, Ratio, Type, Sun, Cloud, Camera } from 'lucide-react';

interface VisualDevProps {
  initialTab?: VisualDevTab;
}

const VisualDev: React.FC<VisualDevProps> = ({ initialTab = 'poster' }) => {
  const [activeTab, setActiveTab] = useState<VisualDevTab>(initialTab);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [assets, setAssets] = useState<VisualAsset[]>([]);
  
  // Update local state if prop changes
  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  // Specific State for Poster
  const [posterRatio, setPosterRatio] = useState('2:3');
  const [posterTitle, setPosterTitle] = useState('');

  // Specific State for Character
  const [charViewType, setCharViewType] = useState('portrait');
  const [charGender, setCharGender] = useState('female');
  
  // Specific State for Scene
  const [sceneTime, setSceneTime] = useState('day');
  const [sceneWeather, setSceneWeather] = useState('sunny');

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);

    try {
      let fullPromptInput = prompt;
      
      // Construct specific prompts based on module
      if (activeTab === 'poster') {
         fullPromptInput = `Movie Poster, ${posterTitle ? `Title "${posterTitle}" in center` : ''}, ${posterRatio === '2:3' ? 'Portrait' : 'Landscape'} composition. ${prompt}. Professional typography, cinematic lighting, blockbuster style.`;
      } else if (activeTab === 'character') {
         fullPromptInput = `Character Design, ${charGender}, ${charViewType === '3view' ? 'Three-view sheet (Front, Side, Back)' : 'Cinematic Portrait'}. ${prompt}. Consistent facial features, costume design details, neutral background for concept art.`;
      } else if (activeTab === 'scene') {
         fullPromptInput = `Cinematic Environment Design. ${prompt}. Time: ${sceneTime}, Weather: ${sceneWeather}. Wide angle shot, atmospheric depth, detailed textures, concept art style.`;
      }

      const refined = await refinePrompt(fullPromptInput, activeTab);
      const imageUrl = await generateImageContent(refined);

      const newAsset: VisualAsset = {
        id: Date.now().toString(),
        type: activeTab,
        prompt: prompt, // Save user prompt for display
        imageUrl: imageUrl,
        createdAt: Date.now(),
        ratio: activeTab === 'poster' ? posterRatio : undefined,
        viewType: activeTab === 'character' ? charViewType : undefined
      };
      setAssets([newAsset, ...assets]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderPosterControls = () => (
    <div className="space-y-5 animate-in fade-in slide-in-from-left-4 duration-300">
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-3 flex items-center"><Ratio size={14} className="mr-1"/> Canvas Settings</h3>
            <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setPosterRatio('2:3')}
                  className={`flex flex-col items-center justify-center p-3 rounded border transition-all ${posterRatio === '2:3' ? 'bg-white border-blue-500 text-blue-600 shadow-sm' : 'bg-white/50 border-transparent text-gray-500 hover:bg-white'}`}
                >
                    <div className="w-4 h-6 border-2 border-current rounded mb-1"></div>
                    <span className="text-xs font-medium">Poster (2:3)</span>
                </button>
                <button 
                  onClick={() => setPosterRatio('16:9')}
                  className={`flex flex-col items-center justify-center p-3 rounded border transition-all ${posterRatio === '16:9' ? 'bg-white border-blue-500 text-blue-600 shadow-sm' : 'bg-white/50 border-transparent text-gray-500 hover:bg-white'}`}
                >
                    <div className="w-6 h-3.5 border-2 border-current rounded mb-1"></div>
                    <span className="text-xs font-medium">Banner (16:9)</span>
                </button>
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center"><Type size={16} className="mr-1 text-gray-400"/> Movie Title</label>
            <input 
              type="text" 
              value={posterTitle}
              onChange={(e) => setPosterTitle(e.target.value)}
              placeholder="e.g. The Cloud Chronicles" 
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#00CC4C] focus:border-[#00CC4C] p-2.5"
            />
            <p className="text-xs text-gray-400 mt-1">AI will attempt to integrate the title stylistically.</p>
        </div>
    </div>
  );

  const renderCharacterControls = () => (
    <div className="space-y-5 animate-in fade-in slide-in-from-left-4 duration-300">
       <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
            <h3 className="text-xs font-bold text-purple-800 uppercase tracking-wider mb-3 flex items-center"><User size={14} className="mr-1"/> Character Specs</h3>
            
            <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-600 mb-1">View Type</label>
                <div className="flex bg-white rounded-md p-1 border border-purple-100">
                    <button onClick={() => setCharViewType('portrait')} className={`flex-1 text-xs py-1.5 rounded ${charViewType === 'portrait' ? 'bg-purple-100 text-purple-700 font-bold' : 'text-gray-500'}`}>Portrait</button>
                    <button onClick={() => setCharViewType('fullbody')} className={`flex-1 text-xs py-1.5 rounded ${charViewType === 'fullbody' ? 'bg-purple-100 text-purple-700 font-bold' : 'text-gray-500'}`}>Full Body</button>
                    <button onClick={() => setCharViewType('3view')} className={`flex-1 text-xs py-1.5 rounded ${charViewType === '3view' ? 'bg-purple-100 text-purple-700 font-bold' : 'text-gray-500'}`}>3-View</button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
               <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Gender</label>
                  <select 
                    value={charGender} 
                    onChange={(e) => setCharGender(e.target.value)}
                    className="w-full bg-white border border-gray-200 text-xs rounded p-2"
                  >
                     <option value="female">Female</option>
                     <option value="male">Male</option>
                     <option value="non-binary">Non-binary</option>
                     <option value="creature">Creature/Monster</option>
                  </select>
               </div>
               <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Age Range</label>
                   <select className="w-full bg-white border border-gray-200 text-xs rounded p-2">
                     <option>Teen (13-19)</option>
                     <option>Young Adult (20-30)</option>
                     <option>Adult (30-50)</option>
                     <option>Elder (60+)</option>
                  </select>
               </div>
            </div>
       </div>
       
       <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                <User size={16} className="text-gray-500"/>
            </div>
            <p className="text-xs font-medium text-gray-600">Upload Face Reference (LoRA)</p>
            <p className="text-[10px] text-gray-400 mt-1">For actor consistency</p>
       </div>
    </div>
  );

  const renderSceneControls = () => (
     <div className="space-y-5 animate-in fade-in slide-in-from-left-4 duration-300">
        <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
            <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-3 flex items-center"><Sun size={14} className="mr-1"/> Atmosphere</h3>
             <div className="grid grid-cols-2 gap-3 mb-3">
               <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Time of Day</label>
                  <select 
                    value={sceneTime}
                    onChange={(e) => setSceneTime(e.target.value)}
                    className="w-full bg-white border border-gray-200 text-xs rounded p-2"
                  >
                     <option value="day">Day (Noon)</option>
                     <option value="golden hour">Golden Hour</option>
                     <option value="night">Night</option>
                     <option value="blue hour">Blue Hour</option>
                  </select>
               </div>
               <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Weather</label>
                   <select 
                    value={sceneWeather}
                    onChange={(e) => setSceneWeather(e.target.value)}
                    className="w-full bg-white border border-gray-200 text-xs rounded p-2"
                   >
                     <option value="sunny">Sunny / Clear</option>
                     <option value="rainy">Rainy</option>
                     <option value="foggy">Foggy / Misty</option>
                     <option value="snow">Snowy</option>
                  </select>
               </div>
            </div>
        </div>

        <div>
             <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center"><Camera size={16} className="mr-1 text-gray-400"/> Camera Shot</label>
             <div className="flex flex-wrap gap-2">
                {['Wide Angle', 'Aerial', 'Close-up', 'Eye Level', 'Low Angle'].map(shot => (
                    <button key={shot} className="text-xs border border-gray-200 bg-white px-3 py-1.5 rounded-full hover:border-[#00CC4C] hover:text-[#00CC4C] transition-colors">
                        {shot}
                    </button>
                ))}
             </div>
        </div>
     </div>
  );

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
      {/* Top Module Navigation */}
      <div className="bg-white border-b border-gray-200 px-6 py-2 flex items-center justify-between shrink-0 z-10">
           <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
              <button 
                onClick={() => setActiveTab('poster')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'poster' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <Layers size={16} className="mr-2" /> 概念海报 (Poster)
              </button>
              <button 
                onClick={() => setActiveTab('character')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'character' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <User size={16} className="mr-2" /> 角色设计 (Character)
              </button>
              <button 
                onClick={() => setActiveTab('scene')}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'scene' ? 'bg-white text-amber-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <MonitorPlay size={16} className="mr-2" /> 场景设计 (Scene)
              </button>
           </div>
           
           <div className="text-xs text-gray-400 font-mono hidden md:block">
              MODULE: {activeTab.toUpperCase()}_STUDIO_V2.0
           </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar Controls */}
        <div className="w-96 bg-white border-r border-gray-200 flex flex-col p-6 overflow-y-auto shrink-0 z-0">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Sparkles className="mr-2 text-[#00CC4C]" /> 
                {activeTab === 'poster' && '海报配置'}
                {activeTab === 'character' && '角色参数'}
                {activeTab === 'scene' && '环境参数'}
            </h2>

            {/* Dynamic Controls based on Tab */}
            {activeTab === 'poster' && renderPosterControls()}
            {activeTab === 'character' && renderCharacterControls()}
            {activeTab === 'scene' && renderSceneControls()}

            {/* Common Prompt Area */}
            <div className="mt-8 pt-8 border-t border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {activeTab === 'poster' && '海报视觉描述 (Poster Visuals)'}
                    {activeTab === 'character' && '角色特征描述 (Features)'}
                    {activeTab === 'scene' && '场景细节描述 (Details)'}
                </label>
                <textarea 
                rows={5}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={
                    activeTab === 'poster' ? "Epic battle between light and dark, high contrast..." :
                    activeTab === 'character' ? "Cyberpunk street samurai, neon glowing armor, katakana tattoos..." : 
                    "Cyberpunk city street, rain reflecting neon lights, steam rising from vents..."
                }
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#00CC4C] focus:border-transparent resize-none mb-4"
                />

                <button 
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
                className={`w-full py-3.5 rounded-lg font-bold text-white shadow-md flex items-center justify-center transition-all ${
                    isGenerating || !prompt ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#00CC4C] hover:bg-[#00b342] hover:shadow-lg hover:scale-[1.01]'
                }`}
                >
                {isGenerating ? <Loader2 className="animate-spin mr-2" /> : <Wand2 className="mr-2" />}
                {isGenerating ? 'AI 正在绘制...' : '立即生成 (Generate)'}
                </button>
            </div>
        </div>

        {/* Right Gallery/Preview Area */}
        <div className="flex-1 bg-gray-50 p-8 overflow-y-auto relative">
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-gray-200 to-transparent opacity-30 rounded-bl-full pointer-events-none"></div>

             {/* Filter Tabs (Simulated) */}
             <div className="flex items-center justify-between mb-6">
                 <h3 className="text-lg font-bold text-gray-800">生成历史 (History)</h3>
                 <div className="flex space-x-2">
                     <button className="text-xs bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-600 hover:border-[#00CC4C] transition-colors">最新</button>
                     <button className="text-xs bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-600 hover:border-[#00CC4C] transition-colors">已收藏</button>
                 </div>
             </div>

             {assets.length === 0 ? (
                <div className="h-[60vh] flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl bg-white/50">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
                        <ImageIcon size={32} className="opacity-50" />
                    </div>
                    <p className="text-lg font-medium text-gray-500">暂无{activeTab === 'poster' ? '海报' : activeTab === 'character' ? '角色' : '场景'}作品</p>
                    <p className="text-sm mt-1 text-gray-400">配置左侧参数开始创作</p>
                </div>
             ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                    {assets.filter(a => a.type === activeTab).map((asset) => (
                        <div key={asset.id} className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className={`overflow-hidden bg-gray-100 relative ${asset.ratio === '16:9' ? 'aspect-video' : 'aspect-[2/3]'}`}>
                                <img src={asset.imageUrl} alt="Generated" className="w-full h-full object-cover" />
                                
                                {/* Overlay Actions */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                     <div className="flex justify-end gap-2 mb-2">
                                        <button className="p-2 bg-white/20 backdrop-blur rounded-full hover:bg-white text-white hover:text-black transition-colors" title="Download"><Download size={16} /></button>
                                        <button className="p-2 bg-white/20 backdrop-blur rounded-full hover:bg-white text-white hover:text-black transition-colors" title="Upscale"><RefreshCw size={16} /></button>
                                     </div>
                                </div>
                                
                                {/* Badge */}
                                <div className="absolute top-2 left-2">
                                     <span className={`text-[10px] font-bold px-2 py-1 rounded shadow-sm backdrop-blur-sm bg-white/90 ${
                                         asset.type === 'poster' ? 'text-blue-700' : 
                                         asset.type === 'character' ? 'text-purple-700' : 'text-amber-700'
                                     }`}>
                                         {asset.type === 'poster' ? 'POSTER' : asset.type === 'character' ? 'CHAR' : 'SCENE'}
                                     </span>
                                </div>
                            </div>
                            
                            <div className="p-3">
                                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed" title={asset.prompt}>{asset.prompt}</p>
                                <div className="mt-3 flex items-center justify-between text-[10px] text-gray-400 border-t border-gray-50 pt-2">
                                    <span>{new Date(asset.createdAt).toLocaleTimeString()}</span>
                                    {asset.viewType && <span className="uppercase">{asset.viewType}</span>}
                                    {asset.ratio && <span>{asset.ratio}</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
             )}
        </div>
      </div>
    </div>
  );
};

export default VisualDev;