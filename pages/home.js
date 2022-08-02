import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Widgets from '../components/Widgets';
import { ethers } from 'ethers';
import Twitter from '../artifacts/contracts/Twitter.sol/TwitterContract.json';
import { useRouter } from 'next/router';
const Home = ({ trendingResults, followResults, ans }) => {
    const [account, setAccount] = useState();
    const router = useRouter();
    const checkConnection = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            setAccount(accounts[0]);

        } catch (err) {
            console.log(err);
        }
    }

  


    useEffect(() => {


        checkConnection();
        window.ethereum.on('accountsChanged', (account) => {
            setAccount(account);
        })


    }, [account])


    return (
        <>
            <div className="bg-black min-h-screen flex max-w-[1500px] mx-auto">

                
                        <Sidebar account={account} />
                        <Feed account={account} Tweets={ans} />
                        <Widgets
                            trendingResults={trendingResults}
                            followResults={followResults}
                        />

                    
                

            </div>
        </>
    )
}

export default Home
export async function getStaticProps() {
    // // Check if the user is authenticated on the server...
    const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
        (res) => res.json()
    );
    const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
        (res) => res.json()
    );


    const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/Mms5JBh6CuGHR5ei0EDwNYAJo1xXgPMW");

    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, Twitter.abi, provider);


    const Tweets = await contract.getAllTweets();


    const ans = Tweets.map((ele, i) => {

        return {
            id: parseInt(ele.id),
            username: ele?.username,
            tweetText: ele?.tweetText,
            isDeleted: ele?.isDeleted
        }
    })




    return {
        props: {

            trendingResults,
            followResults,
            ans

        }
    }
}




