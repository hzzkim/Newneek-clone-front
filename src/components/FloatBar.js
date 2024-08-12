import React from 'react';
import '../assets/MainStyles.css';
import '../assets/styleSheet.css';


const Floatbar = () => {
    return (
        <div className="fixed bottom-safe-bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-4 rounded-full bg-white px-4 py-3 shadow-reaction md:bottom-8 md:gap-5 md:px-6">
            <button className="floatbar-button inline-flex items-center gap-1 text-sm font-bold text-gray-450">❤</button>
            <button className="floatbar-button inline-flex items-center gap-1 text-sm font-bold text-gray-450">💬</button>
            <button className="floatbar-button inline-flex items-center gap-1 text-sm font-bold text-gray-450">🔖</button>
            <button className="floatbar-button inline-flex items-center gap-1 text-sm font-bold text-gray-450">🔁</button>
        </div> 
    );
};

export default Floatbar;
