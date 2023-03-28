/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from "next/router"
import Logo from "../public/images/logo.png";
import Image from 'next/image'

//import {useAccount, useNetwork} from "../../hooks/useHooks";

import ActiveLink from "./link"
import Wallet from './wallet';


const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "All donationEvents", href: "/allDonationEvent", current: false },
  { name: "Create a doantionEvent", href: "/createDonationEvent", current: false },
];
 
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(' ');
}


export default function Navbar() {
 

  return (
    <section className='mb-20'>
  
    <Disclosure as="nav" className="bg-[#6AA4B0] fixed top-0 left-0 right-0 z-10 ">
      {({ open }) => (
        <>
          <div className=" mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-20 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-shrink-0 items-center">
                <div className="flex flex-row pointer-events-none mr-10 p-10 ">
                  <Image alt="bt" src={Logo} width={90} height={90} objectFit="cover" />
                  <h1 className='hidden lg:block'> DonateBlocks</h1>
                </div>
              </div>
                
                <div className="hidden lg:ml-6 lg:block">
                <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <ActiveLink 
                        key={item.name}
                        href={item.href}
                        activeclass="bg-gray-900 text-white"
                      >
                        <a
                          className="text-gray-200 hover:bg-gray-200 hover:text-black px-4 py-3 rounded-md text-sm font-medium"
                          aria-current={item.current ? 'page' : undefined}                        >
                          {item.name}
                        </a>
                      </ActiveLink>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {/* metamask install */}               
                <button
                  type="button"
                  className="inline-flex items-center rounded-2xl bg-white text-black px-2 py-1 text-sm font-medium"
                > 
                <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-gray-500" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx={4} cy={4} r={3} />
                </svg>
                  
                </button>
                
                <Wallet/>
                
                {/* metamask button end */}


                {/* Profile dropdown */}
           
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
   
      </section>
  )
}