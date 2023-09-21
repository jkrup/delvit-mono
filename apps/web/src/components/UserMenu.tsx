import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import hstkLogoUrl from "../imgs/hstk-logo.png";
import { trpc } from "../utils/trpc";
import { signOut } from "next-auth/react"

const userOptions = {
  options: [
    {
      id: "profile",
      name: "My Profile",
      href: "/profile",
    },
    // {
    //   id: "saved",
    //   name: "Saved",
    //   href: "#",
    // },
    // {
    //   id: "history",
    //   name: "History",
    //   href: "#",
    // },
    // {
    //   id: "drafts",
    //   name: "Drafts",
    //   href: "#",
    // },
    // {
    //   id: "settings",
    //   name: "Settings",
    //   href: "#",
    // },
    {
      id: "schellings",
      name: "Schellings",
      href: "/about",
    },
  ],
};

const UserMenu = () => {
  const [open, setOpen] = useState(true);

  const avatarData = trpc.useQuery(["auth.getAvatar"]);

  const avatar = avatarData.data || "/noavatar.png";

  return (
      <div className='flex justify-items-end'>
          <div className={`duration-300`} onClick={() => setOpen(!open)}>
              <div>
                  <Image
                      alt='Profile Avatar'
                      className={`rounded-full mx-4 cursor-pointer ${open ? '' : ''} duration-500`}
                      width={64}
                      height={64}
                      src={avatar}
                  />
              </div>
              <ul
                  className={`absolute top-24 right-0 xl:right-auto text-yellow-400 ${
                      open ? 'hidden' : 'bg-gradient-to-b from-black via-black to-neutral-700'
                  }`}
              >
                  {userOptions.options.map((option) => (
                      <li key={option.id}>
                          <a href={option.href}>
                              <button className='w-64 hover:bg-neutral-700 border-b border-dotted border-yellow-500 pt-3 pl-5 py-2 text-left duration-300'>
                                  {option.name}
                              </button>
                          </a>
                      </li>
                  ))}

                  <li>
                      <a href={'#'} onClick={() =>
                          signOut({
                              callbackUrl: '/',
                          })
                      }>
                          <button className='w-64 hover:bg-neutral-700 border-b border-dotted border-yellow-500 pt-3 pl-5 py-2 text-left duration-300'>
                              Signout
                          </button>
                      </a>
                  </li>

                  <div className='flex items-center justify-center pt-24 pb-3'>
                      <Link href='/'>

                          <Image
                              alt='Delvit Logo'
                              className='cursor-pointer rounded-full mx-4 h-[64px] w-[64px]'
                              src={hstkLogoUrl}
                          />

                      </Link>
                  </div>
                  <div className='bg-neutral-800 text-center text-white p-3'> © Delvit 2023 </div>
              </ul>
          </div>
      </div>
  );
};

export default UserMenu;
