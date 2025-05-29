import React from 'react'

export const IntroductionCard = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="card lg:card-side w-fit mx-auto">
                <div className="rounded-lg p-4">
                    <figure>
                        <img
                            src='/gallery2.png'
                            alt="Album"
                            className="w-48 h-48 max-width object-cover border-1 border-primary-co rounded-lg shadow-lg"
                            style={{ maxWidth: '480px', maxHeight: '360px' }}
                        />
                    </figure>
                </div>
                <div className="card-body">
                    <h2 className="card-title text-center">What we do</h2>
                    <p className="text-center">Trash can yadeyade yada- no one cares</p>
                    <div className="card-actions justify-center flex flex-row items-center">
                        <a className="my-4 mx-6 text-primary-content font-mono">What do we do? </a>

                        <button className="btn btn-base-100 text-base-100 bg-primary-content">See how</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
