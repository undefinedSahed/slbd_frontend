import HomeAbout from "@/components/home/about-home";
import BannerHome from "@/components/home/banner";
import Blogs from "@/components/home/blog";
import Category from "@/components/home/category";
import FeaturedProducts from "@/components/home/featured-products";
import Offer from "@/components/home/offer";
import Policy from "@/components/home/policy";
import PopularProducts from "@/components/home/popular-products";
import Projects from "@/components/home/Projects";
import Testimonial from "@/components/home/testimonial";
import Topsold from "@/components/home/topsold";
import Services from "@/components/shared/services";

export default function Home() {
  return (
    <div className="">
      <BannerHome />
      <Policy />
      <Services />
      <Category />
      <Topsold/>
      <PopularProducts />
      <FeaturedProducts />
      <Offer />
      <Projects/>
      <Testimonial />
      <HomeAbout />
      <Blogs />
    </div>
  );
}
