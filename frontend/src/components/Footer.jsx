import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-background-dark border-t border-[#dde3e0] dark:border-primary/20 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary p-1.5 rounded-lg text-white">
                                <span className="material-symbols-outlined text-xl">eco</span>
                            </div>
                            <h1 className="text-md font-extrabold text-primary uppercase tracking-tight">Manipur Wetlands</h1>
                        </div>
                        <p className="text-sm text-[#6a8174] leading-relaxed">
                            Dedicated to the documentation, preservation, and sustainable management of Manipur's unique wetland ecosystems through data-driven conservation.
                        </p>
                        <div className="flex gap-4">
                            <a className="size-10 rounded-full border border-[#dde3e0] flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" href="#"><span className="material-symbols-outlined text-lg">share</span></a>
                            <a className="size-10 rounded-full border border-[#dde3e0] flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all" href="#"><span className="material-symbols-outlined text-lg">mail</span></a>
                        </div>
                    </div>

                    <div>
                        <h5 className="font-bold text-[#121614] dark:text-white mb-6 uppercase tracking-widest text-xs">Resources</h5>
                        <ul className="space-y-4 text-sm text-[#6a8174]">
                            <li><a className="hover:text-primary transition-colors" href="#">Biodiversity Data</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Wetland Maps</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Species Checklist</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Conservation Reports</a></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-bold text-[#121614] dark:text-white mb-6 uppercase tracking-widest text-xs">Collaboration</h5>
                        <ul className="space-y-4 text-sm text-[#6a8174]">
                            <li><a className="hover:text-primary transition-colors" href="#">Researchers Portal</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Citizen Science</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Partnerships</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Volunteer</a></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-bold text-[#121614] dark:text-white mb-6 uppercase tracking-widest text-xs">Location</h5>
                        <div className="rounded-xl overflow-hidden aspect-video bg-white hover:bg-[#f1f4f2] border border-[#dde3e0] flex items-center justify-center p-2 transition-colors">
                            <img
                                className="w-full h-full object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer"
                                data-alt="Manipur District Map"
                                data-location="Manipur"
                                src="/assets/manipur_district_map.png"
                                alt="Manipur District Map"
                            />
                        </div>
                        <p className="text-[10px] text-[#6a8174] mt-2 uppercase text-center font-bold tracking-widest">Imphal, Manipur, India</p>
                    </div>
                </div>

                <div className="pt-8 border-t border-[#dde3e0] dark:border-primary/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#6a8174] font-medium">
                    <p>© 2024 Manipur Wetlands Biodiversity Inventory. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a className="hover:text-primary" href="#">Privacy Policy</a>
                        <a className="hover:text-primary" href="#">Terms of Service</a>
                        <a className="hover:text-primary" href="#">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
