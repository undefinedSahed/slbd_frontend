import BannerHome from "@/components/home/banner";
import Category from "@/components/home/category";
import Policy from "@/components/home/policy";
import PopularProducts from "@/components/home/popular-products";

export default function Home() {
  return (
    <div className="">
      <BannerHome />
      <Policy />
      <Category />
      <PopularProducts />
    </div>
  );
}
