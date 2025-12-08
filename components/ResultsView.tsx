import React from 'react';
import { AnalysisResult, CompatibilityReport } from '../types';
import { 
  Heart, Briefcase, Zap, ShieldAlert, Star, 
  ArrowLeft, Leaf, BookOpen, User, Calendar, Share2, Printer, Music, CheckCircle2, XCircle,
  MessageCircle, Flame, Lock, Coins, Sparkles, AlertTriangle
} from 'lucide-react';

interface ResultsViewProps {
  data: AnalysisResult;
  onReset: () => void;
}

// Translations for static UI elements
const UI_LABELS = {
  en: {
    relationshipAnalysis: "Relationship Analysis",
    match: "Match",
    coupleWeeklyForecast: "Couple's Weekly Forecast",
    doTogether: "Do Together",
    avoidConflicts: "Avoid Conflicts",
    communication: "Communication",
    betterConnectionTips: "Better Connection Tips",
    pitfalls: "Pitfalls to Avoid",
    chemistryWealth: "Chemistry & Wealth",
    intimacyVibe: "Intimacy Vibe",
    financialLuck: "Financial Luck",
    auspiciousMilestones: "Auspicious Milestones",
    culturalVibe: "Cultural Insight",
    luckyFactors: "Lucky Factors",
    colors: "Colors",
    direction: "Direction",
    numbers: "Lucky Numbers",
    deity: "Deity / Mantra",
    cosmicSummary: "Cosmic Summary",
    spiritAnimal: "Spirit Animal",
    weeklyForecast: "Weekly Forecast",
    focusOn: "Focus On",
    avoidThisWeek: "Avoid This Week",
    lifeBalance: "Life Balance",
    luckyDays: "Lucky Days",
    personalityVibe: "Personality & Vibe",
    loveRelationships: "Love & Relationships",
    careerWealth: "Career & Wealth",
    vitalityHealth: "Vitality & Health",
    areasToAvoid: "Areas to Avoid",
    strengthBoosters: "Strength Boosters",
    practicalTips: "Practical Tips",
    share: "Share",
    print: "Print",
    newAnalysis: "New Analysis",
    career: "Career",
    love: "Love",
    health: "Health",
    family: "Family",
    spirituality: "Spirituality"
  },
  hi: {
    relationshipAnalysis: "सम्बंध विश्लेषण",
    match: "मिलान",
    coupleWeeklyForecast: "युगल साप्ताहिक राशिफल",
    doTogether: "एक साथ करें",
    avoidConflicts: "विवादों से बचें",
    communication: "संचार (Communication)",
    betterConnectionTips: "बेहतर संबंध सुझाव",
    pitfalls: "सावधानियां",
    chemistryWealth: "केमिस्ट्री और धन",
    intimacyVibe: "आत्मीयता",
    financialLuck: "आर्थिक भाग्य",
    auspiciousMilestones: "शुभ पड़ाव (Milestones)",
    culturalVibe: "सांस्कृतिक अंतर्दृष्टि",
    luckyFactors: "भाग्यशाली कारक",
    colors: "रंग",
    direction: "दिशा",
    numbers: "शुभ अंक",
    deity: "इष्ट देव / मंत्र",
    cosmicSummary: "ब्रह्मांडीय सारांश",
    spiritAnimal: "पावर एनिमल",
    weeklyForecast: "साप्ताहिक राशिफल",
    focusOn: "ध्यान दें",
    avoidThisWeek: "इस सप्ताह बचें",
    lifeBalance: "जीवन संतुलन",
    luckyDays: "शुभ दिन",
    personalityVibe: "व्यक्तित्व और वाइब",
    loveRelationships: "प्रेम और संबंध",
    careerWealth: "करियर और धन",
    vitalityHealth: "स्वास्थ्य और ऊर्जा",
    areasToAvoid: "बचने के क्षेत्र",
    strengthBoosters: "शक्ति बढ़ाने वाले उपाय",
    practicalTips: "व्यावहारिक सुझाव",
    share: "शेयर",
    print: "प्रिंट",
    newAnalysis: "नया विश्लेषण",
    career: "करियर",
    love: "प्रेम",
    health: "स्वास्थ्य",
    family: "परिवार",
    spirituality: "अध्यात्म"
  }
};

