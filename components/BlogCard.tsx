import { IPost } from '@/typing';
import React from 'react'
import Image from "next/image";
import Link from 'next/link';

interface IPropType {
    post:  IPost;    
}

const BlogCard = ({ post }:IPropType) => {

   
  return (
    <div className='mx-auto h-[606px] w-[310px] md:w-[300px] pb-8 font-bold bg-white shadow-md'>
                
                    <div className='overflow-hidden relative block bg-white group'>
                        <Link href={`/post/${post.attributes.Slug}`}>
                            <img 
                                className="absolute inset-0 object-cover object-center w-full h-[370px]  group-hover:scale-110 transition-transform duration-200 ease-out group-hover:opacity-40"
                                src={`${process.env.BACKEND_IMAGE_LINK}${post.attributes.MainImage.data.attributes.url}`} 
                                alt={post.attributes.Slug}
                            />
                            <div className="relative grid place-content-center h-[370px]">
                                <div className="transition-all transform translate-y-8 opacity-0  duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                    <p className="text-lg text-black underline decoration-2 underline-offset-4">
                                        Read Post
                                    </p>
                                </div>  
                            </div>
                        </Link>
                        
                        
                    </div>
                
                    <div className='text-center p-5 h-[236px] flex flex-col justify-between'>
                        <Link href={`/category/${post.attributes.category.data.attributes.Slug}`} className="font-sans block text-[1.2rem] text-bold uppercase tracking-wide hover:text-black text-[#1d28a1]">{post.attributes.category.data.attributes.Title}</Link>
                        <Link href={`/post/${post.attributes.Slug}`} className=' leading-9 font-serif block hover:underline hover:decoration-1 mx-auto text-[2rem] hover:decoration-slate-300 hover:underline-offset-8'>{post.attributes.Title}</Link>
                        <p className=" font-normal font-sans uppercase tracking-widest">{new Date(post.attributes.createdAt).toLocaleDateString(
                                "en-US",{
                                    day:"numeric",
                                    month:"long",
                                    year:"numeric"
                                }
                                )}</p>
                    </div>
                
                
            </div>
  )
}

export default BlogCard