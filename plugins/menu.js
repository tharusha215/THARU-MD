const os = require('os');
const { cmd, commands } = require('../command');
const config = require('../config');
const { prefix } = require('../index');
const { runtime } = require('../lib/functions');

cmd({
    pattern: "menu",
    react: "📑",
    alias: ["panel", "help", "list"],
    desc: "Get bot command list.",
    category: "main",
    use: ".menu",
    filename: __filename
},
async (conn, mek, pushname, m, context) => {
    const { from, pushname, reply } = context;

    try {
        const rtime = await runtime(process.uptime());
        
        // Categories වෙන් කරගැනීම
        let menuData = `*👋 Hᴇʟʟᴏ ${pushname.toUpperCase()}* > *“ High-Performance WhatsApp Bot. ”*

        👋⃝⃘̉̉̉━⋆─⋆──❂
┊ ┊ ┊ ┊ ┊
┊ ┊ ✫ ˚㋛ ⋆｡ ❀
┊ ☠︎︎
✧  ${pushname.toUpperCase()}෴✍︎𝄞
╰────────────────❂

*╭───────────────────────◆*
*│📑 T H A R U  M D  M E N U*
*│───────────────────────◆*
*│ 🕓 Uᴘᴛɪᴍᴇ:* ${rtime}
*│ 🧬 Vᴇʀsɪᴏɴ:* 1.0.0
*│ 📍 Pʀᴇғɪx:* [  .  ]
*╰───────────────────────◆*

┏━「 CHANNEL LINK ⤵️ 」
┃ https://whatsapp.com/channel/0029Vb7Ny1Q65yDKALYCyS2o
┗━━━━━━━━━━━━━❥❥❥
`;

        const categories = {};

        // Commands ලස්සනට Category අනුව සකස් කිරීම
        commands.map((cmd) => {
            if (cmd.category && !cmd.dontAddCommandList && cmd.pattern) {
                if (!categories[cmd.category]) {
                    categories[cmd.category] = [];
                }
                categories[cmd.category].push(cmd.pattern);
            }
        });

        // Menu එකේ ලිස්ට් එක සැකසීම
        for (const category in categories) {
            menuData += `*╭───「 ${category.toUpperCase()} 」* \n`;
            for (const cmd of categories[category]) {
                menuData += `*│* 💠 .${cmd}\n`;
            }
            menuData += `*╰───────────────◆*\n\n`;
        }

        menuData += `> *POWERED BY THARU-MD*`;

        // මැසේජ් එක යැවීම
        return await conn.sendMessage(from, {
            image: { url: config.LOGO || "https://img.sanishtech.com/u/290d30b8f2d7b56c7ac9a025f2820b38.jpeg" },
            caption: menuData,
            contextInfo: {
                externalAdReply: {
                    title: "NOMO-MD",
                    body: "Select Your Command",
                    sourceUrl: "https://whatsapp.com/channel/0029VbC6sAYC6ZvlRtTuM005",
                    mediaType: 1,
                    renderLargerThumbnail: false
                }
            }
        }, { quoted: mek });

    } catch (e) {
        reply("*Error loading menu...*");
        console.log(e);
    }
});
