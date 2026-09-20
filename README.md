# 🕵️‍♂️ Anonymous P2P Chat (WebRTC)

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/fabjan4u/anonieme-chat/pulls)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-orange.svg?style=flat-square)](https://github.com/fabjan4u/anonieme-chat/issues)
[![WebRTC](https://img.shields.io/badge/WebRTC-P2P-ff69b4?style=flat-square)](https://webrtc.org/)
[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=flat-square)](https://anonieme-chat.onrender.com/)
[![GitHub Stars](https://img.shields.io/github/stars/fabjan4u/anonieme-chat?style=social)](https://github.com/fabjan4u/anonieme-chat/stargazers)

*(Nederlandse versie hieronder / Dutch version below)*

</div>

> ⭐️ **Support Open-Source Privacy:** If you find this project interesting or useful, please consider giving this repository a **star**! It helps others discover decentralized, private communication tools.

A heavily secured, completely anonymous, and lightning-fast Peer-to-Peer chat application built with WebRTC, React, and Node.js. 

There are no accounts, no phone numbers, and **absolutely zero logs or messages are stored** on any server. 

## 🟢 Live Demo
You can test the application right now using this live instance:
👉 **[https://anonieme-chat.onrender.com/](https://anonieme-chat.onrender.com/)**

*Tip: Open this link on two different devices, agree on a Room Code (like "1234") AND a Secret Password, and click "Secure Connect".*

## 🔒 Hardened Security Features (New)
This app has recently undergone a massive security overhaul to mitigate the inherent flaws of standard WebRTC apps:

- **Signaling E2E Encryption:** Connection data (SDP/ICE) is encrypted locally in your browser using **AES-GCM (Web Crypto API)** before reaching the server. Even if the signaling server is compromised, it cannot execute a Man-In-The-Middle (MITM) attack without your shared password.
- **Strict IP-Leak Protection (Relay-Only):** Standard STUN servers have been stripped out. WebRTC is forced to operate in `relay` mode via a TURN server. This ensures your local network and public IP address are completely hidden from your chat partner.
- **Visual Session Verification:** A cryptographic hash (Session Code) based on your shared keys is displayed. If both screens show the same Session Code, you are cryptographically guaranteed to be safe from eavesdropping.
- **Backend Hardening:** The Node.js server features in-memory Rate Limiting to prevent brute-forcing and is configured for **Zero Logging**. No socket IDs or room activities are printed to terminal logs.

### ⚠️ Security & Threat Model Disclaimer
*Transparency is crucial in cybersecurity.* While this app employs aggressive hardening (AES-GCM signaling, Relay-only WebRTC), it is a browser-based hobby project, NOT a replacement for audited protocols like Signal or Session. 
- **Browser limits:** Because this is a web app, users are vulnerable to JavaScript supply chain attacks if the host server is compromised. 
- **No Forward Secrecy:** We lack the advanced Double Ratchet mechanism. 
- **Use responsibly:** Do not use this for life-and-death threat models.

## 🚀 Self-Hosting (Deploy)

The easiest way to run this app yourself is via Render. It's 100% free and takes just 2 minutes.
1. Create an account on [Render.com](https://render.com).
2. Create a new **Web Service**.
3. Connect this GitHub repository.
4. Set the following configuration:
   - **Language:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
5. Click Deploy!

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

# 🕵️‍♂️ Anonieme P2P Chat (Nederlands)

> ⭐️ **Steun dit open-source project:** Vind je dit een toffe of nuttige app? Geef de repo een **ster** op GitHub — daarmee help je meer mensen veilige, anonieme communicatie te ontdekken!

Een zwaar beveiligde, volledig anonieme en snelle Peer-to-Peer chat applicatie. Gebouwd met WebRTC, React, en Node.js. 

Er zijn geen accounts, geen telefoonnummers en er worden **absoluut nul logs of berichten opgeslagen** op een server.

## 🟢 Live Testen
Je kunt de applicatie direct uitproberen via deze live versie:
👉 **[https://anonieme-chat.onrender.com/](https://anonieme-chat.onrender.com/)**

*Tip: Open deze link op twee verschillende apparaten, spreek een Kamer Code (bijv. "123") én een Geheim Wachtwoord af, en druk op "Veilig Verbinden".*

## 🔒 Hardcore Beveiligingsfuncties (Nieuw)
Deze app heeft recent een gigantische beveiligings-upgrade gekregen om de fundamentele zwaktes van normale WebRTC-apps te elimineren:

- **E2E Versleutelde Signaling:** Al het verbindingsverkeer wordt *lokaal in je browser* versleuteld met **AES-GCM (Web Crypto API)** en een PBKDF2 afgeleide sleutel. Zelfs een gehackte Render-server ziet alleen onleesbare ruis en kan geen MITM-aanval uitvoeren zonder jullie geheime wachtwoord.
- **Anti-IP-Lekken (Relay-Only):** We hebben publieke STUN-servers uitgeschakeld. Al het WebRTC netwerkverkeer wordt geforceerd via de beveiligde TURN-server gestuurd (`relay`). Hierdoor lekt jouw IP-adres nooit meer naar je chatpartner.
- **Sessie Verificatie (Safety Numbers):** De chat toont nu een unieke "Sessie Code" in beeld (gebaseerd op een veilige SHA-hash). Als jij en je partner dezelfde code zien, is afluisteren wiskundig onmogelijk gemaakt.
- **Backend Hardening:** De Node.js server kent nu strikte in-memory **Rate Limiting** (tegen brute-force) en **Zero Logging**. Er wordt niets (geen IP's, geen kamer-ID's) meer naar de terminal-logs van de hoster geschreven.

### ⚠️ Security & Threat Model Disclaimer
*Eerlijkheid duurt het langst in cybersecurity.* Hoewel deze app nu maximaal gehard is tegen de bekende kwetsbaarheden van WebRTC, blijft het een hobbyproject in een webbrowser en is het GEEN vervanger voor geauditeerde apps als Signal of SimpleX.
- Omdat het een web-app is, blijf je kwetsbaar voor "Supply Chain" aanvallen (als iemand de Render server hackt en de JavaScript frontend aanpast, kan je wachtwoord gestolen worden voordat het versleutelt).
- Deze app heeft geen geavanceerde *Forward Secrecy* (Double Ratchet). 
- Gebruik het voor privacy en anonieme chats, maar niet als je leven er vanaf hangt.

## 🚀 Zelf hosten (Deploy)

De makkelijkste manier om deze app zelf te draaien is via Render. Het is 100% gratis en kost slechts 2 minuten.
1. Maak een account op [Render.com](https://render.com).
2. Maak een nieuwe **Web Service** aan.
3. Koppel deze GitHub repository.
4. Stel de volgende configuratie in:
   - **Language:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
5. Klik op Deploy! Je krijgt nu een unieke link die je met iedereen kunt delen.

## 🤝 Meewerken & Bijdragen
Vind je dit een gaaf project en wil je helpen bouwen? Bijdragen zijn van harte welkom!
1. Fork het project naar je eigen GitHub
2. Maak een nieuwe feature-branch (`git checkout -b feature/MooieFeature`)
3. Commit je wijzigingen (`git commit -m 'MooieFeature toegevoegd'`)
4. Push naar je branch (`git push origin feature/MooieFeature`)
5. Open een Pull Request!
