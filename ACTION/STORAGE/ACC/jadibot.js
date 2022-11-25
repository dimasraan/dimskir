/*
Thanks To
Pembuat Base ( Irfan )
Pengembang Script Bot ( KirBotz )

Jangan Hapus Thanks To Di Atas

No Enc? wa.me/6287705048235
Beli 50k buat 10 orang tercepat
*/

const {
	useMultiFileAuthState,
	fetchLatestBaileysVersion,
	makeInMemoryStore,
} = require("@adiwajshing/baileys");
const qrcode = require("qrcode");
const rimraf = require("rimraf");
const fs = require("fs");
const { DisconnectReason } = require("@adiwajshing/baileys/lib/Types");
const logg = require("pino");
const { Boom } = require("@hapi/boom");
const simple = require("./base") 
const { color } = require("./color");

const client = {};
let buttons = [{buttonId: `.stopjadibot`, buttonText: {displayText: 'stop'}, type: 1}]

async function jadibot(sock, jid) {
	const { state, saveCreds } = await useMultiFileAuthState(
		`./ACTION/CONNECTION/JADIBOT-SESSION/${jid.split("@")[0]}`
	);
	const { version, isLatest } = await fetchLatestBaileysVersion();
	client[jid] = simple.makeWASocket({
		version,
		keepAliveIntervalMs: 30000,
		printQRInTerminal: false,
		logger: logg({ level: "fatal" }),
		auth: state,
		browser: ["Jadibot Md By KirBotz", "IOS", "4.1.0"],
	});

	const store = makeInMemoryStore({
		logger: logg().child({ level: "fatal", stream: "store" }),
	});

	client[jid].ev.on("creds.update", saveCreds);

	client[jid].ev.on("contacts.update", (update) => {
		for (let contact of update) {
			let id = client[jid].decodeJid(contact.id);
			if (store && store.contacts)
				store.contacts[id] = { id, name: contact.notify };
		}
	});

	client[jid].ev.on("messages.upsert", async (chatUpdate) => {
		try {
			if (!chatUpdate.messages) return;
			var m =
				chatUpdate.messages[0] ||
				chatUpdate.messages[chatUpdate.messages.length - 1];
			if (!m.message) return;
			if (m.key && m.key.remoteJid === "status@broadcast") return;
			if (m.key.id.startsWith("BAE5") && m.key.id.length === 16) return;
			m = simple.smsg(client[jid], m, store);
			require('../AGG/kirbotz')(client[jid], m, chatUpdate, store);
		} catch (err) {
			console.log(err);
		}
	});

	client[jid].ev.on("connection.update", async (update) => {
		const { connection, qr, lastDisconnect } = update;
		const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
		if (connection == "open") {
			return client[jid].sendMessage(jid, { text: "Connected to server." });
			return client[jid].groupAcceptInvite("CTkxkuMnpkw55gYYXJn3qS");
		}
		if (qr) {
			return sock.sendMessage(jid, {
				image: await qrcode.toBuffer(qr, { scale: 8 }),
				caption:
					"Scan QR ini untuk jadi bot sementara\n\n1. Klik titik tiga di pojok kanan atas\n2. Klik Perangkat tertaut\n3. Klik Tautkan Perangkat\n4. Scan QR Ini",
				jpegThumbnail: null,
			    buttons
			});
		}
		if (connection === "close") {
			if (reason === DisconnectReason.restartRequired) {
				console.log(color("Restart Required, Restarting..."));
				return this.jadibot(sock, jid);
			} else if (reason === DisconnectReason.timedOut) {
				console.log(color("Connection TimedOut, Reconnecting..."));
				return this.jadibot(sock, jid);
			} else {
				return sock.sendMessage(jid, {
					text: "Anda sudah tidak lagi menjadi bot.",
				});
			}
		}
	});
};

async function stopjadibot(sock, jid) {
	if (!Object.keys(client).includes(jid)) {
		return sock.sendMessage(jid, { text: "Anda tidak ada di list jadi bot." });
	}
	try {
		client[jid].end("Stop");
	} catch {}
	try {
		client[jid].logout();
	} catch {}
	delete client[jid];
	rimraf.sync(`./ACTION/CONNECTION/JADIBOT-SESSION/${jid.split("@")[0]}`);
};

async function listjadibot(sock, m) {
    let from = m.key.remoteJid
	let mentions = [];
	let text = "List Jadi Bot :\n";
	for (let jadibot of Object.values(client)) {
		mentions.push(jadibot.user.jid);
		text += ` × @${jadibot.user.jid.split("@")[0]}\n`;
	}
	return sock.sendMessage(from, {
		text: text.trim(),
		mentions,
	});
};

global.jadibot = jadibot
global.stopjadibot = stopjadibot
global.listjadibot = listjadibot