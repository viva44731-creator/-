import React, { useState } from 'react';
import { breakdownScript, generateImageContent } from '../services/geminiService';
import { ScriptAnalysisResult, Scene } from '../types';
import { Loader2, Wand2, Image as ImageIcon, Film, Upload, FileText, TrendingUp, Users, Activity, AlertCircle, PlayCircle, BarChart3, Layout } from 'lucide-react';

const ScriptBreakdown: React.FC = () => {
  const [scriptInput, setScriptInput] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ScriptAnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'characters' | 'scenes'>('dashboard');

  const handleAnalyze = async () => {
    if (!scriptInput.trim()) return;
    setIsAnalyzing(true);
    try {
      const analysis = await breakdownScript(scriptInput);
      setResult(analysis);
      setActiveTab('dashboard');
    } catch (e) {
      alert("Script analysis failed. Please check your API key or try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateImageForScene = async (sceneId: string) => {
    if (!result) return;
    const updatedScenes = result.scenes.map(s => s.id === sceneId ? { ...s, status: 'generating' as const } : s);
    setResult({ ...result, scenes: updatedScenes });

    const scene = result.scenes.find(s => s.id === sceneId);
    if (scene) {
      const url = await generateImageContent(scene.visualPrompt);
      const finalScenes = result.scenes.map(s => 
        s.id === sceneId ? { ...s, status: 'completed' as const, imageUrl: url } : s
      );
      setResult({ ...result, scenes: finalScenes });
    }
  };

  const renderDashboard = () => {
     if (!result) return null;

     // Simple SVG logic for Emotional Curve
     const curvePoints = result.emotionalCurve || [];
     const maxIntensity = 10;
     const width = 600;
     const height = 150;
     const stepX = width / (curvePoints.length - 1 || 1);
     
     const points = curvePoints.map((p, i) => {
        const x = i * stepX;
        const y = height - (p.intensity / maxIntensity) * height;
        return `${x},${y}`;
     }).join(' ');

     return (
        <div className="space-y-6 animate-in fade-in duration-500">
           {/* Summary Cards */}
           <div className="grid grid-cols-4 gap-4">
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                 <div className="text-purple-500 mb-1 flex items-center text-xs font-bold uppercase"><Activity size={14} className="mr-1"/> Scenes</div>
                 <div className="text-2xl font-bold text-gray-800">{result.scenes.length}</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                 <div className="text-blue-500 mb-1 flex items-center text-xs font-bold uppercase"><Users size={14} className="mr-1"/> Characters</div>
                 <div className="text-2xl font-bold text-gray-800">{result.characterProfiles?.length || 0}</div>
              </div>
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                 <div className="text-amber-500 mb-1 flex items-center text-xs font-bold uppercase"><AlertCircle size={14} className="mr-1"/> Conflicts</div>
                 <div className="text-2xl font-bold text-gray-800">{result.scenes.filter(s => s.conflict).length}</div>
              </div>
               <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                 <div className="text-green-500 mb-1 flex items-center text-xs font-bold uppercase"><Film size={14} className="mr-1"/> Est. Duration</div>
                 <div className="text-2xl font-bold text-gray-800">{Math.ceil(result.scenes.length * 1.5)} min</div>
              </div>
           </div>

           <div className="flex flex-col lg:flex-row gap-6">
              {/* Emotional Curve Chart */}
              <div className="flex-1 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                 <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                    <TrendingUp size={18} className="mr-2 text-red-500"/> 情绪张力曲线 (Emotional Tension)
                 </h3>
                 <div className="h-48 w-full relative">
                    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                       {/* Grid lines */}
                       <line x1="0" y1={height} x2={width} y2={height} stroke="#e5e7eb" strokeWidth="1" />
                       <line x1="0" y1="0" x2={width} y2="0" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
                       
                       {/* Area Fill */}
                       <path d={`M0,${height} ${points} L${width},${height} Z`} fill="rgba(239, 68, 68, 0.1)" />
                       {/* The Line */}
                       <polyline points={points} fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                       
                       {/* Dots */}
                       {curvePoints.map((p, i) => {
                          const x = i * stepX;
                          const y = height - (p.intensity / maxIntensity) * height;
                          return (
                             <g key={i} className="group cursor-pointer">
                                <circle cx={x} cy={y} r="4" fill="#fff" stroke="#ef4444" strokeWidth="2" />
                                <foreignObject x={x - 50} y={y - 40} width="100" height="40" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                   <div className="text-xs bg-gray-900 text-white p-1 rounded text-center shadow-lg transform -translate-y-1">{p.label}</div>
                                </foreignObject>
                             </g>
                          )
                       })}
                    </svg>
                 </div>
              </div>

              {/* Relationship Network (Simulated Visualization) */}
              <div className="flex-1 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                 <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                    <Activity size={18} className="mr-2 text-indigo-500"/> 人物关系网络 (Relation Graph)
                 </h3>
                 <div className="h-48 relative flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
                    {/* Simulated Graph Nodes */}
                    <div className="relative w-full h-full p-4">
                        {/* Central Node */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                            <div className="w-12 h-12 bg-indigo-500 rounded-full border-4 border-white shadow-md flex items-center justify-center text-white font-bold text-xs">主角</div>
                        </div>
                        
                        {/* Satellites */}
                        {result.characterProfiles?.slice(1, 4).map((char, idx) => {
                            const angle = (idx / 3) * Math.PI * 2;
                            const radius = 80;
                            const top = 50 + Math.sin(angle) * 30; // percentage
                            const left = 50 + Math.cos(angle) * 30; // percentage
                            return (
                               <div key={idx} className="absolute" style={{ top: `${top}%`, left: `${left}%` }}>
                                   {/* Link Line (Simulated by positioning) */}
                                   <div className="absolute top-1/2 left-1/2 w-24 h-0.5 bg-gray-300 origin-left transform -translate-y-1/2 -translate-x-1/2 -z-10" style={{ transform: `rotate(${angle + Math.PI}rad)` }}></div>
                                   
                                   <div className="w-10 h-10 bg-white border-2 border-indigo-200 rounded-full flex items-center justify-center text-[10px] text-gray-600 shadow-sm z-10 font-medium">
                                       {char.name.slice(0,2)}
                                   </div>
                               </div>
                            )
                        })}
                    </div>
                 </div>
              </div>
           </div>
     </div>
     );
  };

  const renderCharacters = () => {
    if (!result?.characterProfiles) return null;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
            {result.characterProfiles.map((char, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-24 bg-gradient-to-r from-gray-700 to-gray-900 relative">
                        <div className="absolute bottom-0 left-6 transform translate-y-1/2">
                            <div className="w-16 h-16 bg-white rounded-full p-1 shadow-md">
                                <img src={`https://ui-avatars.com/api/?name=${char.name}&background=random`} className="w-full h-full rounded-full" alt={char.name} />
                            </div>
                        </div>
                    </div>
                    <div className="pt-10 px-6 pb-6">
                        <div className="flex justify-between items-start mb-2">
                             <div>
                                <h3 className="font-bold text-lg text-gray-900">{char.name}</h3>
                                <p className="text-xs text-gray-500">{char.age}岁 · {char.role}</p>
                             </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                            {char.tags.map(tag => (
                                <span key={tag} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{tag}</span>
                            ))}
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                                <span className="text-xs font-bold text-green-700 block mb-1">GOAL (目标)</span>
                                <p className="text-gray-700">{char.goal}</p>
                            </div>
                            <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                                <span className="text-xs font-bold text-purple-700 block mb-1">MOTIVATION (动机)</span>
                                <p className="text-gray-700">{char.motivation}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
  };

  const renderScenes = () => {
      if (!result?.scenes) return null;
      return (
         <div className="space-y-6 animate-in fade-in duration-500">
            {result.scenes.map((scene) => (
                <div key={scene.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row group">
                  {/* Script Info */}
                  <div className="p-6 flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded">SCENE {scene.sceneNumber}</span>
                        <span className="font-semibold text-gray-700">{scene.location}</span>
                        <span className="text-gray-400 text-sm uppercase flex items-center"><Layout size={12} className="mr-1"/> {scene.shotType || 'Wide'}</span>
                      </div>
                      {scene.conflict && (
                          <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100 flex items-center">
                              <AlertCircle size={12} className="mr-1"/> {scene.conflict}
                          </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">{scene.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4">
                        <div><span className="font-bold text-gray-700">Camera:</span> {scene.cameraMove || 'Static'}</div>
                        <div><span className="font-bold text-gray-700">Mood:</span> {scene.mood || 'Neutral'}</div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-500 font-mono mb-1">AI Visual Prompt:</p>
                      <p className="text-sm text-gray-700 italic line-clamp-2">{scene.visualPrompt}</p>
                    </div>
                  </div>

                  {/* Visual Gen Action */}
                  <div className="w-full md:w-80 bg-gray-50 border-l border-gray-100 flex flex-col items-center justify-center p-4 relative min-h-[200px]">
                    {scene.status === 'completed' && scene.imageUrl ? (
                      <div className="relative w-full h-full">
                        <img src={scene.imageUrl} alt="Generated Scene" className="w-full h-full object-cover rounded-lg shadow-sm" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                           <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium flex items-center hover:bg-gray-100">
                              <PlayCircle size={16} className="mr-2" /> Pre-viz
                           </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="mb-3 mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                          {scene.status === 'generating' ? <Loader2 className="animate-spin text-[#00CC4C]" /> : <ImageIcon className="text-gray-400" />}
                        </div>
                        <button
                          onClick={() => generateImageForScene(scene.id)}
                          disabled={scene.status === 'generating'}
                          className="text-sm font-medium text-[#00CC4C] hover:text-[#00b342] disabled:text-gray-400"
                        >
                          {scene.status === 'generating' ? '生成中...' : '生成分镜图'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
            ))}
         </div>
      );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-full">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">智能剧本拆解 (AI Script Intelligence)</h1>
        <p className="text-gray-500 mt-2">不仅是分镜，更是对剧本语义、人物心理、冲突节奏的深度结构化。</p>
      </header>

      {!result ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center">
            <div className="max-w-2xl mx-auto">
                 <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[#00CC4C]">
                    <FileText size={40} />
                 </div>
                 <h2 className="text-xl font-bold text-gray-900 mb-4">上传剧本开始分析</h2>
                 <p className="text-gray-500 mb-8">支持 PDF, DOCX, TXT 格式。或者直接在下方粘贴剧本内容。</p>
                 
                 <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-[#00CC4C] hover:bg-green-50/10 transition-colors cursor-pointer mb-6">
                     <Upload className="mx-auto text-gray-400 mb-2" />
                     <p className="text-sm text-gray-600 font-medium">点击或拖拽文件到此处</p>
                 </div>

                 <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                    <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">OR</span></div>
                 </div>

                 <textarea
                    className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none font-mono text-sm bg-gray-50 mb-4"
                    placeholder="EXT. FOREST - NIGHT..."
                    value={scriptInput}
                    onChange={(e) => setScriptInput(e.target.value)}
                 />

                 <div className="flex justify-center gap-4">
                     <button onClick={() => setScriptInput(`EXT. ABANDONED WAREHOUSE - NIGHT
The huge metal doors groan open. DETECTIVE CHEN (40s, rugged, tired) steps in, gun drawn.
The air is thick with dust.

CHEN
I know you're here, Viper.

VIPER (O.S.)
You're late, Chen.

INT. OFFICE - CONTINUOUS
Chen kicks open the office door. VIPER (30s, sleek suit) sits calmly behind a desk, shuffling cards.

VIPER
Did you bring the file?

Chen throws a folder on the table. Tension spikes.
`)} className="text-sm text-gray-500 underline">使用示例剧本</button>
                     <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing || !scriptInput}
                        className={`flex items-center px-8 py-3 rounded-lg font-bold text-white shadow-lg transition-all ${
                            isAnalyzing || !scriptInput ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#00CC4C] hover:bg-[#00b342] hover:scale-105'
                        }`}
                        >
                        {isAnalyzing ? <><Loader2 className="animate-spin mr-2" /> 深度分析中...</> : <><Wand2 className="mr-2" /> 开始拆解</>}
                    </button>
                 </div>
            </div>
        </div>
      ) : (
        <div className="flex flex-col h-[calc(100vh-200px)]">
           {/* Navigation Tabs */}
           <div className="bg-white border-b border-gray-200 flex px-6 rounded-t-xl overflow-hidden shrink-0">
               <button 
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors flex items-center ${activeTab === 'dashboard' ? 'border-[#00CC4C] text-[#00CC4C]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
               >
                  <BarChart3 size={16} className="mr-2" /> 数据看板 (Dashboard)
               </button>
               <button 
                  onClick={() => setActiveTab('characters')}
                  className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors flex items-center ${activeTab === 'characters' ? 'border-[#00CC4C] text-[#00CC4C]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
               >
                  <Users size={16} className="mr-2" /> 角色档案 (Profiles)
               </button>
               <button 
                  onClick={() => setActiveTab('scenes')}
                  className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors flex items-center ${activeTab === 'scenes' ? 'border-[#00CC4C] text-[#00CC4C]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
               >
                  <FileText size={16} className="mr-2" /> 场次列表 (Scene List)
               </button>
               <div className="ml-auto flex items-center py-2">
                   <button onClick={() => setResult(null)} className="text-xs text-red-500 hover:underline">退出分析</button>
               </div>
           </div>

           {/* Content Area */}
           <div className="flex-1 bg-gray-50/50 p-6 overflow-y-auto border-x border-b border-gray-200 rounded-b-xl">
               {activeTab === 'dashboard' && renderDashboard()}
               {activeTab === 'characters' && renderCharacters()}
               {activeTab === 'scenes' && renderScenes()}
           </div>
        </div>
      )}
    </div>
  );
};

export default ScriptBreakdown;