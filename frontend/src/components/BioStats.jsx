import React from 'react';

const BioStats = ({ speciesData }) => {
    // Collect all species into a single array
    const allSpecies = Object.values(speciesData).flat();

    // Calculate total species
    const totalSpecies = allSpecies.length;

    // Calculate RED LIST entries
    const redListCount = allSpecies.filter(species => {
        const status = species.iucnStatus ? species.iucnStatus.toLowerCase() : '';
        return status.includes('endangered') || status.includes('vulnerable');
    }).length;

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 md:py-8 -mt-6 sm:-mt-10 md:-mt-16 z-10 relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

                {/* Total Species Stat */}
                <div className="bg-white/90 dark:bg-[#1a2620]/90 backdrop-blur-md rounded-2xl p-5 md:p-6 shadow-xl border border-[#dde3e0] dark:border-primary/20 flex flex-col justify-center items-center text-center transform hover:-translate-y-1 transition-transform">
                    <span className="material-symbols-outlined text-3xl md:text-4xl text-primary mb-1 md:mb-2">database</span>
                    <h3 className="text-[#6a8174] text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1">Total Documented Species</h3>
                    <p className="text-3xl md:text-4xl font-extrabold text-[#121614] dark:text-white">{totalSpecies}</p>
                </div>

                {/* Biodiversity Health Stat */}
                <div className={`backdrop-blur-md rounded-2xl p-5 md:p-6 shadow-xl flex flex-col justify-center items-center text-center transform hover:-translate-y-1 transition-transform border ${redListCount > 0 ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-500/30' : 'bg-white/90 dark:bg-[#1a2620]/90 border-[#dde3e0] dark:border-primary/20'}`}>
                    <span className={`material-symbols-outlined text-3xl md:text-4xl mb-1 md:mb-2 ${redListCount > 0 ? 'text-red-500' : 'text-primary'}`}>
                        {redListCount > 0 ? 'warning' : 'health_and_safety'}
                    </span>
                    <h3 className="text-[#6a8174] text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1">IUCN Red List Alert</h3>
                    <div className="flex items-end gap-1.5 md:gap-2">
                        <p className={`text-3xl md:text-4xl font-extrabold ${redListCount > 0 ? 'text-red-600 dark:text-red-400' : 'text-[#121614] dark:text-white'}`}>
                            {redListCount}
                        </p>
                        <p className="text-xs md:text-sm font-medium text-[#6a8174] mb-0.5 md:mb-1">at risk</p>
                    </div>
                </div>

                {/* Ecological Insight Stat */}
                <div className="bg-white/90 dark:bg-[#1a2620]/90 backdrop-blur-md rounded-2xl p-5 md:p-6 shadow-xl border border-[#dde3e0] dark:border-primary/20 flex flex-col justify-center items-center text-center transform hover:-translate-y-1 transition-transform sm:col-span-2 lg:col-span-1">
                    <span className="material-symbols-outlined text-3xl md:text-4xl text-primary mb-1 md:mb-2">nature_people</span>
                    <h3 className="text-[#6a8174] text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1.5 md:mb-2">Ecosystem Health</h3>
                    <p className="text-xs md:text-sm font-medium text-[#121614] dark:text-white/80">
                        Supporting complex food webs and high endemic biodiversity.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default BioStats;
