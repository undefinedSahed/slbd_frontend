import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

const Testimonial = () => {
  const ClientSays = [
    {
      image: "/assets/profile.png",
      name: "Tapash Krishna Kundu",
      designation: "Sr. General Manager At Dekko Isho",
      say: "Super Light BD has consistently delivered excellent street lighting solutions for our projects. Their products are durable, energy-efficient, and stylish. The team’s prompt and quick support make them a trusted partner.",
    },
    {
      image: "/assets/profile.png",
      name: "Md Sohag Khan",
      designation: "Head of Procurement at Vision Group",
      say: "Super Light BD has truly elevated our projects. Their products are outstanding, and their customer service is remarkable. The street lights we installed have completely enhanced our outdoor areas.",
    },
    {
      image: "/assets/profile.png",
      name: "Md Sohel Rahaman",
      designation: "General Manager at Pretty Group",
      say: "We’ve been getting our street lights from Super Light BD for over a year, and the quality is unmatched. Their team is always helpful and responsive. A dependable partner for all our lighting requirements.",
    },
  ];

  return (
    <section className="py-8 lg:py-20">
      <div className="container mx-auto">
        <div className="">
          <div className="pb-5 lg:pb-10">
            <h2 className="text-primary text-xl md:text-3xl underline underline-offset-5 font-semibold">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
            {ClientSays.map((item, i) => (
              <div
                key={i}
                className="border-1 border-primary px-5 py-5 lg:px-8 lg:py-6 rounded-md"
              >
                <div className="flex items-center gap-3 mt-5  ">
                  <div>
                    <Image
                      className="w-16 aspect-1/1 object-contain rounded-full border-1 border-primary"
                      src={item.image}
                      alt="client image"
                      height={64}
                      width={64}
                    />
                  </div>
                  <div>
                    <h5 className="text-sm md:text-md font-semibold">
                      {item.name}
                    </h5>
                    <p className="text-xs  py-1">{item.designation}</p>
                    <div className="flex gap-1">
                      <Star className="w-3 text-primary fill-primary" />
                      <Star className="w-3 text-primary fill-primary" />
                      <Star className="w-3 text-primary fill-primary" />
                      <Star className="w-3 text-primary fill-primary" />
                      <Star className="w-3 text-primary fill-primary" />
                    </div>
                  </div>
                </div>
                <p className="text-sm py-5  text-left">{item.say} </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
