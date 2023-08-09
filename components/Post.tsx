import { IPost, IPostAttribute } from '@/typing';
import React from 'react'
import Image from "next/image";
import Link from 'next/link';
interface IPropType {
    post:  IPost;    
}

const Post = ({ post }:IPropType) => {

    const Content = post.attributes.Content

    console.log('img',post.attributes.Author);
    
    
  return (
   <div className="w-[90%] lg:w-[80%] 2xl:w-[60%] mx-auto my-14 lg:my-28">
        <div className='text-center'>
            <p className='font-serif font-bold text-4xl mb-4'>{post.attributes.Title}</p>
            <div className='flex justify-center items-center gap-6'>
                <p className=" font-light font-sans text-gray-500">
                    {new Date(post.attributes.createdAt).toLocaleDateString(
                        "en-US",{
                            day:"numeric",
                            month:"long",
                            year:"numeric"
                        }
                    )}
                </p>
                <p className='text-gray-500'>By <span className='text-black'>{post.attributes.Author.data.attributes.name}</span></p>
            </div>
        </div>
        
        <div id="post-content">
            <div className='w-full my-10 h-[90%]'>
                <img 
                    className="w-full"
                    src={`${process.env.BACKEND_IMAGE_LINK}${post.attributes.MainImage.data.attributes.url}`}
                    alt={post.attributes.Slug} 
                />
            </div>
            <div className='w-full 2xl:w-[90%] mx-auto'>
                <div dangerouslySetInnerHTML={{__html: Content}}></div>

                <div className='block md:flex justify-between items-center my-14'>
                    <div>
                        <p className='uppercase font-base font-sans font-[500] leading-10 tracking-widest'>posted in:</p>
                        <Link className='text-gray-500 hover:text-black' href={`/category/${post.attributes.category.data.attributes.Slug}`}>{post.attributes.category.data.attributes.Title}</Link>
                    </div>

                    <div>
                        <p className='uppercase font-base font-sans font-[500] leading-10 tracking-widest'>tags:</p>
                        <p>{post.attributes.category.data.attributes.Title}</p>
                    </div>
                </div>

                <div id="author" className=' w-full block md:flex border-slate-300 justify-between gap-4 border p-9 text-center md:text-left'>
                    <div className='md:w-[50%] rounded-full'>
                        <Image
                            className='w-[100px] mx-auto'
                            src={`${process.env.BACKEND_IMAGE_LINK}${post.attributes.Author.data.attributes.image.data.attributes.url}`}
                            alt={post.attributes.Slug}
                            height={100}
                            width={100} 
                        />
                    </div>
                    <div className='block'>
                        <div>
                            <p className='uppercase text-gray-500 text-sm font-sans font-thin leading-8 tracking-widest'>posted by</p>
                            <p className='font-bold font-sans mb-2'>{post.attributes.Author.data.attributes.name}</p>
                        </div>
                        <div className='text-gray-500 font-[250]' dangerouslySetInnerHTML={{__html: post.attributes.Author.data.attributes.bio}}></div>
                    </div>
                </div>
            </div>
            
        </div>
        
   </div>
  )
}

export default Post