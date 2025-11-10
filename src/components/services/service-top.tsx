import Image from "next/image";
import React from "react";
import ServiceHeroImg from "../../../public/assets/service_banner.avif";
import Link from "next/link";

export default function ServiceTop() {
  return (
    <section className="py-5 lg:py-20">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row gap-5 justify-between items-center ">
          {/* left-side */}
          <div className="lg:w-[50%] w-full">
            <h2 className="text-2xl lg:text-3xl font-bold underline underline-offset-8">
              Our Services
            </h2>
            <p className="text-sm font-normal lg:text-base my-5 text-justify">
              We provide high-quality interior and outdoor lighting solutions
              tailored for homes, offices, showrooms, and restaurants, ensuring
              every space is illuminated with both functionality and style. Our
              comprehensive services include custom lighting designs,
              professional LED installations, smart lighting systems, and
              energy-efficient solutions that help reduce costs while enhancing
              ambiance. In addition, we specialize in landscape, street, and
              building facade lighting, creating visually striking environments
              that stand out day and night. Our experienced team offers expert
              installation, maintenance, and repair services to ensure your
              lighting systems remain efficient, safe, and long-lasting. We also
              provide free consultations and personalized lighting plans,
              carefully designed to meet your specific preferences and project
              requirements, making Super Light BD your trusted partner for
              complete lighting excellence.
            </p>
            <div>
              <Link href={"/about-us"}>
                <button className="bg-[#2BA14D] text-white px-8 py-2 text-sm cursor-pointer hover:bg-primary/90">
                  Explore{" "}
                </button>
              </Link>
            </div>
          </div>
          {/* right-side */}
          <div className="w-[45%] hidden md:block">
            <Image
              className="w-full aspect-5/3 rounded-lg"
              src={ServiceHeroImg}
              alt="ServiceHero"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
