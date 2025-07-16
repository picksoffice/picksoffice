'use client'

import { useState } from 'react'
import * as Headless from '@headlessui/react'
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/AuthContext'

const navigation = [
  { 
    name: 'Picks', 
    href: '/picks',
    dropdown: [
      { name: 'NBA', href: '/picks?league=NBA', icon: '🏀' },
      { name: 'NFL', href: '/picks?league=NFL', icon: '🏈' },
      { name: 'MLB', href: '/picks?league=MLB', icon: '⚾' },
      { name: 'NHL', href: '/picks?league=NHL', icon: '🏒' },
      { name: 'NCAAB', href: '/picks?league=NCAAB', icon: '🏀' },
      { name: 'NCAAF', href: '/picks?league=NCAAF', icon: '🏈' }
    ]
  },
  { name: 'Statistics', href: '/statistics' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <header>
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">PicksOffice</span>
            <img 
              src="/picksoffice-logo.svg?v=1" 
              alt="PicksOffice" 
              className="h-7"
              style={{ width: 'auto' }} 
            />
          </Link>
        </div>
        <div className="flex items-center gap-3 lg:hidden">
          {user ? (
            <button
              type="button"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="text-sky-300 hover:text-indigo-300 bg-slate-800/50 px-3 py-1.5 rounded-lg text-xs inline-flex items-center transition-all"
            >
              <UserCircleIcon className="h-4 w-4 mr-1" />
              {user.username.split('_')[0]}
            </button>
          ) : (
            <Link 
              href="/login" 
              className="text-sky-300 hover:text-indigo-300 bg-slate-800/50 px-3 py-1.5 rounded-lg text-xs inline-flex items-center transition-all"
            >
              Log in
            </Link>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            item.dropdown ? (
              <div className="relative group" key={item.name}>
                <Link 
                  href={item.href}
                  className={`text-sm/6 font-semibold px-3.5 py-2 rounded-lg transition-all inline-flex items-center ${
                    pathname.startsWith(item.href) 
                      ? 'text-sky-300 bg-slate-800/50' 
                      : 'text-gray-100 hover:text-sky-300 hover:bg-slate-800/50'
                  }`}
                >
                  <span className="flex items-center">
                    {item.name}
                    <svg 
                      className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 9l-7 7-7-7" 
                      />
                    </svg>
                  </span>
                </Link>
                <div className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-lg bg-slate-900 overflow-hidden shadow-xl ring-1 ring-gray-700 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform -translate-y-2 group-hover:translate-y-0">
                  <div className="py-1.5">
                    <p className="px-4 py-1.5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Leagues
                    </p>
                  </div>
                  <div className="border-t border-gray-700">
                    {item.dropdown.map((dropdownItem, index) => (
                      <Link
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className={`hover:bg-slate-800/70 hover:text-sky-300 text-gray-200 flex items-center px-4 py-3 text-sm ${
                          index !== item.dropdown.length - 1 ? 'border-b border-gray-800/50' : ''
                        }`}
                      >
                        <span className="text-lg mr-3 flex items-center justify-center w-6">{dropdownItem.icon}</span>
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link 
                key={item.name} 
                href={item.href} 
                className={`text-sm/6 font-semibold px-3 py-2 rounded-lg transition-all ${
                  pathname === item.href 
                    ? 'text-sky-300 bg-slate-800/50' 
                    : 'text-gray-100 hover:text-sky-300 hover:bg-slate-800/50'
                }`}
              >
                {item.name}
              </Link>
            )
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user ? (
            <Headless.Menu as="div" className="relative">
              <Headless.MenuButton className="text-sky-300 hover:text-indigo-300 bg-slate-800/50 px-4 sm:px-5 py-2 rounded-lg text-sm inline-flex items-center transition-all">
                <UserCircleIcon className="h-5 w-5 mr-2" />
                {user.username.split('_')[0]}
              </Headless.MenuButton>
              <Headless.MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-slate-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Headless.MenuItem>
                  {({ active }) => (
                    <Link
                      href="/dashboard"
                      className={`${
                        active ? 'bg-slate-800 text-sky-300' : 'text-gray-200'
                      } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                    >
                      Dashboard
                    </Link>
                  )}
                </Headless.MenuItem>
                <Headless.MenuItem>
                  {({ active }) => (
                    <button
                      onClick={() => logout()}
                      className={`${
                        active ? 'bg-slate-800 text-sky-300' : 'text-gray-200'
                      } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                    >
                      Sign out
                    </button>
                  )}
                </Headless.MenuItem>
              </Headless.MenuItems>
            </Headless.Menu>
          ) : (
            <Link 
              href="/login" 
              className="text-sky-300 hover:text-indigo-300 bg-slate-800/50 px-4 sm:px-5 py-2 rounded-lg text-sm inline-flex items-center transition-all"
            >
              Log in
            </Link>
          )}
        </div>
      </nav>
      <Headless.Dialog 
        as="div"
        open={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <Headless.DialogBackdrop
          className="fixed inset-0 z-50 bg-gray-900 bg-opacity-75 transition-opacity"
        />
        <Headless.DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-slate-950 dark:bg-slate-950 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">PicksOffice</span>
              <img 
                src="/picksoffice-logo.svg?v=1" 
                alt="PicksOffice" 
                className="h-7"
                style={{ width: 'auto' }} 
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-200"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/30">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold ${
                      pathname.startsWith(item.href) 
                        ? 'text-sky-300 bg-gray-800/50' 
                        : 'text-gray-100 hover:bg-gray-800/50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-100 hover:bg-gray-800/50"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left rounded-lg px-3 py-2.5 text-base font-semibold text-gray-100 hover:bg-gray-800/50 mt-2"
                    >
                      Sign out ({user.username})
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-left rounded-lg px-3 py-2.5 text-base font-semibold text-sky-300 hover:bg-gray-800/50"
                  >
                    Log in / Register
                  </Link>
                )}
                <div className="mt-6 px-3">
                  <a href="https://bet105.com/picksoffice" target="_blank" rel="noopener noreferrer">
                    <img 
                      src="/images/bet105_300x250.gif" 
                      alt="Bet105" 
                      className="w-full rounded-lg shadow-lg" 
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Headless.DialogPanel>
      </Headless.Dialog>
    </header>
  )
}