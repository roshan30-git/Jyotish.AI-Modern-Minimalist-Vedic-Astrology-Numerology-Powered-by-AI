
import React, { useState } from 'react';
import { UserInputs } from '../types';
import { 
  Sparkles, Compass, Users, UserCircle, Globe, Languages, ImageIcon, Key 
} from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: UserInputs) => void;
  isLoading: boolean;
}

const LIFESTYLE_ARCHETYPES = [
  { label: "Focused/Analytical 🧠", value: "Focused/Analytical" },
  { label: "Creative/Expressive 🎨", value: "Creative/Expressive" },
  { label: "Practical/Business 💼", value: "Practical/Business" },
  { label: "Emotional/Family-Centric 🏡", value: "Emotional/Family-Centric" },
  { label: "Adventurous/Free 🏔️", value: "Adventurous/Free" },
  { label: "Leader/Authority-Driven 🦁", value: "Leader/Authority-Driven" },
  { label: "Supportive/Service-Oriented 🤝", value: "Supportive/Service-Oriented" },
  { label: "Spiritual/Inner-Seeking 🧘", value: "Spiritual/Inner-Seeking" },
  { label: "Social/Network-Oriented 🗣️", value: "Social/Network-Oriented" },
  { label: "Ambitious/Goal-Chasing 🚀", value: "Ambitious/Goal-Chasing" },
  { label: "Balanced/Stable-Routine ⚖️", value: "Balanced/Stable-Routine" },
  { label: "Innovator/Experimenting 💡", value: "Innovator/Experimenting" },
  { label: "Protective/Power-Focused 🛡️", value: "Protective/Power-Focused" },
  { label: "Logical/Tech-Driven 💻", value: "Logical/Tech-Driven" },
  { label: "Luxury/Comfort-Seeking 💎", value: "Luxury/Comfort-Seeking" }
];

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserInputs>({
    apiKey: '',
    mode: 'individual',
    chartStyle: 'north',
    language: 'en',
    dob: '',
    gender: 'male',
    timeOfBirth: '',
    placeOfBirth: '',
    primaryLifestyle: '',
    secondaryLifestyle: '',
    partnerDob: '',
    partnerGender: 'female',
    partnerTimeOfBirth: '',
    partnerPlaceOfBirth: '',
    includeImage: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => {
        const newVal = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        const updated = { ...prev, [name]: newVal };
        return updated;
    });
  };

  const handleModeChange = (mode: 'individual' | 'compatibility') => {
    setFormData(prev => ({ ...prev, mode }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-8 glass-card rounded-3xl shadow-xl animate-fade-in-up border-t-4 border-orange-500 relative transition-colors duration-300 dark:bg-slate-800/80 dark:border-orange-600">
      
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-tr from-orange-500 to-rose-500 rounded-full mx-auto flex items-center justify-center shadow-lg mb-4 ring-4 ring-orange-100 dark:ring-orange-900">
          <Sparkles className="text-white w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-700 to-rose-600 dark:from-orange-400 dark:to-rose-400">
          Jyotish.AI
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm font-medium">Discover your cosmic blueprint</p>
      </div>

      {/* Mode Tabs */}
      <div className="flex p-1 bg-orange-50 dark:bg-slate-700 rounded-xl mb-6">
        <button
          type="button"
          onClick={() => handleModeChange('individual')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
            formData.mode === 'individual' 
              ? 'bg-white dark:bg-slate-600 text-orange-600 dark:text-orange-300 shadow-sm' 
              : 'text-slate-500 dark:text-slate-400 hover:text-orange-500'
          }`}
        >
          <UserCircle className="w-4 h-4" /> Individual
        </button>
        <button
          type="button"
          onClick={() => handleModeChange('compatibility')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
            formData.mode === 'compatibility' 
              ? 'bg-white dark:bg-slate-600 text-rose-600 dark:text-rose-300 shadow-sm' 
              : 'text-slate-500 dark:text-slate-400 hover:text-rose-500'
          }`}
        >
          <Users className="w-4 h-4" /> Match Check
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Primary Person Details */}
        <div className="bg-orange-50/50 dark:bg-slate-700/30 p-4 rounded-xl space-y-4">
            <h3 className="text-xs font-bold text-orange-600 dark:text-orange-300 uppercase tracking-wide mb-2 flex items-center gap-2">
               {formData.mode === 'compatibility' ? '1. Your Details' : 'Personal Details'}
            </h3>
            
            {/* DOB & Gender Row */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">DOB *</label>
                <input
                    type="date"
                    name="dob"
                    required
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-orange-100 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-200 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                />
                </div>
                <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Gender *</label>
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-orange-100 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-200 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                </div>
            </div>

            {/* Time & Place Row */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Time (Opt)</label>
                    <input
                    type="time"
                    name="timeOfBirth"
                    value={formData.timeOfBirth}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-orange-100 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-200 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Place (Opt)</label>
                    <input
                    type="text"
                    name="placeOfBirth"
                    placeholder="City"
                    value={formData.placeOfBirth}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-orange-100 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-200 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                    />
                </div>
            </div>
        </div>

        {/* Partner Details (Only in Compatibility Mode) */}
        {formData.mode === 'compatibility' && (
             <div className="bg-rose-50/50 dark:bg-slate-700/30 p-4 rounded-xl space-y-4 animate-fade-in-up">
                <h3 className="text-xs font-bold text-rose-600 dark:text-rose-300 uppercase tracking-wide mb-2 flex items-center gap-2">
                   2. Partner's Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Partner DOB *</label>
                    <input
                        type="date"
                        name="partnerDob"
                        required={formData.mode === 'compatibility'}
                        value={formData.partnerDob}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-rose-100 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-200 text-sm focus:ring-2 focus:ring-rose-400 outline-none"
                    />
                    </div>
                    <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Gender *</label>
                    <select
                        name="partnerGender"
                        value={formData.partnerGender}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-rose-100 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-200 text-sm focus:ring-2 focus:ring-rose-400 outline-none"
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    </div>
                </div>

                {/* Partner Time & Place Row */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Time (Opt)</label>
                        <input
                        type="time"
                        name="partnerTimeOfBirth"
                        value={formData.partnerTimeOfBirth}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-rose-100 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-200 text-sm focus:ring-2 focus:ring-rose-400 outline-none"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Place (Opt)</label>
                        <input
                        type="text"
                        name="partnerPlaceOfBirth"
                        placeholder="City"
                        value={formData.partnerPlaceOfBirth}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-rose-100 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-200 text-sm focus:ring-2 focus:ring-rose-400 outline-none"
                        />
                    </div>
                </div>
             </div>
        )}

        {/* Lifestyle Dropdowns */}
        <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1 flex items-center gap-1">
              <Compass className="w-3 h-3 text-orange-400" /> Lifestyle Archetypes <span className="text-slate-400 dark:text-slate-500 font-normal normal-case">(Optional)</span>
            </label>
            
            <div className="grid grid-cols-1 gap-3">
                <select 
                    name="primaryLifestyle" 
                    value={formData.primaryLifestyle} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/60 dark:bg-slate-900/60 border border-orange-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none transition-all text-slate-700 dark:text-slate-200 appearance-none text-sm"
                >
                    <option value="">Select Primary Trait (Optional)</option>
                    {LIFESTYLE_ARCHETYPES.map(type => (
                        <option key={`p-${type.value}`} value={type.value}>{type.label}</option>
                    ))}
                </select>

                <select 
                    name="secondaryLifestyle" 
                    value={formData.secondaryLifestyle} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/60 dark:bg-slate-900/60 border border-orange-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none transition-all text-slate-700 dark:text-slate-200 appearance-none text-sm"
                >
                    <option value="">Select Secondary Trait (Optional)</option>
                    {LIFESTYLE_ARCHETYPES.map(type => (
                        <option key={`s-${type.value}`} value={type.value}>{type.label}</option>
                    ))}
                </select>
            </div>
        </div>

        {/* Image Generation Option */}
        <div className="bg-purple-50/50 dark:bg-slate-700/50 p-3 rounded-xl border border-purple-100 dark:border-slate-600 transition-all">
             <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                    <div className="relative">
                        <input 
                            type="checkbox" 
                            name="includeImage" 
                            checked={formData.includeImage || false} 
                            onChange={handleChange}
                            className="sr-only peer" 
                        />
                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-500"></div>
                    </div>
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                        <ImageIcon className="w-4 h-4 text-purple-500" /> Generate Cosmic Art
                    </span>
                </label>
             </div>
        </div>

        {/* Preferences: Chart Style & Language */}
        <div className="flex flex-col md:flex-row gap-4 pt-2">
            {/* Chart Style */}
            <div className="flex-1 flex items-center justify-between bg-orange-50/50 dark:bg-slate-700/50 p-2 rounded-lg border border-orange-100 dark:border-slate-600">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 ml-1">
                    <Globe className="w-3 h-3" /> Chart
                </span>
                <div className="flex bg-white dark:bg-slate-800 rounded-md p-0.5 shadow-sm">
                    <button
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, chartStyle: 'north' }))}
                        className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                            formData.chartStyle === 'north' ? 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300' : 'text-slate-400 hover:text-orange-500'
                        }`}
                    >
                        North
                    </button>
                    <button
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, chartStyle: 'south' }))}
                        className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                            formData.chartStyle === 'south' ? 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300' : 'text-slate-400 hover:text-orange-500'
                        }`}
                    >
                        South
                    </button>
                </div>
            </div>

            {/* Language Selection */}
            <div className="flex-1 flex items-center justify-between bg-orange-50/50 dark:bg-slate-700/50 p-2 rounded-lg border border-orange-100 dark:border-slate-600">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 ml-1">
                    <Languages className="w-3 h-3" /> Language
                </span>
                <div className="flex bg-white dark:bg-slate-800 rounded-md p-0.5 shadow-sm">
                    <button
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, language: 'en' }))}
                        className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                            formData.language === 'en' ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' : 'text-slate-400 hover:text-indigo-500'
                        }`}
                    >
                        🇺🇸 EN
                    </button>
                    <button
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, language: 'hi' }))}
                        className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                            formData.language === 'hi' ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' : 'text-slate-400 hover:text-indigo-500'
                        }`}
                    >
                        🇮🇳 HI
                    </button>
                </div>
            </div>
        </div>

        {/* Optional API Key */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
             <div className="flex items-center gap-2 mb-2">
                <Key className="w-4 h-4 text-slate-400" />
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Custom API Key <span className="text-slate-300 dark:text-slate-600 normal-case font-normal">(Optional)</span>
                </label>
             </div>
             <input
                type="password"
                name="apiKey"
                value={formData.apiKey || ''}
                onChange={handleChange}
                placeholder="Paste your Gemini API Key here (starts with AIza...)"
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-200 text-xs focus:ring-2 focus:ring-orange-400 outline-none placeholder:text-slate-400"
            />
             <p className="text-[10px] text-slate-400 mt-1">
                Leave empty to use the default system key.
             </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 mt-2 bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white font-semibold rounded-xl shadow-lg shadow-orange-200 dark:shadow-none transform hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>Analyzing Stars...</>
          ) : (
            <>Reveal Insights <Sparkles className="w-4 h-4" /></>
          )}
        </button>
      </form>
    </div>
  );
};
