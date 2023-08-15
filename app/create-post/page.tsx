'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { api } from '../api';
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PhotoIcon } from '@heroicons/react/24/outline';

const CreatePost = () => {
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState<number | null>(0);
    const [categories, setCategories] = useState([]);
    const [tag, setTag] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<Errors>({});
    const [showtoast, setShowToast] = useState(false);
    const { data: session, status }  = useSession();

    var user = session?.user;
    const router = useRouter();

    console.log(user?.jwt)

    useEffect(()=>{
        axios.get('http://localhost:1337/api/categories')
        .then(res=>{
            setCategories(res.data.data);
        })
    },[]);

    interface Errors {
        title?: string;
        content?: string;
        tag?: string;
    }
  
    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();
        
      // Validate form fields
      const validationErrors: Errors = {};
      if (title.trim() === '') {
        validationErrors.title = 'Name is required';
      }
      if (content.trim() === '') {
        validationErrors.content = 'Username is required';
      }
      
      if (tag.trim() === '') {
        validationErrors.tag = 'Password is required';
      }
      
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
  
      // Process the form submission logic here
      // console.log('Name:', name);
      // console.log('Username:', username);
      // console.log('Email:', email);
      // console.log('Password:', password);
      // console.log('Profile Picture:', profilePicture);
  
        try {
  
          const data = new FormData();
          data.append('files', image, image?.name);
          const response = await axios.post('http://localhost:1337/api/upload', data)

          var slug = title.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '-');
          
          if(response.status == 200){

            const userData = {
                data:{
                    Title:title,
                    Slug:slug,
                    Content:content,
                    category:[category],
                    tags:tag,
                    Author:[user?.user?.id],
                    MainImage:[response.data[0].id]
                }  
            };
    
            var body = JSON.stringify(userData);
    
            const { data }:any  = await axios.post('http://localhost:1337/api/posts?populate=*', body ,
            {headers:{
                "Content-Type":'application/json',
                "Authorization": `Bearer ${user?.jwt}` 
            }})

            const blogData = data;
            console.log(blogData,data);
  
            if(blogData){
              
              setTitle('');
              setContent('');
              setCategory(0);
              setTag('');
              setImage(null);
              setImagePreview(null);
              setErrors({});   
              setShowToast(true); 
              toast.success('Post Created successfully!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
    
              setTimeout(() => {
                router.push('/');
              }, 2500);
  
            } else {
                setShowToast(true);
                toast.error('Something went wrong!', {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  });
            }
  
          } else {
            alert("something went wrong")
          }
          
        } catch (error) {
          alert(error)
        }
        
      // Reset the form fields and errors
      
    };
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];
  
      if (file) {
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
  return (
    
    <div className='md:max-w-[60%] mx-auto my-12 bg-white rounded-md p-5'>
    {showtoast && (<ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />)}
        <p className='text-2xl md:text-3xl font-serif font-semibold leading-10'>Create Post</p>

        <form onSubmit={handleSubmit} className='mt-10'>
          
            <div className="mb-4">
              <label htmlFor="title" className="block  text-sm font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                className={`w-full px-3 py-2 border bg-inherit text-black rounded-md outline-none ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Add Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block  text-sm font-medium mb-2">
                Content
              </label>
              <input
                type="text"
                id="content"
                className={`w-full px-3 py-2 border bg-inherit text-black rounded-md outline-none ${
                  errors.content ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Write here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content}</p>
              )}
            </div>
          

          <div className='flex justify-between items-center gap-4'>
            <div className="mb-4 w-full">
              <label htmlFor="category" className="block text-sm font-medium mb-2">
                Category
              </label>
              <select
                id="category"
                className={`w-full px-3 py-2 border bg-inherit text-black rounded-md outline-none `}
                placeholder="Enter your email"
                
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="0">Select</option>
                {categories.map((category):any=>(
                    <option value={category.id} key={category.id}>{category.attributes.Title}</option>
                ))}
                </select>
            </div>
       
            <div className="mb-4  w-full">
            <label htmlFor="location" className="block text-black text-sm font-medium mb-2">
              Tags
            </label>
            <div className="relative">
            <input
              type='text'
              id="tag"
              className={`w-full px-3 py-2 border bg-inherit text-black rounded-md outline-none ${
                errors.tag ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Add tags separated by comma"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            
            </div>
            {errors.tag && (
              <p className="text-red-500 text-sm mt-1">{errors.tag}</p>
            )}
          </div>
          </div>

         
          <div className="mx-auto relative">
            <label className="block text-black text-sm font-medium mb-2">
              Image
            </label>
              {imagePreview ? (
                <img src={imagePreview} alt="Profile Preview" className="mt-2 w-full object-cover object-center rounded-xl" />
              ) : (
               <>
                <div className='w-full bg-[#000]/80 h-[400px] relative rounded-xl grid place-content-center'>
                <PhotoIcon className='text-white h-28 w-28'/>
                    <label className="w-[100%] h-[100%] pt-[30%] absolute text-center text-3xl text-white cursor-pointer hover:cursor-pointer rounded-xl" htmlFor='image'>
                        Browse
                    </label>
                </div>
                </>
              )}
          
            <input
                type="file"
                id="image"
                accept="image/*"
                className="w-full opacity-0"
                onChange={handleFileChange}
                />
            </div>

          <div className='w-full flex'>
            <button
              type="submit"
              className="2xl:w-[20%] w-[40%] mx-auto bg-black text-white py-2 px-4 rounded-md focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
    </div>
  )
}

export default CreatePost