const InsightCard: React.FC<{
  title: string;
  items: string[];
  icon: React.ReactNode;
  colorClass: string;
}> = ({ title, items, icon, colorClass }) => (
  <div className="glass-card p-6 rounded-2xl h-full hover:shadow-lg transition-shadow duration-300 border-t-2 border-orange-50 dark:bg-slate-800/60 dark:border-slate-700">
    <div className={`flex items-center gap-3 mb-4 ${colorClass}`}>
      <div className="p-2 bg-white/80 dark:bg-slate-700 rounded-lg shadow-sm ring-1 ring-orange-50 dark:ring-slate-600">
        {icon}
      </div>
      <h3 className="font-bold text-lg dark:text-slate-200">{title}</h3>
    </div>
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed flex items-start gap-2">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-300 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ProgressBar: React.FC<{ label: string; score: number; color: string }> = ({ label, score, color }) => (
    <div className="mb-3">
        <div className="flex justify-between text-xs font-semibold uppercase tracking-wider mb-1 text-slate-500 dark:text-slate-400">
            <span>{label}</span>
            <span>{score}%</span>
        </div>
        <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`} 
                style={{ width: `${score}%` }} 
            />
        </div>
    </div>
);

const CompatibilityDashboard: React.FC<{ data: AnalysisResult, report: CompatibilityReport, labels: any }> = ({ data, report, labels }) => {
    return (
        <div className="space-y-8">
            {/* Love Hero */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-3xl p-8 relative overflow-hidden shadow-xl">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                 <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex-1 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-medium mb-4 backdrop-blur-sm">
                            <Sparkles className="w-3 h-3" /> {labels.relationshipAnalysis}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-2 font-poppins">{report.loveLevel}</h2>
                        <p className="text-pink-100 text-lg leading-relaxed max-w-xl">{report.relationshipDynamic}</p>
                        
                        <div className="flex flex-wrap gap-2 mt-6 justify-center md:justify-start">
                             <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wide border border-white/30">
                                {report.elementalVibe}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wide border border-white/30">
                                {data.animalPersona.animal} {data.animalPersona.emoji}
                            </span>
                        </div>
                    </div>
                    
                    {/* Score Circle */}
                    <div className="relative w-40 h-40 flex-shrink-0">
                         <svg className="w-full h-full transform -rotate-90">
                            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-pink-800/30" />
                            <circle cx="80" cy="80" r="70" stroke="white" strokeWidth="12" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * report.overallScore) / 100} strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold">{report.overallScore}%</span>
                            <span className="text-xs text-pink-100 uppercase tracking-widest">{labels.match}</span>
                        </div>
                    </div>
                 </div>
            </div>

            {/* Weekly Forecast for Couple */}
            <div className="glass-card rounded-2xl p-6 border-l-4 border-l-indigo-500 dark:bg-slate-800/60 dark:border-slate-700">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-indigo-500" />
                        <span>{labels.coupleWeeklyForecast}</span>
                    </h3>
                    <span className="text-xs font-semibold bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-3 py-1 rounded-full">
                        {data.weeklyForecast.title}
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                         <p className="text-xs font-bold text-emerald-600 mb-2 uppercase flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {labels.doTogether}</p>
                         <ul className="space-y-1">
                            {data.weeklyForecast.dos.map((d, i) => <li key={i} className="text-sm text-slate-600 dark:text-slate-300">• {d}</li>)}
                         </ul>
                    </div>
                     <div>
                         <p className="text-xs font-bold text-rose-600 mb-2 uppercase flex items-center gap-1"><XCircle className="w-3 h-3" /> {labels.avoidConflicts}</p>
                         <ul className="space-y-1">
                            {data.weeklyForecast.avoids.map((d, i) => <li key={i} className="text-sm text-slate-600 dark:text-slate-300">• {d}</li>)}
                         </ul>
                    </div>
                </div>
            </div>

            {/* Detailed Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Communication */}
                <div className="glass-card p-6 rounded-2xl dark:bg-slate-800/60 border border-blue-50 dark:border-slate-700">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-blue-500" /> {labels.communication}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 italic">"{report.communicationStyle}"</p>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">{labels.betterConnectionTips}</h4>
                    <ul className="space-y-2">
                        {report.communicationTips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Challenges */}
                <div className="glass-card p-6 rounded-2xl dark:bg-slate-800/60 border border-red-50 dark:border-slate-700">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-500" /> {labels.pitfalls}
                    </h3>
                    <ul className="space-y-3 mt-4">
                         {report.challengesToAvoid.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300 bg-red-50 dark:bg-red-900/10 p-2 rounded-lg">
                                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>

                 {/* Intimacy & Finance */}
                 <div className="glass-card p-6 rounded-2xl dark:bg-slate-800/60 border border-purple-50 dark:border-slate-700">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                        <Flame className="w-5 h-5 text-purple-500" /> {labels.chemistryWealth}
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <p className="text-xs font-bold text-purple-600 dark:text-purple-300 uppercase tracking-wide mb-1">{labels.intimacyVibe}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-300">{report.sexualChemistry}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-300 uppercase tracking-wide mb-1 flex items-center gap-1">
                                <Coins className="w-3 h-3" /> {labels.financialLuck}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-300">{report.financialCompatibility}</p>
                        </div>
                    </div>
                </div>

                {/* Milestones Timeline */}
                <div className="glass-card p-6 rounded-2xl dark:bg-slate-800/60 border border-amber-50 dark:border-slate-700">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                        <Lock className="w-5 h-5 text-amber-500" /> {labels.auspiciousMilestones}
                    </h3>
                    <div className="space-y-4 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-600">
                         {report.auspiciousMilestones.map((m, i) => (
                            <div key={i} className="pl-6 relative">
                                <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-amber-100 border-2 border-amber-500"></div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">{m.event}</h4>
                                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 block mb-1">{m.period}</span>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{m.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Festival & Lucky Elements Footer */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row gap-6 items-center text-center md:text-left">
                <div className="flex-1">
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1 flex items-center justify-center md:justify-start gap-2">
                        <Music className="w-4 h-4 text-indigo-500" /> {labels.culturalVibe}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 italic">"{data.festivalInsights}"</p>
                </div>
                <div className="flex-1 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-600 pt-4 md:pt-0 md:pl-6">
                     <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1 flex items-center justify-center md:justify-start gap-2">
                        <Star className="w-4 h-4 text-orange-500" /> {labels.luckyFactors}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                        {labels.colors}: {data.luckyElements.colors} • {labels.direction}: {data.luckyElements.direction}
                    </p>
                </div>
            </div>
        </div>
    );
};

export const ResultsView: React.FC<ResultsViewProps> = ({ data, onReset }) => {
  
  const lang = data.language || 'en';
  const labels = UI_LABELS[lang];

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const text = data.compatibilityReport 
        ? `Jyotish.AI Couple's Report ❤️\n\n${data.compatibilityReport.loveLevel} (${data.compatibilityReport.overallScore}%)\n${data.compatibilityReport.relationshipDynamic}`
        : `Jyotish.AI Insights 🔮\n\nSummary: ${data.basicSummary}\nForecast: ${data.weeklyForecast.title}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-fade-in-up print:text-black">
      
      {/* Navigation & Tools */}
      <div className="flex justify-between items-center mb-6 print:hidden">
        <button 
          onClick={onReset}
          className="flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-orange-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> {labels.newAnalysis}
        </button>
        <div className="flex gap-2">
            <button onClick={handleShare} className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:text-green-600 transition-colors text-slate-500" title={labels.share}>
                <Share2 className="w-5 h-5" />
            </button>
            <button onClick={handlePrint} className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:text-blue-600 transition-colors text-slate-500" title={labels.print}>
                <Printer className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* Conditional Rendering: Compatibility vs Individual */}
      {data.compatibilityReport ? (
          <CompatibilityDashboard data={data} report={data.compatibilityReport} labels={labels} />
      ) : (
          /* INDIVIDUAL DASHBOARD */
          <>
            {/* Header / Summary Section */}
            <div className="glass-card p-8 rounded-3xl mb-8 relative overflow-hidden border border-orange-100 dark:bg-slate-800 dark:border-slate-700">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-200/40 to-rose-200/40 dark:from-orange-900/20 dark:to-rose-900/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                
                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200 text-xs font-bold uppercase tracking-wide border border-orange-200 dark:border-orange-800">
                            Root {data.rootNumber}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-200 text-xs font-bold uppercase tracking-wide border border-rose-200 dark:border-rose-800">
                            {data.moonSign}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 text-xs font-bold uppercase tracking-wide border border-amber-200 dark:border-amber-800">
                            {data.nakshatra}
                        </span>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4 font-poppins">{labels.cosmicSummary}</h2>
                    <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed border-l-4 border-orange-400 pl-4 bg-orange-50/50 dark:bg-orange-900/20 py-2 rounded-r-lg">
                    {data.basicSummary}
                    </p>
                </div>

                {/* Animal Persona Card */}
                <div className="w-full md:w-auto flex-shrink-0">
                    <div className="bg-white/50 dark:bg-slate-700/50 rounded-2xl p-4 border border-orange-100 dark:border-slate-600 shadow-sm backdrop-blur-sm flex md:flex-col items-center gap-4 md:gap-2 min-w-[160px]">
                        <div className="text-5xl drop-shadow-sm">{data.animalPersona.emoji}</div>
                        <div className="flex-1 md:text-center">
                            <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-0.5">{labels.spiritAnimal}</p>
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-tight">{data.animalPersona.animal}</h3>
                            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 md:line-clamp-none max-w-[200px] md:max-w-[140px]">
                                {data.animalPersona.description}
                            </p>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            {/* Weekly Forecast Section */}
            <div className="mb-8 glass-card rounded-2xl p-6 dark:bg-slate-800/60 dark:border-slate-700 border-2 border-indigo-50/50">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-indigo-500" />
                        <span>{labels.weeklyForecast}</span>
                    </h3>
                    <span className="text-xs font-semibold bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-3 py-1 rounded-full">
                        {data.weeklyForecast.title}
                    </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Do's */}
                    <div className="bg-emerald-50/50 dark:bg-emerald-900/10 rounded-xl p-4 border border-emerald-100 dark:border-emerald-800/30">
                        <h4 className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-400 mb-3 text-sm uppercase tracking-wide">
                            <CheckCircle2 className="w-4 h-4" /> {labels.focusOn}
                        </h4>
                        <ul className="space-y-2.5">
                            {data.weeklyForecast.dos.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-emerald-100/80">
                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Avoids */}
                    <div className="bg-rose-50/50 dark:bg-rose-900/10 rounded-xl p-4 border border-rose-100 dark:border-rose-800/30">
                        <h4 className="flex items-center gap-2 font-bold text-rose-800 dark:text-rose-400 mb-3 text-sm uppercase tracking-wide">
                            <XCircle className="w-4 h-4" /> {labels.avoidThisWeek}
                        </h4>
                        <ul className="space-y-2.5">
                            {data.weeklyForecast.avoids.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-rose-100/80">
                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Life Balance Meter */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="md:col-span-1 glass-card p-6 rounded-2xl dark:bg-slate-800/60 dark:border-slate-700">
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-500" /> {labels.lifeBalance}
                    </h3>
                    <ProgressBar label={labels.career} score={data.lifeBalanceScores.career} color="bg-blue-500" />
                    <ProgressBar label={labels.love} score={data.lifeBalanceScores.love} color="bg-rose-500" />
                    <ProgressBar label={labels.health} score={data.lifeBalanceScores.health} color="bg-green-500" />
                    <ProgressBar label={labels.spirituality} score={data.lifeBalanceScores.spirituality} color="bg-purple-500" />
                </div>

                {/* Lucky Days Widget */}
                <div className="md:col-span-1 glass-card p-6 rounded-2xl dark:bg-slate-800/60 dark:border-slate-700 bg-orange-50/50 border-orange-100">
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                        <Star className="w-5 h-5 text-orange-500" /> {labels.luckyDays}
                    </h3>
                    <div className="space-y-2">
                        {data.luckyDays.map((day, i) => (
                            <div key={i} className="flex items-center justify-between p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{day}</span>
                                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Festival Context */}
                <div className="md:col-span-1 glass-card p-6 rounded-2xl dark:bg-slate-800/60 dark:border-slate-700 bg-indigo-50/50 border-indigo-100">
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                        <Music className="w-5 h-5 text-indigo-500" /> {labels.culturalVibe}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                        "{data.festivalInsights}"
                    </p>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <InsightCard 
                title={labels.personalityVibe}
                icon={<User className="w-5 h-5" />}
                items={data.personality}
                colorClass="text-orange-600 dark:text-orange-400"
                />
                <InsightCard 
                title={labels.loveRelationships}
                icon={<Heart className="w-5 h-5" />}
                items={data.loveMarriage}
                colorClass="text-rose-600 dark:text-rose-400"
                />
                <InsightCard 
                title={labels.careerWealth}
                icon={<Briefcase className="w-5 h-5" />}
                items={data.careerMoney}
                colorClass="text-emerald-700 dark:text-emerald-400"
                />
                <InsightCard 
                title={labels.vitalityHealth}
                icon={<Leaf className="w-5 h-5" />}
                items={data.health}
                colorClass="text-teal-700 dark:text-teal-400"
                />
            </div>

            {/* Actionable Advice Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="md:col-span-1 glass-card p-6 rounded-2xl border-l-4 border-l-red-500 bg-red-50/30 dark:bg-red-900/10">
                <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-bold mb-4">
                    <ShieldAlert className="w-5 h-5" /> <h3>{labels.areasToAvoid}</h3>
                </div>
                <ul className="space-y-3">
                    {data.areasToAvoid.map((item, i) => (
                        <li key={i} className="text-sm text-slate-700 dark:text-slate-300">{item}</li>
                    ))}
                </ul>
                </div>
                <div className="md:col-span-1 glass-card p-6 rounded-2xl border-l-4 border-l-orange-500 bg-orange-50/30 dark:bg-orange-900/10">
                <div className="flex items-center gap-2 text-orange-700 dark:text-orange-400 font-bold mb-4">
                    <Zap className="w-5 h-5" /> <h3>{labels.strengthBoosters}</h3>
                </div>
                <ul className="space-y-3">
                    {data.strengthBoosters.map((item, i) => (
                        <li key={i} className="text-sm text-slate-700 dark:text-slate-300">{item}</li>
                    ))}
                </ul>
                </div>
                <div className="md:col-span-1 glass-card p-6 rounded-2xl border-l-4 border-l-amber-500 bg-amber-50/30 dark:bg-amber-900/10">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold mb-4">
                    <BookOpen className="w-5 h-5" /> <h3>{labels.practicalTips}</h3>
                </div>
                <ul className="space-y-3">
                    {data.practicalTips.map((item, i) => (
                        <li key={i} className="text-sm text-slate-700 dark:text-slate-300">{item}</li>
                    ))}
                </ul>
                </div>
            </div>

            {/* Lucky Elements Footer */}
            <div className="bg-gradient-to-r from-orange-950 to-rose-950 text-white p-8 rounded-3xl shadow-xl border-t border-orange-800 break-inside-avoid">
                <div className="flex items-center gap-3 mb-6">
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    <h3 className="text-xl font-bold">{labels.luckyElements}</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                        <p className="text-xs text-orange-200/70 uppercase tracking-wider mb-1">{labels.colors}</p>
                        <p className="font-medium text-orange-50">{data.luckyElements.colors}</p>
                    </div>
                    <div>
                        <p className="text-xs text-orange-200/70 uppercase tracking-wider mb-1">{labels.numbers}</p>
                        <p className="font-medium text-orange-50">{data.luckyElements.numbers}</p>
                    </div>
                    <div>
                        <p className="text-xs text-orange-200/70 uppercase tracking-wider mb-1">{labels.direction}</p>
                        <p className="font-medium text-orange-50">{data.luckyElements.direction}</p>
                    </div>
                    <div>
                        <p className="text-xs text-orange-200/70 uppercase tracking-wider mb-1">{labels.deity}</p>
                        <p className="font-medium text-orange-50">{data.luckyElements.deityOrMantra}</p>
                    </div>
                </div>
            </div>
          </>
      )}
      
      <div className="text-center mt-12 text-slate-400 text-xs">
        <p>AI-generated insights based on Vedic principles. For entertainment & self-reflection only.</p>
        <p className="mt-1">Jyotish.AI v1.2</p>
      </div>
    </div>
  );
};