import React, { useState } from 'react';
import { ProjectConfig, TeamMember, Role } from '../types';
import { 
  Users, 
  Plus, 
  Trash2, 
  Save, 
  Upload, 
  Calendar, 
  Briefcase, 
  Lock, 
  Globe,
  MoreHorizontal,
  Mail
} from 'lucide-react';

const MOCK_TEAM: TeamMember[] = [
  { id: '1', name: '张导 (Director Zhang)', role: 'Director', email: 'zhang@iqiyi.com', status: 'active', avatar: 'https://picsum.photos/id/1005/100/100' },
  { id: '2', name: '李制片 (Producer Li)', role: 'Producer', email: 'li@iqiyi.com', status: 'active', avatar: 'https://picsum.photos/id/1011/100/100' },
];

const ROLES: Role[] = ['Director', 'Producer', 'Art Director', 'Screenwriter', 'Editor', 'Concept Artist'];

const ProjectManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'details' | 'team'>('details');
  const [project, setProject] = useState<ProjectConfig>({
    id: 'new',
    title: '',
    genre: 'Ancient Costume',
    level: 'S',
    description: '',
    status: 'Development',
    createdAt: Date.now(),
    team: MOCK_TEAM,
    isPublic: false
  });

  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<Role>('Concept Artist');

  const handleInputChange = (field: keyof ProjectConfig, value: any) => {
    setProject(prev => ({ ...prev, [field]: value }));
  };

  const handleAddMember = () => {
    if (!newMemberEmail) return;
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: newMemberEmail.split('@')[0], // Mock name
      email: newMemberEmail,
      role: newMemberRole,
      status: 'invited',
      avatar: `https://ui-avatars.com/api/?name=${newMemberEmail}&background=random`
    };
    setProject(prev => ({ ...prev, team: [...prev.team, newMember] }));
    setNewMemberEmail('');
  };

  const handleRemoveMember = (id: string) => {
    setProject(prev => ({ ...prev, team: prev.team.filter(m => m.id !== id) }));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto pb-20">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">项目管理 (Project Setup)</h1>
          <p className="text-gray-500 mt-2">创建新项目，配置元数据，并邀请团队成员协作。</p>
        </div>
        <button className="bg-[#00CC4C] text-white px-6 py-2.5 rounded-lg font-bold shadow-lg hover:bg-[#00b342] flex items-center transition-all hover:scale-105">
           <Save size={18} className="mr-2" /> 保存项目 (Create Project)
        </button>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
           <button 
             onClick={() => setActiveTab('details')}
             className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition-colors ${activeTab === 'details' ? 'border-[#00CC4C] text-[#00CC4C] bg-green-50/30' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
           >
             项目详情 (Details)
           </button>
           <button 
             onClick={() => setActiveTab('team')}
             className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition-colors ${activeTab === 'team' ? 'border-[#00CC4C] text-[#00CC4C] bg-green-50/30' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
           >
             团队管理 (Team & Permissions)
           </button>
        </div>

        {/* Content */}
        <div className="p-8 min-h-[500px]">
           {activeTab === 'details' ? (
             <div className="flex flex-col md:flex-row gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {/* Left: Cover Upload */}
                <div className="w-full md:w-1/3">
                   <label className="block text-sm font-bold text-gray-700 mb-2">项目封面 (Cover)</label>
                   <div className="aspect-[2/3] bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-[#00CC4C] hover:bg-green-50/10 transition-all group relative overflow-hidden">
                       {project.coverImage ? (
                          <>
                             <img src={project.coverImage} className="w-full h-full object-cover" alt="cover" />
                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                更换封面
                             </div>
                          </>
                       ) : (
                          <>
                             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 text-gray-400 group-hover:text-[#00CC4C] shadow-sm">
                                <Upload size={20} />
                             </div>
                             <p className="text-sm font-medium text-gray-500 group-hover:text-[#00CC4C]">点击上传封面图</p>
                             <p className="text-xs text-gray-400 mt-1">支持 JPG, PNG (Max 5MB)</p>
                          </>
                       )}
                   </div>
                </div>

                {/* Right: Form */}
                <div className="flex-1 space-y-6">
                   <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">项目名称 (Title)</label>
                      <input 
                        type="text" 
                        value={project.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="请输入项目名称，如《云中录》" 
                        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00CC4C] focus:border-transparent transition-all"
                      />
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div>
                         <label className="block text-sm font-bold text-gray-700 mb-2">类型 (Genre)</label>
                         <select 
                           value={project.genre}
                           onChange={(e) => handleInputChange('genre', e.target.value)}
                           className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00CC4C]"
                         >
                            <option>古装 (Ancient Costume)</option>
                            <option>悬疑 (Suspense)</option>
                            <option>都市 (Urban)</option>
                            <option>科幻 (Sci-Fi)</option>
                            <option>综艺 (Variety Show)</option>
                         </select>
                      </div>
                      <div>
                         <label className="block text-sm font-bold text-gray-700 mb-2">项目评级 (iQIYI Level)</label>
                         <select 
                           value={project.level}
                           onChange={(e) => handleInputChange('level', e.target.value)}
                           className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00CC4C]"
                         >
                            <option value="S+">S+ (超级头部)</option>
                            <option value="S">S (头部)</option>
                            <option value="A">A (腰部)</option>
                            <option value="B">B (常规)</option>
                         </select>
                      </div>
                   </div>

                   <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">故事梗概 (Logline)</label>
                      <textarea 
                        rows={4}
                        value={project.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="简述故事核心创意..." 
                        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00CC4C] resize-none"
                      />
                   </div>

                   <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                       <div className="flex items-center text-sm text-gray-500">
                          <Calendar size={16} className="mr-2" />
                          立项日期: {new Date(project.createdAt).toLocaleDateString()}
                       </div>
                       <div className="flex items-center text-sm text-gray-500">
                          <Briefcase size={16} className="mr-2" />
                          状态: <span className="ml-1 bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">{project.status}</span>
                       </div>
                   </div>
                </div>
             </div>
           ) : (
             <div className="animate-in fade-in slide-in-from-right-2 duration-300">
                {/* Add Member Bar */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-8 flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                       <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Invitation</label>
                       <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                          <input 
                            type="email" 
                            value={newMemberEmail}
                            onChange={(e) => setNewMemberEmail(e.target.value)}
                            placeholder="colleague@iqiyi.com" 
                            className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#00CC4C] focus:border-transparent"
                          />
                       </div>
                    </div>
                    <div className="w-full md:w-48">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Assign Role</label>
                        <select 
                           value={newMemberRole}
                           onChange={(e) => setNewMemberRole(e.target.value as Role)}
                           className="w-full py-2.5 px-3 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#00CC4C]"
                        >
                           {ROLES.map(role => <option key={role}>{role}</option>)}
                        </select>
                    </div>
                    <button 
                       onClick={handleAddMember}
                       className="w-full md:w-auto px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
                    >
                       <Plus size={18} className="mr-2" /> Invite
                    </button>
                </div>

                {/* Team List */}
                <div className="space-y-4">
                    <h3 className="font-bold text-gray-800 flex items-center">
                       <Users size={18} className="mr-2" /> Project Members ({project.team.length})
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {project.team.map((member) => (
                           <div key={member.id} className="flex items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
                               <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full border border-gray-200 object-cover" />
                               <div className="ml-4 flex-1">
                                  <div className="flex items-center justify-between">
                                     <h4 className="font-bold text-gray-900">{member.name}</h4>
                                     <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${member.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {member.status.toUpperCase()}
                                     </span>
                                  </div>
                                  <p className="text-xs text-gray-500 mt-0.5">{member.role} • {member.email}</p>
                               </div>
                               <button 
                                 onClick={() => handleRemoveMember(member.id)}
                                 className="ml-2 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                               >
                                  <Trash2 size={16} />
                               </button>
                           </div>
                        ))}
                    </div>
                </div>

                {/* Privacy Settings */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4">Privacy & Permissions</h3>
                    <div className="flex items-center space-x-6">
                        <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${!project.isPublic ? 'border-[#00CC4C] bg-green-50/20' : 'border-gray-200'}`}>
                            <input type="radio" name="privacy" checked={!project.isPublic} onChange={() => handleInputChange('isPublic', false)} className="hidden" />
                            <div className="bg-white p-2 rounded-full shadow-sm mr-3 text-gray-700"><Lock size={20} /></div>
                            <div>
                                <div className="font-bold text-sm text-gray-900">Internal Only</div>
                                <div className="text-xs text-gray-500">Only invited members can view</div>
                            </div>
                        </label>
                        <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${project.isPublic ? 'border-[#00CC4C] bg-green-50/20' : 'border-gray-200'}`}>
                            <input type="radio" name="privacy" checked={project.isPublic} onChange={() => handleInputChange('isPublic', true)} className="hidden" />
                            <div className="bg-white p-2 rounded-full shadow-sm mr-3 text-gray-700"><Globe size={20} /></div>
                            <div>
                                <div className="font-bold text-sm text-gray-900">Organization Public</div>
                                <div className="text-xs text-gray-500">Anyone in iQIYI can view</div>
                            </div>
                        </label>
                    </div>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default ProjectManager;