import Image from "next/image";
import React from "react";
import about1 from "../../../public/assets/about1.jpg";
import about2 from "../../../public/assets/about2.jpg";
import icon from "../../../public/assets/icon.png";
import happy from "../../../public/assets/happy.png";
import quality from "../../../public/assets/quality.png";
import champion from "../../../public/assets/champion.png";
import setting from "../../../public/assets/setting.png";
import awards from "../../../public/assets/awards.png";
import { Check } from "lucide-react";
// import { FaCheck } from "react-icons/fa6";


const HomeAbout = () => {
    const indoorLightingFeatures = [
        { id: 1, feature: "Modern Ceiling Fixtures" },
        { id: 2, feature: "Ambient Table and Floor Lamps" },
        { id: 3, feature: "Energy-Efficient LED Solutions" },
        { id: 4, feature: "Customizable Lighting Designs" },
        { id: 5, feature: "Expert Installation Services" }
    ];

    const outdoorLightingFeatures = [
        { id: 1, feature: "Weather-Resistant Fixtures" },
        { id: 2, feature: "Energy-Saving LED Technology" },
        { id: 3, feature: "Modern Linear and Shade Lighting" },
        { id: 4, feature: "Perfect for Gardens, and Pathways" },
        { id: 5, feature: "Professional Outdoor Lighting Solutions" }
      ];

    return (
        <section className="py-8 lg:py-24 bg-gray-100">
            <div className="container mx-auto lg:px-0 px-4">
                <div className="grid lg:grid-cols-[4fr_3fr] gap-10">
                    <div className="">
                        <h2 className="text-primary text-2xl md:text-3xl underline underline-offset-5 font-semibold pb-10">About Us</h2>
                        <h2 className="lg:text-4xl text-2xl font-bold text-[#2E2E2E]">
                            Your Comfort Is Our Happiness
                        </h2>
                        <div className="mt-10">
                            <div className="grid lg:grid-cols-2">
                                <div className="pt-3">
                                    <h3 className="text-xl font-semibold text-[#2E2E2E] mb-5">Illuminate Your Life With Style</h3>
                                    <ul className="text-gray-700">
                                        {indoorLightingFeatures.map((item) => (
                                            <li key={item.id} className="text-[#A1A1A1] text-base font-medium mb-2 flex gap-4 items-center">
                                                <Check className="text-primary"/> {item.feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="">
                                    <Image src={about1} alt="Experience" className="w-full aspect-5/3 object-cover rounded-md" />
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-2 mt-12">
                                <div className="">
                                    <Image src={about2} alt="Brand Story" className="w-full aspect-5/3 object-cover rounded-md" />
                                </div>
                                <div className="lg:pl-10 pt-3">
                                    <h3 className="text-xl font-semibold text-[#2E2E2E] mb-5">
                                        We Provide The Best Experience
                                    </h3>
                                    <ul className="text-gray-700">
                                        {outdoorLightingFeatures.map((item) => (
                                            <li key={item.id} className="text-[#A1A1A1] text-base font-medium mb-2 flex gap-4 items-center">
                                                <Check className="text-primary"/> {item.feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-black rounded-lg p-10 flex justify-center items-center">
                        <div className="grid grid-cols-3 grid-rows-3 w-full">
                            <Image src={icon} alt="Brand Story" className="w-full" />
                            <Image src={happy} alt="Brand Story" className="w-full" />
                            <Image src={quality} alt="Brand Story" className="w-full col-start-2 col-end-3" />
                            <Image src={setting} alt="Brand Story" className="w-full col-start-3 col-end-4" />
                            <Image src={champion} alt="Brand Story" className="w-full" />
                            <Image src={awards} alt="Brand Story" className="w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeAbout;