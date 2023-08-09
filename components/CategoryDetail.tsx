


import { ICategory } from "@/typing";


interface IPropType {
    category:  ICategory;    
}

function CategoryDetail({ category }: IPropType) {

    return (
        <div className="px-6 text-center py-10 w-full md:w-[80%] 2xl:w-[60%] mx-auto mt-5">
            <p className="text-[2rem] lg:text-[2.5rem] 2xl:text-[3rem] font-[500] mb-[1.3rem] font-serif">Category: {category.data.attributes.Title}</p>
            <div className="w-[180px] mb-[1.3rem] h-[0.9px] mx-auto bg-slate-300"></div>
            <p className="text-[1.3rem] font-[300] font-sans leading-relaxed text-gray-500">{category.data.attributes.description}</p>
        </div>
    );
}



export default CategoryDetail

