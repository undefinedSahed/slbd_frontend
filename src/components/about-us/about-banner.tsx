import React from 'react'

export default function AboutBanner() {
    return (
        <section
            className="md:h-[50vh] h-[40vh] relative flex items-center justify-center"
            style={{
                backgroundImage: "url('../../assets/about_ban_bg.jpg')",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Content */}
            <h3 className='pt-14 relative text-white lg:text-4xl text-2xl z-10 font-semibold underline lg:underline-offset-5 underline-offset-4'>About Super Lighting BD</h3>
        </section>
    )
}
