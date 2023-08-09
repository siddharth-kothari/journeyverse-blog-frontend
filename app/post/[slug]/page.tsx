import Post from '@/components/Post'
import qs from 'qs';
import { IQueryOptions } from '@/typing';
import { api } from '@/app/api';
import { serializeMarkdown } from '@/utils';

export const getPost = async({ slug }:any) =>{

  const options: IQueryOptions = {
    populate:[ 'MainImage', 'Author.image', 'category']
  }

  const queryString = qs.stringify(options);

  //console.log("queryString",queryString);
  const res = api.get(`/slugify/slugs/post/${slug}?${queryString}`)
  return res;
  
}

export default async function SinglePost ({ params }:any) {

    const { slug } = params;
    
    // const {page} = searchParams
    // const {search} = searchParams
  
    const  { data }  = await getPost({ slug });
  
    const post = data.data;

    
     
    return (
    <>
      <Post post={post}/>
    </>
    )
}

