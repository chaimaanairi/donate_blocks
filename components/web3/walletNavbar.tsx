/* eslint-disable @next/next/no-img-element */

import { Menu } from "@headlessui/react";
import Link from "next/link";
import React from "react";
import { FunctionComponent } from "react";

type WalletbarProps = {
  isLoading: boolean;
  isInstalled: boolean;
  account: string | undefined;
  connect: () => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Walletbar: FunctionComponent<WalletbarProps> = ({
  isInstalled,
  isLoading,
  connect,
  account
}) => {

  if (isLoading) {
    return (
      <div>
        <button
          onClick={() => {}}
          type="button"
          className="ml-2 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green hover:scale-105"
        >
          Loading ...
        </button>
      </div>
    )
  }

  if (account) {
    return (
      <Menu as="div" className="ml-3 relative">

        <Menu as="div" className="ml-3 relative z-10">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="images/userProfile.png"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  
                    <Menu.Item>
                    {({ active }) => (
                    <Link legacyBehavior href="/ProfilePage">
                          <a
                            className={classNames(active ? 'bg-gray-100' : '', ' hover:bg-gray-200 block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        </Link>
                        )}
                    </Menu.Item>

                    <Menu.Item>
                    {({ active }) => (
                    <Link legacyBehavior href="/studentPage">
                          <a
                            className={classNames(active ? 'bg-gray-100' : '', 'hover:bg-gray-200 block px-4 py-2 text-sm text-gray-700')}
                          >
                            Student page
                          </a>
                        </Link>
                        )}
                    </Menu.Item>

                    <Menu.Item>
                    {({ active }) => (
                    <Link legacyBehavior href="/teacherPage">
                          <a
                            className={classNames(active ? 'bg-gray-100' : '', 'hover:bg-gray-200 block px-4 py-2 text-sm text-gray-700')}
                          >
                            Teacher page
                          </a>
                        </Link>
                        )}
                    </Menu.Item>

                  </Menu.Items>
                </Menu>
        
      </Menu>
    )
  }

  if (isInstalled) {
    return (
      <div>
        <button
          onClick={() => {
            connect()
          }}
          type="button"
          className="ml-2 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green hover:scale-105"
        >
          Connect Wallet
        </button>
      </div>
    )
  } else {
    return (
      <div>
        <button
          onClick={() => {
            window.open ('https://metamask.io', '_ blank');
          }}
          type="button"
          className="ml-2 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green hover:scale-105"
        >
          install metamask
        </button>
      </div>
    )
  }
}

export default Walletbar;