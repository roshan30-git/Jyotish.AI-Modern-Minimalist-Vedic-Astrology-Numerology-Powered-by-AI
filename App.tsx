
import React, { useState, useEffect } from 'react';
import { AppState, UserInputs, AnalysisResult } from './types';
import { InputForm } from './components/InputForm';
import { LoadingView } from './components/LoadingView';
import { ResultsView } from './components/ResultsView';
import { generateAstrologyInsights } from './services/geminiService';
import { AlertCircle, Moon, Sun } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INPUT);
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Check for theme
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleAnalysis = async (inputs: UserInputs) => {
    setAppState(AppState.LOADING);
    setErrorMsg('');
    
    try {
      const result = await generateAstrologyInsights(inputs);
      setAnalysisData(result);
      setAppState(AppState.RESULTS);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Something went wrong. Please check your API key or try again.");
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setAnalysisData(null);
    setAppState(AppState.INPUT);
    setErrorMsg('');
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`min-h-screen w-full px-4 py-8 md:py-12 relative overflow-x-hidden transition-colors duration-500 ${isDarkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50'}`}>
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30 text-slate-600 dark:text-amber-300 transition-all z-50"
        >
          {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>

        {/* Background Decorative Blobs */}
        <div className="fixed -top-40 -left-40 w-96 h-96 bg-orange-200 dark:bg-orange-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 animate-blob"></div>
        <div className="fixed -top-40 -right-40 w-96 h-96 bg-rose-200 dark:bg-rose-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="fixed -bottom-40 left-20 w-96 h-96 bg-amber-200 dark:bg-amber-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

        <div className="relative z-10 container mx-auto">
            {appState === AppState.INPUT && (
                <div className="flex flex-col items-center justify-center min-h-[80vh]">
                    <InputForm onSubmit={handleAnalysis} isLoading={false} />
                </div>
            )}

            {appState === AppState.LOADING && (
                <div className="flex flex-col items-center justify-center min-h-[80vh]">
                   <LoadingView />
                </div>
            )}

            {appState === AppState.RESULTS && analysisData && (
                <ResultsView data={analysisData} onReset={handleReset} />
            )}

            {appState === AppState.ERROR && (
                <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in-up">
                    <div className="p-8 glass-card rounded-2xl max-w-md text-center border border-red-100 dark:bg-slate-800 dark:border-slate-700">
                        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Cosmic Interruption</h3>
                        <p className="text-slate-600 dark:text-slate-300 mb-6">{errorMsg}</p>
                        <button 
                            onClick={handleReset}
                            className="px-6 py-2 bg-slate-800 dark:bg-orange-600 text-white rounded-lg hover:bg-slate-700 dark:hover:bg-orange-500 transition-colors font-medium"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default App;
