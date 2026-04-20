import Image from "next/image";
import NavBar from "./_components/NavBar/NavBar";
import { getProducts } from "@/apis/featureProducts.api";
import ProductCard from "./_components/ProductCard/ProductCard";
import { log } from "console";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { getCategoris } from "@/apis/categories/allCategories.api";
import CategoryCard from "./_components/CategoryCard/CategoryCard";
import Slider from "./_components/Slider/Slider";
import slide1 from '../assets/home-slider-1.d79601a8.png'

export default async function Home() {
  const products =await getProducts()
  const categories = await getCategoris()
 
  return (
  <>
   
   <div>
   
     {/* slider */}
     <Slider pageItems={[slide1.src,slide1.src]}/>
     {/* category */}
     <div className="container mx-auto max-w-[1280px]">
      <div className="flex items-center justify-between">
      <h2 className="before:absolute before:left-0 before:top-0 relative before:w-2 before:h-10 before:rounded-full before:bg-linear-to-b before:from-green-300 before:to-green-700 pl-5 my-5">Shop By <span className="text-green-600">Categories</span></h2>
      <Link className="flex items-center text-green-600 gap-2 hover:text-green-700" href={'/products'}>View All Categories <FaArrowRight /></Link>
     </div>
     <div className="grid grid-cols-2 md:grid-cols-6 gap-5 my-10">
       {categories?.map(cate => <CategoryCard cate={cate} key={cate._id}/>) || []}
     </div>
     {/* all products */}
     <h2 className="before:absolute before:left-0 before:top-0 relative before:w-2 before:h-10 before:rounded-full before:bg-linear-to-b before:from-green-300 before:to-green-700 pl-5 my-5">Featured <span className="text-green-600">Products</span></h2>
     <div className="grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
      {products.map(prod => {
        
        return <ProductCard key={prod._id} product={prod}/>
      })}
     </div>
     </div>

    
   </div>
  </>
  );
}
