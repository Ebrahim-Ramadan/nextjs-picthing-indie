import { GithubIcon } from 'lucide-react'
import Image from 'next/image'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
export const Header = ({user}) => {
  return (
    <header className="absolute top-0 text-white p-4 z-30 w-full">
   <div className="p-2 z-30 mx-auto flex items-center justify-between bg-transparent">
      <a href="/" className="flex items-center gap-2">
        <span className="text-lg font-bold text-primary-foreground">F0</span>
      </a>
      <nav className=" gap-1 flex items-center text-[#006B78] bg-primary-900 backdrop-blur-3xl px-2 py-1 rounded-xl">
        <svg fill="none" viewBox="0 0 16 16" width="16" height="16">
          <path stroke="currentColor" d="M6.833 2C6.368 4.356 6.365 4.356 4 4.833M6.833 2c.47 2.363.473 2.366 2.834 2.833M6.833 2v5.667m2.834-2.834c-2.36.468-2.36.472-2.834 2.834m2.834-2.834H4m2.833 2.834C6.365 5.3 6.358 5.3 4 4.833m0 4.834c-.328 1.663-.33 1.663-2 2m2-2c.332 1.668.334 1.67 2 2m-2-2v4m2-2c-1.666.33-1.666.332-2 2m2-2H2m2 2c-.33-1.67-.336-1.67-2-2m9.667-4.334c-.383 1.94-.386 1.94-2.334 2.334m2.334-2.334c.386 1.946.39 1.949 2.333 2.334m-2.333-2.334V12M14 9.667c-1.944.385-1.944.388-2.333 2.333M14 9.667H9.333M11.667 12c-.386-1.948-.392-1.948-2.334-2.333" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
        <span className='text-xs md:text-sm font-bold'>Welcome</span>
      </nav>
      
      <Menu as="div" className="relative">
    <MenuButton>
      <Image
        width={40}
        height={40}
        src={user?.pic ? user?.pic : 'https://placewaifu.com/image/50'}
        alt="user"
        className="rounded-full bg-primary-300"
      />
    </MenuButton>

    <MenuItems className="absolute right-0 mt-2 w-56 md:w-72 bg-white text-black rounded-lg p-2 shadow-lg z-50">
      <MenuItem>
      <div className={`flex items-center p-2 md:p-4 w-fit truncate`}>
            <img
              className="rounded-full w-8 h-8 bg-neutral-500 mr-2"
              src="https://placewaifu.com/image/50"
              alt="User avatar"
            />
            <div>
              <p className="text-sm font-semibold">Ebrahim Ramadan</p>
              <p className="text-xs text-primary-100 truncate">ramadanebrahim791@gmail.com</p>
            </div>
          </div>
      </MenuItem>

      <MenuItem>
      <a
            href="#"
            className={`block px-4 py-2 text-sm rounded-xl hover:bg-neutral-200`}
            role="menuitem"
            tabIndex="-1"
            id="manage-account"
          >
            Manage account
          </a>
      </MenuItem>

      <MenuItem>
      <a
            href="#"
            className={`block px-4 py-2 text-sm rounded-xl hover:bg-red-400`}
            role="menuitem"
            tabIndex="-1"
            id="sign-out"
          >
            Sign out
          </a>
      </MenuItem>
    </MenuItems>
  </Menu>
  
    </div>
  </header>
  
  )
}
