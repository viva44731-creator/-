import React, { useState, useEffect } from 'react';
import { Video, Play, Pause, Settings2, Sliders, Layers, ChevronRight, Film } from 'lucide-react';

const PreVizStudio: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timelinePos, setTimelinePos] = useState(0);

  // Mock generation process
  const handleGenerate = () => {
    setIsGenerating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  // Mock Playback
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
        interval = setInterval(() => {
            setTimelinePos(prev => (prev >= 100 ? 0 : prev + 1));
        }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-[#1a1a1a] text-gray-300">
       <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Left Control Panel */}
        <div className="w-full md:w-80 bg-[#222] border-r border-[#333] flex flex-col md:overflow-y-auto shrink-0">
            <div className="p-4 border-b border-[#333]">
                <h2 className="text-sm font-bold text-white flex items-center uppercase tracking-wider">
                    <Video className="mr-2 text-[#00CC4C]" size={16} />
                    I2V Generation
                </h2>
            </div>
            
            <div className="p-5 space-y-6">
                <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase">Input Keyframe</label>
                    <div className="aspect-video bg-[#333] rounded-lg border border-[#444] flex items-center justify-center cursor-pointer hover:border-[#00CC4C] transition-colors relative overflow-hidden group">
                        <img src="https://picsum.photos/id/48/400/225" alt="Source" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                        <span className="relative z-10 bg-black/60 px-2 py-1 rounded text-xs font-mono text-white">SCENE_03.png</span>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase">Camera Motion</label>
                    <div className="grid grid-cols-2 gap-2">
                        <button className="px-3 py-2 border border-[#00CC4C] bg-[#00CC4C]/10 text-[#00CC4C] rounded text-xs font-medium">Pan Left</button>
                        <button className="px-3 py-2 border border-[#444] bg-[#2a2a2a] hover:bg-[#333] rounded text-xs">Pan Right</button>
                        <button className="px-3 py-2 border border-[#444] bg-[#2a2a2a] hover:bg-[#333] rounded text-xs">Zoom In</button>
                        <button className="px-3 py-2 border border-[#444] bg-[#2a2a2a] hover:bg-[#333] rounded text-xs">Tilt Up</button>
                    </div>
                </div>

                <div className="space-y-4">
                     <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-xs text-gray-500">Motion Strength</span>
                            <span className="text-xs text-[#00CC4C]">5.0</span>
                        </div>
                        <input type="range" min="1" max="10" defaultValue="5" className="w-full h-1 bg-[#444] rounded-lg appearance-none cursor-pointer accent-[#00CC4C]" />
                     </div>
                     <div>
                        <div className="flex justify-between mb-1">
                            <span className="text-xs text-gray-500">Duration</span>
                            <span className="text-xs text-[#00CC4C]">4s</span>
                        </div>
                        <input type="range" min="2" max="5" defaultValue="4" className="w-full h-1 bg-[#444] rounded-lg appearance-none cursor-pointer accent-[#00CC4C]" />
                     </div>
                </div>
            </div>

            <div className="mt-auto p-5 border-t border-[#333]">
                <button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className={`w-full py-3 rounded text-sm font-bold text-white shadow-lg flex items-center justify-center transition-all ${isGenerating ? 'bg-[#333]' : 'bg-[#00CC4C] hover:bg-[#00b342]'}`}
                >
                    {isGenerating ? <span className="animate-pulse">Rendering... {progress}%</span> : 'GENERATE VIDEO'}
                </button>
            </div>
        </div>

        {/* Main Viewport */}
        <div className="flex-1 flex flex-col relative bg-[#111] min-h-[400px]">
            <div className="absolute top-4 right-4 flex space-x-2 z-10">
                <button className="p-2 bg-black/40 backdrop-blur rounded hover:bg-black/60 text-white transition-colors border border-white/10"><Layers size={16} /></button>
                <button className="p-2 bg-black/40 backdrop-blur rounded hover:bg-black/60 text-white transition-colors border border-white/10"><Settings2 size={16} /></button>
            </div>

            <div className="flex-1 flex items-center justify-center p-8">
                 {isGenerating ? (
                     <div className="w-full max-w-3xl aspect-video bg-black rounded border border-[#333] flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="w-full h-full bg-[url('https://picsum.photos/id/48/800/450')] bg-cover blur-sm opacity-50 animate-pulse"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                             <div className="w-64 h-2 bg-[#333] rounded-full overflow-hidden mb-2">
                                <div className="h-full bg-[#00CC4C] transition-all duration-150" style={{ width: `${progress}%` }}></div>
                             </div>
                             <p className="text-xs font-mono text-[#00CC4C]">PROCESSING FRAMES [{progress}/100]</p>
                        </div>
                     </div>
                 ) : (
                    <div className="w-full max-w-3xl aspect-video bg-black rounded border border-[#333] shadow-2xl relative group overflow-hidden">
                        <img src="https://picsum.photos/id/48/800/450" alt="Result" className="w-full h-full object-cover opacity-90" />
                        
                        {/* Play Overlay */}
                        <div className={`absolute inset-0 flex items-center justify-center ${isPlaying ? 'opacity-0' : 'opacity-100'} hover:opacity-100 transition-opacity bg-black/20`}>
                            <button 
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-16 h-16 bg-[#00CC4C]/90 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg"
                            >
                                {isPlaying ? <Pause fill="white" className="text-white" /> : <Play fill="white" className="text-white ml-1" />}
                            </button>
                        </div>
                    </div>
                 )}
            </div>
        </div>
       </div>

       {/* Timeline */}
       <div className="h-64 bg-[#1a1a1a] border-t border-[#333] flex flex-col shrink-0">
            <div className="h-10 border-b border-[#333] flex items-center px-4 justify-between bg-[#222]">
                <div className="flex items-center space-x-4">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-[#00CC4C]">
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </button>
                    <span className="text-xs font-mono text-[#00CC4C]">00:00:0{Math.floor(timelinePos/25)}:{(timelinePos % 25).toString().padStart(2, '0')}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Sliders size={14} className="text-gray-500" />
                </div>
            </div>
            
            <div className="flex-1 p-4 overflow-x-auto relative">
                 {/* Playhead */}
                 <div className="absolute top-0 bottom-0 w-px bg-red-500 z-20 pointer-events-none" style={{ left: `${20 + timelinePos * 5}px` }}>
                     <div className="w-3 h-3 bg-red-500 -ml-1.5 rotate-45 transform -translate-y-1.5"></div>
                 </div>

                 {/* Tracks */}
                 <div className="space-y-2">
                     <div className="flex items-center">
                         <div className="w-24 text-xs text-gray-500 font-mono shrink-0">V1 (VIDEO)</div>
                         <div className="h-16 bg-[#00CC4C]/20 border border-[#00CC4C]/40 rounded w-[600px] relative overflow-hidden flex">
                            {[1,2,3,4,5,6].map(i => (
                                <div key={i} className="flex-1 border-r border-[#00CC4C]/20 bg-[url('https://picsum.photos/id/48/100/100')] bg-cover opacity-50"></div>
                            ))}
                         </div>
                     </div>
                     <div className="flex items-center">
                         <div className="w-24 text-xs text-gray-500 font-mono shrink-0">A1 (AUDIO)</div>
                         <div className="h-8 bg-blue-900/30 border border-blue-800/40 rounded w-[600px] flex items-center px-2">
                             <div className="w-full h-4 bg-[url('https://upload.wikimedia.org/wikipedia/commons/2/21/Waveform.png')] bg-repeat-x opacity-40 filter invert"></div>
                         </div>
                     </div>
                 </div>
            </div>
       </div>
    </div>
  );
};

export default PreVizStudio;