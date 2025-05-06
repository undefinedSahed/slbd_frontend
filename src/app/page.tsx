import HomeAbout from "@/components/home/about-home";
import BannerHome from "@/components/home/banner";
import Blogs from "@/components/home/blog";
import Category from "@/components/home/category";
import FeaturedProducts from "@/components/home/featured-products";
import Offer from "@/components/home/offer";
import Policy from "@/components/home/policy";
import PopularProducts from "@/components/home/popular-products";
import Testimonial from "@/components/home/testimonial";

export default function Home() {
  return (
    <div className="">
      <BannerHome />
      <Policy />
      <Category />
      <PopularProducts />
      <FeaturedProducts />
      <Offer />
      <Testimonial />
      <HomeAbout />
      <Blogs />
    </div>
  );
}
