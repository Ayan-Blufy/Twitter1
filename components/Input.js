import { XIcon } from '@heroicons/react/solid';
import React, { useState, useRef } from 'react'
import {
    CalendarIcon,
    ChartBarIcon,
    EmojiHappyIcon,
    PhotographIcon,

} from "@heroicons/react/outline";
import Image from "next/image";
import logo from '../assets/logoa.png';
import { ethers } from 'ethers';
import Twitter from '../artifacts/contracts/Twitter.sol/TwitterContract.json';
import Avatar from 'react-avatar';

const Input = () => {
    const [input, setInput] = useState();
 
    const [Loading, setLoading] = useState(false);
    const addImageTopost = (e) => {
      

    }
   

    const sendPost = async () => {

        try{

            setLoading(true);
            const provider=new ethers.providers.Web3Provider(window.ethereum,'any');
            const signer=provider.getSigner();

            const contract = new ethers.Contract(process.env.NEXT_PUBLIC_ADDRESS,Twitter.abi,signer);

            const transaction=await contract.addTweet(input,false);

            await transaction.wait();

            setInput('');
            setLoading(false);



        }catch(err)
        {
            console.log(err);
        }
    }





    return (
        <>
            <div className={`border-b border-gray-700 p-3 flex space-x-3  overflow-y-scroll scrollbar-hide ${Loading && "opacity-60"
                }`}>
                
                <Avatar name="Twitter" className='h-11 w-11 rounded-full cursor-pointer' size='50' />
                <div className="divide-y divide-gray-700 w-full">


                    <div className={` ${input && "space-y-2.5"}`}>

                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="What's happening?"
                            rows="2"
                            className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 scrollbar-hide tracking-wide w-full min-h-[50px]"
                        />

                       

                    </div>

                    {!Loading && (
                        <div className="flex items-center justify-between pt-2.5">
                            <div className="flex items-center">

                                <div className="icon" >
                                    <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
                                    <input type="file" hidden  />
                                </div>
                                <div className="icon rotate-90">
                                    <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
                                </div>

                                <div className="icon" >
                                    <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
                                </div>

                                <div className="icon">
                                    <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
                                </div>

                               
                            </div>
                            <button
                                className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                                disabled={!input}
                                onClick={sendPost}
                            >
                                Tweet
                            </button>
                        </div>

                    )}


                </div>
            </div>
        </>
    )
}

export default Input
