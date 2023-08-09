import { api } from '@/app/api';
import AllBlogs from '@/components/AllBlogs'
import CategoryDetail from '@/components/CategoryDetail';
import Pagination from '@/components/Pagination';
import qs from 'qs';

export const getPosts = async(slug:string,page:number) =>{

  const options = {
    sort:['id:desc'],
    filters:{
      category:{
        Slug:slug
      }
    },
    pagination: {
      page: page ? page : 1,
      pageSize: 2
    }
  }

  const queryString = qs.stringify(options);
  //console.log("queryString",queryString);

  const res = api.get(`/posts?populate=*&${queryString}`)
  return res;
  
}

export const getCategory = async(slug:string) =>{

  const res = api.get(`/slugify/slugs/category/${slug}`);
  return res;
  
}

interface IPropType {
  params:  any,
  searchParams: any    
}

export default async function CategoryPage ({ params,searchParams }:IPropType) {

  const { slug } = params;

  
  const {page} = searchParams
  const  {data}  = await getPosts(slug,page);

   console.log('page',page);
   const  category  = await getCategory(slug);

   const  categoryData = category.data;
   const posts = data.data;
   const pagination = data.meta.pagination;

  return (
    <>
      <CategoryDetail category={categoryData}/>
      <AllBlogs posts={posts}/>
      <Pagination pagination={pagination} currentPage={page} redirectUrl={`/category/${slug}`}/>
    </>
    )
    
}

