'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function CheckoutForm() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted');

        // Call the payment API
        try {
            setLoading(true);
            const res = await fetch('/api/payment', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            console.log('Payment response', data);
            window.open(data.GatewayPageURL, '_self');
        } catch (error) {
            console.error('Payment failed', error);
        } finally {
            setLoading(false);
        }
    };

    const payNow = (option: any) => {
        console.log('Pay now', option);
        window.open(option.redirectGatewayURL);
    };

    return (
        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-30 xl:px-40">
            <div className="px-4 pt-8">
                <p className="text-xl font-medium">Order Summary</p>
                <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
                <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                    <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                        <Image
                            className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                            src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                            alt="Product"
                            width={500}
                            height={400}
                            priority={true}
                        />
                        <div className="flex w-full flex-col px-4 py-4">
                            <span className="font-semibold">Nike Air Max Pro 8888 - Super Light</span>
                            <span className="float-right text-gray-400">42EU - 8.5US</span>
                            <p className="text-lg font-bold">$138.99</p>
                        </div>
                    </div>
                    <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                        <Image
                            className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                            src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                            alt="Product"
                            width={500}
                            height={400}
                            priority={true}
                        />
                        <div className="flex w-full flex-col px-4 py-4">
                            <span className="font-semibold">Nike Air Max Pro 8888 - Super Light</span>
                            <span className="float-right text-gray-400">42EU - 8.5US</span>
                            <p className="mt-auto text-lg font-bold">$238.99</p>
                        </div>
                    </div>
                </div>

                <p className="mt-8 text-lg font-medium">Shipping Methods</p>
                <div className="mt-5 grid gap-6">
                    <div className="relative">
                        <input className="peer hidden" id="radio_1" type="radio" name="radio" defaultChecked />
                        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                        <label
                            className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                            htmlFor="radio_1">
                            <Image
                                className="w-14 object-contain"
                                src="/images/naorrAeygcJzX0SyNI4Y0.png"
                                alt="dlv option"
                                width={56}
                                height={48}
                            />
                            <div className="ml-5">
                                <span className="mt-2 font-semibold">Fedex Delivery</span>
                                <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
                            </div>
                        </label>
                    </div>
                    <div className="relative">
                        <input className="peer hidden" id="radio_2" type="radio" name="radio" defaultChecked />
                        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                        <label
                            className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                            htmlFor="radio_2">
                            <Image
                                className="w-14 object-contain"
                                src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                                alt="dlv option"
                                width={56}
                                height={48}
                            />
                            <div className="ml-5">
                                <span className="mt-2 font-semibold">Fedex Delivery</span>
                                <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            {loading && (
                <div className="z-10 duration-300 absolute inset-0 w-full h-screen flex items-center justify-center backdrop-blur-sm bg-white/20">
                    <svg
                        aria-hidden="true"
                        className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                </div>
            )}
            <form onSubmit={handleSubmit} className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                <p className="text-xl font-medium">Payment Details</p>
                <p className="text-gray-400">Complete your order by providing your payment details.</p>

                <div>
                    <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">
                        Email
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="email"
                            name="email"
                            className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="your.email@gmail.com"
                        />
                        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                />
                            </svg>
                        </div>
                    </div>
                    <label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium">
                        Card Holder
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="card-holder"
                            name="card-holder"
                            className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Your full name here"
                        />
                        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                                />
                            </svg>
                        </div>
                    </div>
                    <label htmlFor="card-no" className="mt-4 mb-2 block text-sm font-medium">
                        Card Details
                    </label>
                    <div className="flex">
                        <div className="relative w-7/12 flex-shrink-0">
                            <input
                                type="text"
                                id="card-no"
                                name="card-no"
                                className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="xxxx-xxxx-xxxx-xxxx"
                            />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                <svg
                                    className="h-4 w-4 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16">
                                    <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                                    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                                </svg>
                            </div>
                        </div>
                        <input
                            type="text"
                            name="credit-expiry"
                            className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="MM/YY"
                        />
                        <input
                            type="text"
                            name="credit-cvc"
                            className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="CVC"
                        />
                    </div>
                    <label htmlFor="billing-address" className="mt-4 mb-2 block text-sm font-medium">
                        Billing Address
                    </label>
                    <div className="flex flex-col sm:flex-row">
                        <div className="relative flex-shrink-0 sm:w-7/12">
                            <input
                                type="text"
                                id="billing-address"
                                name="billing-address"
                                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Street Address"
                            />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                <Image
                                    className="h-4 w-4 object-contain"
                                    src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
                                    alt="flag"
                                    width={16}
                                    height={16}
                                />
                            </div>
                        </div>
                        <select
                            name="billing-state"
                            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
                            <option value="State">State</option>
                        </select>
                        <input
                            type="text"
                            name="billing-zip"
                            className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="ZIP"
                        />
                    </div>

                    {/* <!-- Total --> */}
                    <div className="mt-6 border-t border-b py-2">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Subtotal</p>
                            <p className="font-semibold text-gray-900">$399.00</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Shipping</p>
                            <p className="font-semibold text-gray-900">$8.00</p>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Total</p>
                        <p className="text-2xl font-semibold text-gray-900">$408.00</p>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 mb-8 w-full px-6 py-3 font-medium text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-sm text-center uppercase">
                    Place Order
                </button>
            </form>
        </div>
    );
}
