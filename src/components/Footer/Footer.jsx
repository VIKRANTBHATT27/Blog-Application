import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <section className="relative overflow-hidden py-5 bg-gray-400 border border-t-2 border-t-black">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-4 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <Logo width="100px" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    &copy; Copyright 2026. All Rights Reserved by <a href='https://github.com/VIKRANTBHATT27/' target='_blank' className='text-blue-600 hover:underline'>Vikrant</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-4 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-2 text-base font-semibold uppercase text-black relative right-1">
                                Company
                            </h3>
                            <ul>
                                <li className="mb-1">
                                    <Link
                                        className=" text-sm font-medium text-gray-700 hover:text-gray-900"
                                        to="/"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link
                                        className=" text-sm font-medium text-gray-700 hover:text-gray-900"
                                        to="/"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link
                                        className=" text-sm font-medium text-gray-700 hover:text-gray-900"
                                        to="/"
                                    >
                                        Affiliate Program
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-sm font-medium text-gray-700 hover:text-gray-900"
                                        to="/"
                                    >
                                        Press Kit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-4 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-2 text-base font-semibold uppercase text-black relative right-1">
                                Support
                            </h3>
                            <ul>
                                <li className="mb-1">
                                    <Link
                                        className=" text-sm font-medium text-gray-700 hover:text-gray-900"
                                        to="/"
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link
                                        className=" text-sm font-medium text-gray-700 hover:text-gray-900"
                                        to="/"
                                    >
                                        Help
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link
                                        className=" text-sm font-medium text-gray-700 hover:text-gray-900"
                                        to="/"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-sm font-medium text-gray-700 hover:text-gray-900"
                                        to="/"
                                    >
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-4 md:w-1/2 lg:w-3/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-2 text-base font-semibold uppercase text-black relative right-1">
                                Legals
                            </h3>
                            <ul>
                                <li className="mb-1">
                                    <Link
                                        className=" text-sm font-medium text-gray-700 hover:text-gray-900"
                                        to="/"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link
                                        className=" text-sm font-medium text-gray-700 hover:text-gray-900"
                                        to="/"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-sm font-medium text-gray-700 hover:text-gray-900"
                                        to="/"
                                    >
                                        Licensing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Footer