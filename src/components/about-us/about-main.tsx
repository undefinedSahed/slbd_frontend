import Image from "next/image";
import React from "react";
import AboutMainImage from "../../../public/assets/about1.jpg";
import Link from "next/link";

export default function AboutMain() {
  return (
    <section className="py-5 lg:py-20">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-10 gap-6 items-center">
          {/* left-side */}
          <div className="">
            <Image
              className="max-w-full aspect-5/3 object-cover rounded-lg"
              src={AboutMainImage}
              alt="aboutImage"
            />
          </div>

          {/* right-side */}
          <div className="">
            <h2 className="text-2xl lg:text-3xl font-bold underline underline-offset-8">
              About Us
            </h2>
            <p className="text-sm font-normal lg:text-base my-5 text-justify">
              Super Light BD is a trusted lighting solutions provider offering a
              wide range of interior and outdoor lights. From elegant home
              lighting to durable street and industrial fixtures, we ensure
              top-quality products at competitive prices. Our collection
              includes LED bulbs, panel lights, floodlights, garden lights, and
              more—each designed for energy efficiency and long-lasting
              performance. <br /> <br /> Our mission is to brighten every space with
              innovative, eco-friendly lighting solutions that combine style and
              reliability. With a strong focus on customer satisfaction, we
              provide expert support and dependable service for homes, offices,
              and commercial projects.Choose Super Light BD for modern,
              sustainable, and high-performance lighting that transforms any
              environment with brilliance and trust.
            </p>
            <div>
              <Link href="/services">
                <button className="bg-primary hover:bg-primary/90 text-white px-12 py-3 rounded-md mt-4 text-sm cursor-pointer">
                  Explore{" "}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
