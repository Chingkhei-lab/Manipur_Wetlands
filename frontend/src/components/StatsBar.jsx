import React from 'react';

const StatsBar = () => {
    return (
        <section className="relative -mt-16 z-10 max-w-6xl mx-auto px-6">
            <div className="bg-white dark:bg-background-dark rounded-2xl shadow-2xl border border-[#dde3e0] dark:border-primary/20 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#dde3e0] dark:divide-primary/20 overflow-hidden">
                {/* Stat 1 */}
                <div className="p-8 flex items-center gap-6 group hover:bg-background-light dark:hover:bg-primary/5 transition-colors">
                    <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-4xl">water_drop</span>
                    </div>
                    <div>
                        <p className="text-4xl font-black text-[#121614] dark:text-white leading-none">20</p>
                        <p className="text-sm font-bold text-[#6a8174] uppercase tracking-widest mt-1">Wetlands Surveyed</p>
                    </div>
                </div>
                {/* Stat 2 */}
                <div className="p-8 flex items-center gap-6 group hover:bg-background-light dark:hover:bg-primary/5 transition-colors">
                    <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-4xl">pest_control_rodent</span>
                    </div>
                    <div>
                        <p className="text-4xl font-black text-[#121614] dark:text-white leading-none">160+</p>
                        <p className="text-sm font-bold text-[#6a8174] uppercase tracking-widest mt-1">Species Cataloged</p>
                    </div>
                </div>
                {/* Stat 3 */}
                <div className="p-8 flex items-center gap-6 group hover:bg-background-light dark:hover:bg-primary/5 transition-colors">
                    <div className="size-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-4xl">warning</span>
                    </div>
                    <div>
                        <p className="text-4xl font-black text-[#121614] dark:text-white leading-none">30+</p>
                        <p className="text-sm font-bold text-[#6a8174] uppercase tracking-widest mt-1">Endangered Status</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsBar;
