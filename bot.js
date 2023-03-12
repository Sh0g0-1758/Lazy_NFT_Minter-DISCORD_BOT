require("dotenv").config();
const { Client, GatewayIntentBits } = require('discord.js');
const { pinJSONToIPFS } = require("./pinata.js");
const { mintNFT } = require("./scripts/nft.js")

const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
    ] 
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if(message.author.bot) {
        return;
    }
    let attchements = message.attachments;
    let arr = message.content.split('\n');
    let name;
    let description;

    if (arr.length === 2) {
        name = arr[0];
        description = arr[1];
    }

    if(message.attachments.size != 0) {
        attchements.forEach(async (e) => {
            console.log(e.url);
            if (e.url.trim() == '' || name.trim() == '' || description.trim() == '') {
                return {
                    success: false,
                    status: 'Dont forget to give a name and description as well !',
                };
            }
            const metadata = new Object();
            metadata.name = name;
            metadata.image = e.url;
            metadata.description = description;
        
            const pinataResponse = await pinJSONToIPFS(metadata);
            if (!pinataResponse.success) {
                return {
                    success: false,
                    status: 'Something went wrong while uploading your tokenURI.',
                };
            }
            const tokenURI = pinataResponse.hash;
            let hash = mintNFT(tokenURI);
            if(hash === "err") {
                await message.reply("there was some error executing the transaction !!")
            } else {
                await message.reply("the transaction was successful ! click the link to check the transaction details " + `https://goerli.etherscan.io/tx/${hash}`)
            }
        })
    }
})

client.login(process.env.TOKEN);