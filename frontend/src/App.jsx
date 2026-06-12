import React, { useState } from 'react';
import IngredientSearch from './features/ingredients/IngredientSearch';

function App() {
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">NutriThali</h1>
        <p className="text-gray-500 mb-8">Analyze the nutritional value of your Indian meals.</p>
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Search Ingredients</h2>
          <IngredientSearch onSelect={(ing) => setSelectedIngredient(ing)} />
          
          {selectedIngredient && (
            <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl shadow-inner transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-blue-900">{selectedIngredient.name}</h3>
                  <p className="text-sm font-medium text-blue-600 mt-1 uppercase tracking-wider">{selectedIngredient.category}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">
                    per 100g
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 mt-6 text-sm">
                <div className="bg-white p-3 rounded-lg text-center shadow-sm border border-blue-50">
                  <div className="text-2xl font-bold text-gray-900">{selectedIngredient.calories_per_100g}</div>
                  <div className="text-xs text-gray-500 uppercase font-semibold mt-1">Calories</div>
                </div>
                <div className="bg-white p-3 rounded-lg text-center shadow-sm border border-blue-50">
                  <div className="text-xl font-bold text-gray-900">{selectedIngredient.protein_per_100g}<span className="text-sm font-normal text-gray-500">g</span></div>
                  <div className="text-xs text-gray-500 uppercase font-semibold mt-1">Protein</div>
                </div>
                <div className="bg-white p-3 rounded-lg text-center shadow-sm border border-blue-50">
                  <div className="text-xl font-bold text-gray-900">{selectedIngredient.carbs_per_100g}<span className="text-sm font-normal text-gray-500">g</span></div>
                  <div className="text-xs text-gray-500 uppercase font-semibold mt-1">Carbs</div>
                </div>
                <div className="bg-white p-3 rounded-lg text-center shadow-sm border border-blue-50">
                  <div className="text-xl font-bold text-gray-900">{selectedIngredient.fat_per_100g}<span className="text-sm font-normal text-gray-500">g</span></div>
                  <div className="text-xs text-gray-500 uppercase font-semibold mt-1">Fat</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
