import { ImageUpload } from "@/components/ImageUpload";
import { Join } from "@/components/Join";
import { OlderImages } from "@/components/OlderImages";
import { cookies } from "next/headers";
import { getUserById, getUserWithImages, logout } from "../actions";
async function getUserId() {
    const cookieStore = cookies();
    const userId = cookieStore.get('userID')?.value;
    return userId;
  }
  
   async function getUser() {
    const userId = await getUserId();
    if (!userId) return null;
  
    const userWithImages = await getUserWithImages(userId);
    if (userWithImages) return userWithImages;
  }
export default async function Home() {
  const userWithImages  = await getUser()
  console.log('userWithImages', userWithImages);
  
if (!userWithImages){
    return(
        <Join/>
    );
}
return(

  <div className="mt-24 p-2 md:p-8 flex flex-col items-center justify-center min-h-screen w-full">
    <ImageUpload user={userWithImages}/>
<OlderImages user={userWithImages}/>
  </div>
)
}