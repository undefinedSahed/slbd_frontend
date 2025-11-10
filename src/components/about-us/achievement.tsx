import Image from "next/image";
import React from "react";
import AboutCustomer from "../../../public/assets/user.png";
import AchievementImage from "../../../public/assets/about2.jpg";

const customerCard = [
  {
    title: "100+",
    info: "Happy Customers",
  },
  {
    title: "64",
    info: "Districts We Serve",
  },
  {
    title: "100+",
    info: "Quality Products",
  },
  {
    title: "6+",
    info: "Quality Services",
  },
  {
    title: "25+",
    info: "Large Warehouse Around The World",
  },
  {
    title: "24/7",
    info: "Personal Customer Service",
  },
];

export default function Achievement() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-14 gap-6">
          {/* left-side */}
          <div className="">
            <div className=" grid grid-cols-2 md:grid-cols-3 md:gap-6 gap-2">
              {customerCard.map((item, index) => (
                <div
                  key={index}
                  className="px-5 space-y-2 py-5 text-center md:text-base text-sm border-1 border-primary hover:bg-[#2BA14D] hover:text-white  transition-all duration-300 ease-in-out rounded-sm"
                >
                  <h3 className="font-bold ">{item.title} </h3>
                  <span className="font-medium">{item.info}</span>
                </div>
              ))}
            </div>
            {/* customer-images */}
            <div className="flex items-center gap-5 mt-12">
              <div className="flex items-center">
                <div className="">
                  <Image
                    className="w-16 aspect-square rounded-full object-contain border-1 border-primary"
                    src={AboutCustomer}
                    alt="cus1"
                  />
                </div>
                <div className="">
                  <Image
                    className="w-16 aspect-square rounded-full object-contain border-1 border-primary"
                    src={AboutCustomer}
                    alt="cus2"
                  />
                </div>
                <div className="">
                  <Image
                    className="w-16 aspect-square rounded-full object-contain border-1 border-primary"
                    src={AboutCustomer}
                    alt="cus3"
                  />
                </div>
              </div>
              <div className="">
                <p className="text-xs lg:text-sm">Trusted by</p>
                <span className="text-xs lg:text-sm font-semibold">
                  1,000+ Customers
                </span>
              </div>
            </div>
          </div>

          {/* right-side */}

          <div className="">
            <h3 className="text-lg font-semibold">
              Superlightbd, Your Home Stylist
            </h3>
            <p className="text-sm py-5">
              Illuminate your home with modern, stylish, and energy-saving
              lighting solutions designed to match your unique taste.
            </p>
            <div className="">
              <Image
                className="max-w-full aspect-video object-cover rounded-lg"
                src={AchievementImage}
                alt="cusMainImage"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
