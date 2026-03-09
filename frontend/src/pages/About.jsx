import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-[#121614] dark:text-white antialiased min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <section className="max-w-4xl mx-auto px-6 lg:px-10 py-16 text-center">
                    <span className="inline-block bg-primary/10 text-primary border border-primary/20 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-6">
                        About The Project
                    </span>
                    <h1 className="text-4xl lg:text-6xl font-extrabold mb-8 leading-tight">
                        Guardians of the <span className="text-primary italic">Phumdis</span>
                    </h1>

                    <div className="bg-white dark:bg-[#1a2620] border border-[#dde3e0] dark:border-primary/20 rounded-2xl p-8 lg:p-12 shadow-xl mb-12">
                        <span className="material-symbols-outlined text-5xl text-primary mb-6">eco</span>
                        <p className="text-xl lg:text-2xl font-medium leading-relaxed text-[#121614]/80 dark:text-white/80">
                            "Guardians of the Phumdis is dedicated to documenting and preserving the unique biodiversity of Manipur's wetlands through data-driven conservation insights."
                        </p>
                    </div>

                    <div className="text-left py-12 border-t border-[#dde3e0] dark:border-primary/20">
                        <h2 className="text-2xl font-extrabold mb-8 flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">terminal</span>
                            Technology Stack
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { name: "React", icon: "data_object" },
                                { name: "ASP.NET Core", icon: "dns" },
                                { name: "PostgreSQL", icon: "database" },
                                { name: "Tailwind CSS", icon: "format_paint" }
                            ].map((tech) => (
                                <div key={tech.name} className="bg-white dark:bg-[#1a2620] border border-[#dde3e0] dark:border-primary/20 p-6 rounded-xl flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-lg transition-all group">
                                    <span className="material-symbols-outlined text-4xl text-[#6a8174] group-hover:text-primary transition-colors">{tech.icon}</span>
                                    <span className="font-bold text-[#121614] dark:text-white">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default About;
