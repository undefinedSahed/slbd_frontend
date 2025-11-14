import HomeAbout from "@/components/home/about-home";
import BannerHome from "@/components/home/banner";
// import Blogs from "@/components/home/blog";
import Catalog from "@/components/home/catalog";
import Category from "@/components/home/category";
import FeaturedProducts from "@/components/home/featured-products";
import Policy from "@/components/home/policy";
import PopularProducts from "@/components/home/popular-products";
import Projects from "@/components/home/Projects";
import Testimonial from "@/components/home/testimonial";
import Topsold from "@/components/home/topsold";
import Clients from "@/components/shared/clients";
import Services from "@/components/shared/services";

export default function Home() {
  return (
    <div className="">
      <BannerHome />
      <HomeAbout />
      <Policy />
      <Clients />
      <Catalog />
      <Services />
      <Category />
      <Topsold />
      <PopularProducts />
      <FeaturedProducts />
      <Projects />
      <Testimonial />
      {/* <Blogs /> */}
    </div>
  );
}
