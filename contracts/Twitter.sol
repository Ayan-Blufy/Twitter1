 //SPDX-License-Identifier: UNLICENSED
 pragma solidity >= 0.5.0 < 0.9.0;

 contract TwitterContract{


    event AddTweet(address indexed recipient,uint tweetId);
     event DeleteTweet(uint tweetId, bool isDeleted);
    struct Tweet{
        uint id;
        address username;
        string tweetText;
        bool isDeleted;
    }


    Tweet[] private tweets;
    mapping(uint=>address) tweetToOwner;
    

    function addTweet(string memory tweetText,bool isDeleted) external{
        uint tweetId=tweets.length;
        tweets.push(Tweet(tweetId,msg.sender,tweetText,isDeleted));
        tweetToOwner[tweetId]=msg.sender;
        emit AddTweet(msg.sender,tweetId);

    }

    function getAllTweets() external view returns (Tweet[] memory)
    {
             Tweet[] memory temporary = new Tweet[](tweets.length);
        uint counter=0;
        for(uint i=0;i<tweets.length;i++)
        {
            if(tweets[i].isDeleted==false)
            {
                temporary[counter]=tweets[i];
                counter++;
            }
        }

         Tweet[] memory result = new Tweet[](counter);
        for(uint i=0; i<counter; i++) {
            result[i] = temporary[i];
        }
        return result;


    }

    function deleteTweet(uint tweetId) external{
        if(tweetToOwner[tweetId]==msg.sender)
        {
            tweets[tweetId].isDeleted=true;
            emit DeleteTweet(tweetId,true);
        }
    }


 }