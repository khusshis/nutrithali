import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LoginModal from './components/LoginModal';
import IngredientSearch from './features/ingredients/IngredientSearch';
import { Flame, Dumbbell, Wheat, Droplet, Sparkles, BookOpen } from 'lucide-react';

function App() {
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-amber-50/10 text-gray-900 flex flex-col font-sans">
      {/* Navigation Bar */}
      <Navbar onLoginClick={() => setIsLoginOpen(true)} />

      {/* Main Container */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero Banner Redesign */}
        <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-500 to-amber-500 rounded-3xl text-white p-8 md:p-12 shadow-xl shadow-red-600/10 mb-12">
          {/* Background decorative blobs */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-amber-400/20 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-amber-100 uppercase tracking-widest mb-4">
              <Sparkles className="h-3 w-3 text-amber-300" /> Powered by Nutrition Science
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
              Analyze the Nutritional Value of Your Indian Meals
            </h1>
            <p className="text-white/90 text-sm md:text-base font-medium max-w-xl">
              Indian meals are rich in diversity, spices, and complex carbs. Search from our regional ingredients library to get detailed insights into calories, macros, and nutrients.
            </p>
          </div>
        </div>

        {/* Search & Results Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Search Widget */}
          <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-amber-100 shadow-sm shadow-amber-500/5">
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-black text-gray-800 flex items-center gap-2">
                Search Ingredients
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Enter ingredients like Roti, Paneer, or Dal to analyze per 100g.
              </p>
            </div>
            
            <IngredientSearch onSelect={(ing) => setSelectedIngredient(ing)} />

            {!selectedIngredient && (
              <div className="mt-8 p-6 border-2 border-dashed border-amber-200/60 rounded-2xl bg-amber-50/20 text-center">
                <BookOpen className="h-8 w-8 text-amber-500/80 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-gray-700">No Ingredient Selected</h4>
                <p className="text-xs text-gray-500 mt-1">Search and click on an ingredient above to view macros.</p>
              </div>
            )}
          </div>

          {/* Right Column: Dynamic Results Display */}
          <div className="lg:col-span-7">
            {selectedIngredient ? (
              <div className="bg-gradient-to-br from-red-50/30 to-amber-50/30 border border-amber-100/70 rounded-3xl p-6 md:p-8 shadow-sm shadow-red-500/5 animate-scaleIn">
                {/* Header Information */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-amber-100/60 mb-6">
                  <div>
                    <span className="inline-block bg-amber-100/80 text-amber-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider mb-2">
                      {selectedIngredient.category}
                    </span>
                    <h3 className="text-3xl font-black text-gray-800 tracking-tight">{selectedIngredient.name}</h3>
                  </div>
                  <div>
                    <span className="inline-flex items-center bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded-xl uppercase tracking-wider shadow-sm">
                      Per 100g
                    </span>
                  </div>
                </div>

                {/* Macro Nutrient Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Calories */}
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-amber-100/50 hover:shadow-md transition-all hover:scale-[1.02] duration-300">
                    <div className="p-2 bg-red-50 rounded-xl w-fit text-red-600 mb-3">
                      <Flame className="h-5 w-5 fill-red-100" />
                    </div>
                    <div className="text-2xl font-black text-gray-900">{selectedIngredient.calories_per_100g}</div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mt-1">Calories</div>
                  </div>

                  {/* Protein */}
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-amber-100/50 hover:shadow-md transition-all hover:scale-[1.02] duration-300">
                    <div className="p-2 bg-amber-50 rounded-xl w-fit text-amber-600 mb-3">
                      <Dumbbell className="h-5 w-5" />
                    </div>
                    <div className="text-2xl font-black text-gray-900">
                      {selectedIngredient.protein_per_100g}
                      <span className="text-sm font-semibold text-gray-400 ml-0.5">g</span>
                    </div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mt-1">Protein</div>
                  </div>

                  {/* Carbs */}
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-amber-100/50 hover:shadow-md transition-all hover:scale-[1.02] duration-300">
                    <div className="p-2 bg-orange-50 rounded-xl w-fit text-orange-600 mb-3">
                      <Wheat className="h-5 w-5" />
                    </div>
                    <div className="text-2xl font-black text-gray-900">
                      {selectedIngredient.carbs_per_100g}
                      <span className="text-sm font-semibold text-gray-400 ml-0.5">g</span>
                    </div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mt-1">Carbs</div>
                  </div>

                  {/* Fat */}
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-amber-100/50 hover:shadow-md transition-all hover:scale-[1.02] duration-300">
                    <div className="p-2 bg-yellow-50 rounded-xl w-fit text-yellow-600 mb-3">
                      <Droplet className="h-5 w-5" />
                    </div>
                    <div className="text-2xl font-black text-gray-900">
                      {selectedIngredient.fat_per_100g}
                      <span className="text-sm font-semibold text-gray-400 ml-0.5">g</span>
                    </div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mt-1">Fat</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center bg-white rounded-3xl border border-dashed border-amber-200/80 p-8 text-center text-gray-400 shadow-inner">
                <div className="p-4 bg-amber-50 rounded-full text-amber-500 mb-4 animate-bounce">
                  <Flame className="h-10 w-10" />
                </div>
                <h3 className="text-lg font-bold text-gray-700">Explore Macro Information</h3>
                <p className="text-sm text-gray-500 max-w-sm mt-1">
                  Search and select any ingredient on the left to see its macro nutrient breakdown.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Login Dialog/Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      {/* Modern Red/Yellow Footer */}
      <footer className="bg-gray-900 text-gray-400 border-t border-amber-900/10 mt-12 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} NutriThali. Tracking nutritional values for healthier meals.</p>
          <div className="flex justify-center gap-4 mt-3 text-xs">
            <a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-amber-500 transition-colors">Terms of Service</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-amber-500 transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
