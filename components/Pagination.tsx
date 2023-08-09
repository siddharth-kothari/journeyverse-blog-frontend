'use client'

import { TPage } from '@/typing'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { log } from 'console'
import Link from 'next/link'
import React, { useState } from 'react'
import Login from './login'

interface IPropType {
  pagination: any,
    currentPage: any,
    redirectUrl?: string
}

const Pagination = ({ pagination, currentPage, redirectUrl = "/" }: IPropType) => {


   
    var urlPage = currentPage;
    const pageCount = pagination.pageCount;
    
    const isNextDisabled = () =>{
      return urlPage >= pageCount;
    } 

    const isPrevDisabled = () =>{
      return urlPage <= 1;
    } 

     const list = []
     for (let i = 1; i <= pageCount; i++) {
        list.push(i)
      }
      
      const handlePageChange = (page:number) =>{
        
      }
      
    return (
        <div className='flex items-center justify-between w-max mx-auto gap-4 my-10'>
            <button  className={`${'text-black bg-white shadow-xl p-2 rounded-full hover:text-white hover:bg-black'} ${isPrevDisabled() || pageCount == 1 ? 'hidden' : ''}`}>
                <ArrowLongLeftIcon className="h-5 w-5" />
            </button>

            <div className='flex justify-around items-center gap-3'>
                {list.map((page)=>(
                    <Link key={page} onClick={()=>handlePageChange(page)} href={`${redirectUrl}?page=${page}`} className={`${'py-1 px-3 hover:bg-slate-300 rounded-lg'} ${urlPage == page || pageCount == 1 ? 'bg-black text-white rounded-lg py-1 px-3' : ''}`}>{page}</Link>
                ))}
            </div>

            <button  className={`${'text-black bg-white shadow-xl p-2 rounded-full hover:text-white hover:bg-black'} ${isNextDisabled() || pageCount == 1 ? 'hidden' : ''}`}>
                <ArrowLongRightIcon className="h-5 w-5" />
            </button>
        </div>
    )
}
 
export default Pagination