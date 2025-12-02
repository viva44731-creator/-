import React, { useState } from 'react';
import { generateImageContent, refinePrompt } from '../services/geminiService';
import { ShoppingBag, Gift, Box, Smartphone, Wand2, Loader2, ArrowRight } from 'lucide-react';

const MarketingStudio: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState('blindbox');
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const productTypes = [
    { id: 'blindbox', label: 'Q版盲盒 (Blind Box)', icon: Box, desc: '3D PVC Material, Studio Lighting' },
    { id: 'plush', label: '毛绒玩具 (Plush)', icon: Gift, desc: 'Soft Fabric, Stitching Details' },
    { id: 'poster', label: '宣发海报 (Poster)', icon: ShoppingBag, desc: 'High Contrast, Typography Space' },
    { id: 'app_splash', label: 'APP开屏 (Splash)', icon: Smartphone, desc: 'Vertical 9:16, Brand Colors' },
  ];

  const handleSourceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
     // Simulate upload by just reading a file locally or using a placeholder
     // For demo, we just set a static high-quality character image as "uploaded"
     setSourceImage('https://picsum.photos/id/64/400/600'); 
  };

  const handleGenerateMerch = async () => {
    if (!sourceImage) return;
    setIsGenerating(true);
    setResultImage(null);

    try {
       const product = productTypes.find(p => p.id === selectedProduct);
       // Construct a prompt that asks to transform the "source" concept into the merch
       const prompt = `A high quality product photography of a ${product?.desc} based on a fantasy character. Professional studio lighting, 4k, commercial advertisement style.`;
       
       const generatedUrl = await generateImageContent(prompt);
       setResultImage(generatedUrl);
    } catch (e) {
       console.error(e);
    } finally {
       setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-full">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">IP 营销与衍生工坊 (Merch Studio)</h1>
        <p className="text-gray-500 mt-2">将角色资产快速转化为商业化衍生品预览图。</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
         {/* Left: Configuration */}
         <div className="w-full lg:w-1/3 space-y-8">
            {/* Step 1: Source */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
               <h3 className="font-bold text-gray-800 mb-4 flex items-center"><span className="bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">1</span> 选择源素材</h3>
               
               {sourceImage ? (
                 <div className="relative group">
                    <img src={sourceImage} alt="Source" className="w-full h-64 object-cover rounded-lg" />
                    <button 
                      onClick={() => setSourceImage(null)}
                      className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 text-xs px-3"
                    >
                      Change
                    </button>
                 </div>
               ) : (
                 <label className="border-2 border-dashed border-gray-300 rounded-lg h-64 flex flex-col items-center justify-center cursor-pointer hover:border-[#00CC4C] hover:bg-green-50/20 transition-all">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-2">
                      <ShoppingBag />
                    </div>
                    <span className="text-sm font-medium text-gray-600">点击上传角色图</span>
                    <input type="file" className="hidden" onChange={handleSourceUpload} />
                 </label>
               )}
            </div>

            {/* Step 2: Product Type */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
               <h3 className="font-bold text-gray-800 mb-4 flex items-center"><span className="bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">2</span> 选择衍生品类型</h3>
               <div className="grid grid-cols-2 gap-3">
                  {productTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedProduct(type.id)}
                      className={`p-3 rounded-lg border text-left transition-all ${selectedProduct === type.id ? 'border-[#00CC4C] bg-green-50 ring-1 ring-[#00CC4C]' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                       <type.icon size={20} className={`mb-2 ${selectedProduct === type.id ? 'text-[#00CC4C]' : 'text-gray-400'}`} />
                       <div className="text-sm font-bold text-gray-800">{type.label}</div>
                       <div className="text-[10px] text-gray-500 mt-1">{type.desc}</div>
                    </button>
                  ))}
               </div>
            </div>

            <button
               onClick={handleGenerateMerch}
               disabled={!sourceImage || isGenerating}
               className={`w-full py-4 rounded-xl font-bold text-white shadow-lg text-lg flex items-center justify-center transition-all ${
                 !sourceImage || isGenerating ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-[#00CC4C] to-[#00A33D] hover:scale-[1.02]'
               }`}
            >
               {isGenerating ? <Loader2 className="animate-spin mr-2" /> : <Wand2 className="mr-2" />}
               生成衍生品预览
            </button>
         </div>

         {/* Right: Preview */}
         <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-8 flex items-center justify-center min-h-[500px] relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
             {!resultImage ? (
                <div className="text-center text-gray-400">
                   <Box size={64} className="mx-auto mb-4 opacity-20" />
                   <p className="text-lg">等待生成...</p>
                </div>
             ) : (
                <div className="relative w-full max-w-md shadow-2xl rounded-lg overflow-hidden transform transition-all animate-in fade-in zoom-in duration-500">
                   <img src={resultImage} alt="Merch Result" className="w-full h-auto" />
                   <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur p-4 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                         <div>
                            <p className="font-bold text-gray-800">Generated Preview</p>
                            <p className="text-xs text-gray-500">Commercial License Ready</p>
                         </div>
                         <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium">Download</button>
                      </div>
                   </div>
                </div>
             )}
         </div>
      </div>
    </div>
  );
};

export default MarketingStudio;