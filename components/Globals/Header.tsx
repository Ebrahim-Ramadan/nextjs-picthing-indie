'use client'
import { Check, Github } from 'lucide-react'
import Image from 'next/image'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Suspense } from 'react'
import LoadingDots from './LoadingDots'
const Plans = dynamic(() => import('../payment/Plans'), {
  ssr: false,
});
interface User {
  id: string;
  username: string;
  paymentDate?: string;
  pic?: string;
}

export const Header: React.FC<{ user: User }> = ({user}) => {
  const router = useRouter()
  const handleSignOut = async () => {
    const promise = fetch('/api/signout');
    toast.promise(promise, {
      loading: 'Signing out...',
      success: 'Signed out successfully',
      error: 'Error while signing out',
    });

    try {
      await promise;
      router.refresh(); 
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
    }
  };
  return (
    <header className="absolute top-0 text-white p-4 z-30 w-full">
   <div className="p-2 z-30 mx-auto flex items-center justify-between bg-transparent">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-lg font-bold text-primary-foreground">F0</span>
      </Link>
      <nav className=" gap-1 flex items-center text-blue-900/80 bg-primary-900 backdrop-blur-3xl px-2 py-1 rounded-xl">
        <svg fill="none" viewBox="0 0 16 16" width="16" height="16">
          <path stroke="currentColor" d="M6.833 2C6.368 4.356 6.365 4.356 4 4.833M6.833 2c.47 2.363.473 2.366 2.834 2.833M6.833 2v5.667m2.834-2.834c-2.36.468-2.36.472-2.834 2.834m2.834-2.834H4m2.833 2.834C6.365 5.3 6.358 5.3 4 4.833m0 4.834c-.328 1.663-.33 1.663-2 2m2-2c.332 1.668.334 1.67 2 2m-2-2v4m2-2c-1.666.33-1.666.332-2 2m2-2H2m2 2c-.33-1.67-.336-1.67-2-2m9.667-4.334c-.383 1.94-.386 1.94-2.334 2.334m2.334-2.334c.386 1.946.39 1.949 2.333 2.334m-2.333-2.334V12M14 9.667c-1.944.385-1.944.388-2.333 2.333M14 9.667H9.333M11.667 12c-.386-1.948-.392-1.948-2.334-2.333" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
        <span className='text-xs md:text-sm font-bold'>Welcome</span>
      </nav>
      
     {user ?
     
     <Menu as="div" className="relative">
    <MenuButton>
      <Image
        width={40}
        height={40}
        src={user?.pic ? user?.pic : 'https://placewaifu.com/image/50'}
        alt="user"
        className="rounded-full bg-neutral-500 border border-primary-600"
      />
    </MenuButton>

    <MenuItems className="flex gap-2 flex-col [&>*]:w-full absolute right-0 mt-2 w-56 md:w-72 bg-white text-black  rounded-3xl p-2 shadow-lg z-50 shadow-md shadow-black/50">
      <MenuItem as='div' className={`flex rounded-3xl justify-between items-center p-2 md:p-4 w-full truncate bg-primary-950`}>
      <div className='flex items-center gap-2'>
            <div className='w-fit relative'>
            <Image
              width={40}
              height={40}
              className="rounded-full  bg-neutral-500 "
              src={user?.pic ? user?.pic : 'https://placewaifu.com/image/50'}
              alt="User avatar"
            />
             <div className='flex justify-center items-center absolute -bottom-0.5 -left-1 bg-primary-950 rounded-full w-4 h-4 text-xs'>

            { !/@/.test(user?.username)?
             <Github size='12' strokeWidth={2} fill='white'/>
 
             :
             <Check size='12'/>

            }
             </div>
           
            </div>
              <p className="text-sm font-semibold truncate">{user?.username}</p>
              </div>
              <span className="relative flex h-3 w-3">
  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
  <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
</span>
            
      </MenuItem>

      <MenuItem>
      <Suspense fallback={
        <div className='flex justify-center w-full items-center'>
          <LoadingDots/>
        </div>
      }>
      <Plans triggerClassName=' px-4 py-2 rounded-3xl text-sm bg-black text-white hover:bg-primary-200 w-full' triggerText='Manage Plans'/>

      </Suspense>
      </MenuItem>

      <MenuItem>
      <button
       onClick={handleSignOut}
       className={`font-semibold block px-4 py-2 text-sm rounded-3xl hover:bg-red-600 bg-red-700 text-white`}
       role="menuitem"
       tabIndex={-1}
       id="sign-out"
     >
       Log out
     </button>
     
      </MenuItem>
    </MenuItems>
  </Menu>
  :
    <Link className='bg-neutral-100 text-center block px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm rounded-3xl hover:bg-neutral-200 text-black font-semibold' href="/join">Login</Link>
  }
  
    </div>
  </header>
  
  )
}
