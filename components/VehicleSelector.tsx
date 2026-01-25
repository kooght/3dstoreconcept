'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { vehicles, mockPlates } from '@/lib/mock-data';
import { Search, Car, CreditCard } from 'lucide-react';
import { clsx } from 'clsx';

export default function VehicleSelector() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'vehicle' | 'plate'>('vehicle');

    // Tab 1: Vehicle State
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedModel, setSelectedModel] = useState('');

    // Tab 2: Plate State
    const [plate, setPlate] = useState('');
    const [plateError, setPlateError] = useState('');

    const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMake(e.target.value);
        setSelectedModel('');
    };

    const handleSearchVehicle = () => {
        if (selectedMake && selectedModel) {
            router.push(`/catalogue?make=${encodeURIComponent(selectedMake)}&model=${encodeURIComponent(selectedModel)}`);
        }
    };

    const handleSearchPlate = () => {
        setPlateError('');
        // Normalize format to AA123BB (remove dashes, spaces, special chars)
        const normalizedPlate = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');

        // Mock lookup
        // In a real app, this would call an external API
        const found = mockPlates[normalizedPlate]; // e.g. "AA-123-BB"

        if (found) {
            router.push(`/catalogue?make=${encodeURIComponent(found.make)}&model=${encodeURIComponent(found.model)}`);
        } else {
            // Allow "generic" plates for testing purposes or show error
            // For this demo, let's just show an error if not in our mock list to demonstrate the feature
            setPlateError("Véhicule non trouvé. Essayez AA-123-BB (Renault Clio 5) ou CC-888-DD (Peugeot 208).");
        }
    };

    const availableModels = vehicles.find(v => v.make === selectedMake)?.models || [];

    return (
        <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-auto transform -translate-y-1/2 overflow-hidden">
            {/* Tabs Header */}
            <div className="flex border-b border-gray-200">
                <button
                    className={clsx(
                        "flex-1 py-4 text-sm font-bold uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors",
                        activeTab === 'vehicle' ? "text-black border-b-2 border-black bg-gray-50" : "text-gray-500"
                    )}
                    onClick={() => setActiveTab('vehicle')}
                >
                    <Car size={20} /> Par Véhicule
                </button>
                <button
                    className={clsx(
                        "flex-1 py-4 text-sm font-bold uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors",
                        activeTab === 'plate' ? "text-black border-b-2 border-black bg-gray-50" : "text-gray-500"
                    )}
                    onClick={() => setActiveTab('plate')}
                >
                    <CreditCard size={20} /> Par Immatriculation
                </button>
            </div>

            <div className="p-6">
                {activeTab === 'vehicle' ? (
                    <div className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1 w-full">
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Marque</label>
                            <select
                                className="w-full h-12 px-4 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:ring-2 focus:ring-black outline-none transition-all"
                                value={selectedMake}
                                onChange={handleMakeChange}
                            >
                                <option value="">Sélectionner une marque</option>
                                {vehicles.map((v) => (
                                    <option key={v.make} value={v.make}>{v.make}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1 w-full">
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Modèle</label>
                            <select
                                className="w-full h-12 px-4 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:ring-2 focus:ring-black outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                value={selectedModel}
                                onChange={(e) => setSelectedModel(e.target.value)}
                                disabled={!selectedMake}
                            >
                                <option value="">Sélectionner un modèle</option>
                                {availableModels.map((model) => (
                                    <option key={model} value={model}>{model}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={handleSearchVehicle}
                            disabled={!selectedMake || !selectedModel}
                            className="h-12 px-8 bg-black text-white font-bold rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Search size={20} />
                            RECHERCHER
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <div className="flex flex-col md:flex-row gap-4 items-end w-full max-w-lg mx-auto">
                            <div className="flex-1 w-full relative">
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Plaque d'immatriculation</label>
                                <div className="relative">
                                    {/* French Plate Visual Style */}
                                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-blue-700 text-white rounded-l-md flex flex-col items-center justify-center text-[10px] font-bold z-10">
                                        <span>F</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="AA-123-BB"
                                        className="w-full h-12 pl-12 pr-4 border border-gray-300 rounded-md bg-white text-gray-900 font-mono text-lg uppercase focus:ring-2 focus:ring-black outline-none transition-all text-center tracking-widest"
                                        value={plate}
                                        onChange={(e) => setPlate(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearchPlate()}
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleSearchPlate}
                                disabled={!plate}
                                className="h-12 px-8 bg-black text-white font-bold rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 w-full md:w-auto disabled:opacity-50"
                            >
                                <Search size={20} />
                                OK
                            </button>
                        </div>
                        {plateError && (
                            <p className="text-red-600 text-sm mt-3 font-medium animate-pulse">{plateError}</p>
                        )}
                        <p className="text-gray-400 text-xs mt-4">
                            Exemple pour tester : <span className="font-mono bg-gray-100 px-1 rounded text-gray-600 cursor-pointer hover:underline" onClick={() => setPlate('AA-123-BB')}>AA-123-BB</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
