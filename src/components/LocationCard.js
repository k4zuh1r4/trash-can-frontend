import React from 'react'

export const LocationCard = () => {
    return (
        <div className="p-8 bg-primary min-h-screen">
            <h1 className="text-5xl font-bold text-center my-8 text-white">Your Impact. Your Choice</h1>
            <div className="py-16 flex justify-center gap-6">
                <div className="card w-64 p-5 bg-white shadow-xl">
                    <figure>
                        <img src="/hanoi.jpg" alt="Hanoi" />
                    </figure>
                    <div className="card-body">
                        <h3 className="card-title">Hanoi</h3>
                        <button className="btn btn-primary bg-primary-content text-base-100">Learn More</button>
                    </div>
                </div>
                <div className="card w-64 p-5 bg-white shadow-xl">
                    <figure>
                        <img src="/hcmc.jpg" alt="HCMC" />
                    </figure>
                    <div className="card-body">
                        <h3 className="card-title">Ho Chi Minh</h3>
                        <button className="btn btn-primary bg-primary-content text-base-100">Learn More</button>
                    </div>
                </div>
                <div className="card w-64 p-5 bg-white shadow-xl">
                    <figure>
                        <img src="/hpc.jpg" alt="Hai Phong" />
                    </figure>
                    <div className="card-body">
                        <h3 className="card-title">Hai Phong</h3>
                        <button className="btn btn-primary bg-primary-content text-base-100">Learn More</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
