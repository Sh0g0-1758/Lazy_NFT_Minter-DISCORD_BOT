# Lazy_NFT_Minter-DISCORD_BOT
A bot that mints an NFT for images provided and sends the transaction details in the form of a url

# How it works

The bot listens to messages on a server. If a message abides by the following norms :-

1. Name of the artwork
2. Description of the artwork
3. the artwork

Then the bot creates a metadata object to be sent via pinata API (To make it decentrialized) to get the hash code. The hash code is then sent to a mintNFT function which
mints an NFT and returns the transaction hash. The bot then uses the transaction hash to generate a URL to the NFT and then replies with that url on the server. 
We use the Goerli test network, Ethereum and Alchemy for the transactions. 

# Bot in Action :)

starting the bot !
![Screenshot (58)](https://user-images.githubusercontent.com/114918019/224541172-d96a7d1b-c0c3-4ae8-a7ff-1cfdc88d32b0.png)

sending the name and description of the artwork !

![Screenshot (60)](https://user-images.githubusercontent.com/114918019/224541207-0824db76-d593-4982-9c5b-4de29d9bb7e6.png)

The etherscan webpage showing the sucess of the transaction !!!

![Screenshot (61)](https://user-images.githubusercontent.com/114918019/224541237-c58d9426-b57f-44c1-a9ad-e745933da9b9.png)
