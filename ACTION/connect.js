"use strict"
require("../ACTION/OPTIONS/config")
const {
    BufferJSON,
    Browsers,
    initInMemoryKeyStore,
    DisconnectReason,
    AnyMessageContent,
    makeInMemoryStore,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
} = require("@adiwajshing/baileys")
const fs = require("fs")
const figlet = require("figlet")
const chalk = require("chalk")
const pino = require("pino")
const base = require("../ACTION/STORAGE/ACC/base") 
const { Boom } = require("@hapi/boom")
const { color } = require("../ACTION/STORAGE/ACC/color")
const { banner, start, success, close } = require("../ACTION/STORAGE/ACC/functions")
const rimraf = require("rimraf")
const moment = require("moment-timezone")
const time = moment.tz("Asia/Jakarta").format("HH:mm:ss")			
const wita = moment.tz("Asia/Makassar").format("HH:mm:ss")			
const wit = moment.tz("Asia/Jayapura").format("HH:mm:ss")	

var date = new Date();

var tahun = date.getFullYear();
var bulan1 = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jams = date.getHours();
var menit = date.getMinutes(); 
var detik = date.getSeconds();
var waktoo = date.getHours();

switch(hari) {
case 0: hari = "Minggu"; break;
case 1: hari = "Senin"; break;
case 2: hari = "Selasa"; break;
case 3: hari = "Rabu"; break;
case 4: hari = "Kamis"; break;
case 5: hari = "Jum`at"; break;
case 6: hari = "Sabtu"; break;
}

switch(bulan1) { 
case 0: bulan1 = "Fanuari"; break;
case 1: bulan1 = "Februari"; break; 
case 2: bulan1 = "Maret"; break;
case 3: bulan1 = "April"; break;
case 4: bulan1 = "Mei"; break;
case 5: bulan1 = "Juni"; break;
case 6: bulan1 = "Juli"; break;
case 7: bulan1 = "Agustus"; break;
case 8: bulan1 = "September"; break;
case 9: bulan1 = "Oktober"; break; 
case 10: bulan1 = "November"; break;
case 11: bulan1 = "Desember"; break; 
}

switch(jams){
case 0: jams = "Malem"; break;
case 1: jams = "Malem"; break;
case 2: jams = "Malem"; break;
case 3: jams = "Pagi"; break;
case 4: jams = "Pagi"; break;
case 5: jams = "Pagi"; break;
case 6: jams = "Pagi"; break;
case 7: jams = "Pagi"; break;
case 8: jams = "Pagi"; break;
case 9: jams = "Pagi"; break;
case 10: jams = "Pagi"; break;
case 11: jams = "Siang"; break;
case 12: jams = "Siang"; break;
case 13: jams = "Siang"; break;
case 14: jams = "Siang"; break;
case 15: jams = "Sore"; break;
case 16: jams = "Sore"; break;
case 17: jams = "Sore"; break;
case 18: jams = "Malem"; break;
case 19: jams = "Malem"; break;
case 20: jams = "Malem"; break;
case 21: jams = "Malem"; break;
case 22: jams = "Malem"; break;
case 23: jams = "Malem"; break;
}

var tampilHari = '' + hari + ', ' + tanggal + ' ' + bulan1 + ' ' + tahun; 
var tampilJam = '' + 'Jams : ' + jams + ':' + menit + ':' + detik + ' Wib';
var tampilTanggal = hari + " "+ tanggal + " " + bulan1 + " " + tahun; 
var tampilWaktu = jams + ":" + menit + ":" + detik;

var ase = new Date();
var waktoonyabro = ase.getHours(); 
switch(waktoonyabro){
case 0: waktoonyabro = "Selamat Malam Owner..🌃"; break;
case 1: waktoonyabro = "Selamat Malam Owner..🌃"; break;
case 2: waktoonyabro = "Selamat Malam Owner..🌃"; break;
case 3: waktoonyabro = "Selamat Pagi Owner..✨"; break;
case 4: waktoonyabro = "Selamat Pagi Owner..✨"; break; 
case 5: waktoonyabro = "Selamat Pagi Owner..✨"; break;
case 6: waktoonyabro = "Selamat Pagi Owner..✨"; break;
case 7: waktoonyabro = "Selamat Pagi Owner..✨"; break;
case 8: waktoonyabro = "Selamat Pagi Owner..✨"; break;
case 9: waktoonyabro = "Selamat Pagi Owner..✨"; break;
case 10: waktoonyabro = "Selamat Pagi Owner..✨"; break;
case 11: waktoonyabro = "Selamat Siang Owner..🔥"; break; 
case 12: waktoonyabro = "Selamat Siang Owner..🔥"; break;
case 13: waktoonyabro = "Selamat Siang Owner..🔥"; break;
case 14: waktoonyabro = "Selamat Siang Owner..🔥"; break;
case 15: waktoonyabro = "Selamat Sore Owner..🌇"; break;
case 16: waktoonyabro = "Selamat Sore Owner..🌇"; break;
case 17: waktoonyabro = "Selamat Sore Owner..🌇"; break;
case 18: waktoonyabro = "Selamat Malam Owner..🌃"; break; 
case 19: waktoonyabro = "Selamat Malam Owner..🌃"; break;
case 20: waktoonyabro = "Selamat Malam Owner..🌃"; break;
case 21: waktoonyabro = "Selamat Malam Owner..🌃"; break;
case 22: waktoonyabro = "Selamat Malam Owner..🌃"; break; 
case 23: waktoonyabro = "Selamat Malam Owner..🌃"; break;
}

