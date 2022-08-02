import React, { useEffect, useState } from 'react'
import { SparklesIcon } from "@heroicons/react/outline";
import Input from './Input'
import Post from './Post'
import Twitter from '../artifacts/contracts/Twitter.sol/TwitterContract.json';
import { ethers } from 'ethers';
const Feed = ({account}) => {


    const [Tweets,setTweets]=useState([]);
    useEffect(()=>{
        async function solve(){
            const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/Mms5JBh6CuGHR5ei0EDwNYAJo1xXgPMW");

            const contract = new ethers.Contract(process.env.NEXT_PUBLIC_ADDRESS, Twitter.abi, provider);


            const Tweets = await contract.getAllTweets();


            const ans = Tweets.map((ele, i) => {

                return {
                    id: parseInt(ele.id),
                    username: ele?.username,
                    tweetText: ele?.tweetText,
                    isDeleted: ele?.isDeleted
                }
            })
            setTweets(ans);
        }
        solve();


    },[Tweets])

   
    
    return (
        <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
            <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-700">
                <h2 className="text-lg sm:text-xl font-bold">Home</h2>
                <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto">
                    <SparklesIcon className="h-5 text-white" />
                </div>
            </div>
            <Input/>

            <div className="pb-72">
                {
                    Tweets?.map((ele,i)=>
                        <Post account={account} userid={ele.id} username={ele.username} text={ele.tweetText} isDel={ele.isDeleted} key={i}/>
                    )
                }
           
             
            </div>
        </div>

    )
}

export default Feed
