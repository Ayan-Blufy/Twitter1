import React, { useState, useEffect } from 'react'
import Avatar from 'react-avatar';
import {
    ChartBarIcon,
    ChatIcon,
    DotsHorizontalIcon,
    HeartIcon,
    ShareIcon,
    SwitchHorizontalIcon,
    TrashIcon,
} from "@heroicons/react/outline";
import {
    HeartIcon as HeartIconFilled,
    ChatIcon as ChatIconFilled,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Twitter from '../artifacts/contracts/Twitter.sol/TwitterContract.json';
import { ethers } from 'ethers';

const Post = ({ account, userid, username, text, isDel }) => {

    const [post, setPost] = useState(true);

    const deleteTweets = async (id) => {

        try {

            const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
            const signer = provider.getSigner();

            const contract = new ethers.Contract(process.env.NEXT_PUBLIC_ADDRESS, Twitter.abi, signer);

            const transaction = await contract.deleteTweet(id);

            await transaction.wait();

        } catch (err) {
            console.log(err);
        }

    }


    const router = useRouter();

    // useEffect(



    return (


        <div
            className="p-3 flex cursor-pointer border-b border-gray-700"

        >

            <div className="flex flex-col space-y-2 w-full">
                <div className={`flex ${!post && "justify-between"}`}>
                    {post && (
                        <Avatar name={username} className='rounded-full w-[1px] h-[1px] mr-4' size='50' />
                    )}
                    <div className="text-[#6e767d]">
                        <div className="inline-block group">

                            <h2
                                className={`text-sm sm:text-[15px] ${post && "ml-1.5"}`}
                            >
                                @{username}
                            </h2>
                        </div>

                        {post && (
                            <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">
                                {text}
                            </p>
                        )}
                    </div>
                    <div className="icon group flex-shrink-0 ml-auto">
                        <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
                    </div>
                </div>


                <div
                    className={`text-[#6e767d] flex justify-between w-10/12 ${post && "mx-auto"
                        }`}
                >
                    <div
                        className="flex items-center space-x-1 group"

                    >
                        <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
                            <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
                        </div>

                    </div>

                    {account === username.toLowerCase() ? (
                        <div
                            className="flex items-center space-x-1 group"

                        >
                            <div className="icon group-hover:bg-red-600/10" onClick={() => deleteTweets(userid)}>
                                <TrashIcon className="h-5 group-hover:text-red-600" />
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-1 group">
                            <div className="icon group-hover:bg-green-500/10">
                                <SwitchHorizontalIcon className="h-5 group-hover:text-green-500" />
                            </div>
                        </div>
                    )}

                    <div
                        className="flex items-center space-x-1 group"

                    >
                        <div className="icon group-hover:bg-pink-600/10"  >

                            <HeartIcon className="h-5 group-hover:text-pink-600" />

                        </div>

                    </div>

                    <div className="icon group">
                        <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
                    </div>
                    <div className="icon group">
                        <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