var tampilUcapan = '' + waktoonyabro;


const connectToWhatsApp = async() => {

const useStore = !process.argv.includes('--no-store')
const doReplies = !process.argv.includes('--no-reply')


const { state } = await useMultiFileAuthState("./ACTION/CONNECTION/SESSION")
const store = useStore ? makeInMemoryStore({ logger: pino().child({ level: 'fatal', stream: 'store' }) }) : undefined
const { version, isLatest } = await fetchLatestBaileysVersion()

console.log(color(`\x1b[1;37m> ${tampilUcapan}\n`,'cyan'))
console.log(color(figlet.textSync(namaBot, {
font: 'Standard',
horizontalLayout: 'default',
vertivalLayout: 'default',
width: 80,
whitespaceBreak: false
}), 'cyan'))
console.log(color('\n> WIB ','silver'), color(`${time}`,'mediumseagreen'))
console.log(color('> WITA ','silver'), color(`${wita}`,'mediumseagreen'))
console.log(color('> WIT ','silver'), color(`${wit}`,'mediumseagreen'))
console.log(color('> HARI ','silver'), color(`${tampilHari}\n`,'mediumseagreen'))

const connectionOptions = {
version,
keepAliveIntervalMs: 30000,
printQRInTerminal: true,
logger: pino({ level: "fatal" }),
auth: state,
browser: [namaBot, "IOS", "4.1.0"],
}

const sock = base.makeWASocket(connectionOptions)

store.bind(sock.ev)
sock.waVersion = version


sock.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update
const reason = new Boom(lastDisconnect?.error)?.output.statusCode
if (connection === 'close') {
console.log(color(lastDisconnect.error, 'deeppink'))
if (lastDisconnect.error == 'Error: Stream Errored (unknown)') {
process.exit()
} else if (reason === DisconnectReason.badSession) {
console.log(color(`Bad Session File, Please Delete Session and Scan Again`))
process.exit()
} else if (reason === DisconnectReason.connectionClosed) {
console.log(color('[SYSTEM]', 'white'), color('Connection closed, reconnecting...', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionLost) {
console.log(color('[SYSTEM]', 'white'), color('Connection lost, trying to reconnect', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionReplaced) {
console.log(color('Connection Replaced, Another New Session Opened, Please Close Current Session First'))
sock.logout()
} else if (reason === DisconnectReason.loggedOut) {
console.log(color(`Device Logged Out, Please Scan Again And Run.`))
sock.logout()
} else if (reason === DisconnectReason.restartRequired) {
console.log(color('Restart Required, Restarting...'))
await connectToWhatsApp()
} else if (reason === DisconnectReason.timedOut) {
console.log(color('Connection TimedOut, Reconnecting...'))
connectToWhatsApp()
}
} else if (connection === "connecting") {
start(`1`, `Connecting...`)
} else if (connection === "open") {
success(`1`, `Tersambung`)
if (autoJoin) {
sock.groupAcceptInvite(codeInvite)
}
}
})


sock.ev.on('messages.upsert', async (chatUpdate) => {
try {
if (!chatUpdate.messages) return
var m = chatUpdate.messages[0] || chatUpdate.messages[chatUpdate.messages.length - 1]
if (!m.message) return
if (m.key && m.key.remoteJid === 'status@broadcast') return
if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
m = base.smsg(sock, m, store)
require('../ACTION/STORAGE/AGG/kirbotz')(sock, m, chatUpdate, store)
} catch (err) {
console.log(err)
}
})

sock.ev.on('group-participants.update', async (anu) => {
console.log(anu)
try {
let metadata = await sock.groupMetadata(anu.id)
let participants = anu.participants
for (let num of participants) {
if (anu.action == 'add') {
sock.sendMessage(num, { text : `Hallo Kak @${num.split("@")[0]}, Selamat Datang Di Group ${metadata.subject}, Moga Betah Yah`, mentions : [num]},{ quoted : {
key: {
fromMe: false, 
participant: `0@s.whatsapp.net`, 
...({ remoteJid: "status@broadcast" }) 
},
"message": {
"pollCreationMessage": {
"name": `Welcome Sister 😊`,
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
}}}})
} else if (anu.action == 'remove') {
sock.sendMessage(num, { text : `Kenapa Keluar Kak @${num.split("@")[0]}, Belum Betah Yah? Hem Iyah Deh Moga Harimu Menyenangkan`, mentions : [num]},{ quoted : {
key: {
fromMe: false, 
participant: `0@s.whatsapp.net`, 
...({ remoteJid: "status@broadcast" }) 
},
"message": {
"pollCreationMessage": {
"name": `Goodbye Sister 👋`,
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
}}}})
}
}
} catch (err) {
console.log(err)
}
})

sock.ev.on('contacts.update', (update) => {
for (let contact of update) {
let id = sock.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})


const toFirstCase = (str) => {
let first = str.split(' ').map((nama) => nama.charAt(0).toUpperCase() + nama.slice(1)).join(' ')
return first
}

const removeObject = function (arr, attr, value) {
var i = arr.length
while (i--) {
if (arr[i] && arr[i].hasOwnProperty(attr) && arguments.length > 2 && arr[i][attr] === value) {
arr.splice(i, 1)
}
}
return arr
}

global.removeObject = removeObject
global.toFirstCase = toFirstCase

return sock
}

connectToWhatsApp()

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err)
})