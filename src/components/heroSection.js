import React from 'react'

export const HeroSection = () => {
    return (
        <div className="hero min-h-screen justify-start items-center px-4 py-10 bg-[url('/gallery0.png')] bg-cover bg-center bg-no-repeat opacity-70">
            <div className="hero-content text-left ">
                <div className="px-8">
                    <h1 className="text-7xl font-bold text-white py-4 text-shadow-2xs">Green</h1>
                    <h1 className="text-7xl font-bold text-white py-6 text-shadow-2xs">Cypher</h1>
                    <p className="py-6 font-mono text-lg text-white text-shadow-2xs">
                        Make the world green again.
                    </p>
                </div>
            </div>
        </div>
    )
}
