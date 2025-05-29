import React from 'react'

export const TypeCard = () => {
    return (
        <div className="p-8 bg-white min-h-screen">
            <h1 className="text-3xl font-bold text-center my-8 text-primary-content">Most disposed trash types</h1>
            <div className="py-16 flex justify-center gap-6">
                <div className="card w-64 p-5 shadow-xl">
                    <figure>
                        <img src="/bottle.jpg" alt="bottle" />
                    </figure>
                    <div className="card-body">
                        <h3 className="card-title">Plastic Bottles</h3>
                    </div>
                </div>
                <div className="card w-64 p-5 shadow-xl">
                    <figure>
                        <img src="/bags.jpeg" alt="bag" />
                    </figure>
                    <div className="card-body">
                        <h3 className="card-title">Plastic Bags</h3>
                    </div>
                </div>
                <div className="card w-64 p-5 shadow-xl">
                    <figure>
                        <img src="/food.jpg" alt="Food" />
                    </figure>
                    <div className="card-body">
                        <h3 className="card-title">Food</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
