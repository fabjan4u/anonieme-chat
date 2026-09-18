# 🕵️‍♂️ Anonymous P2P Chat (WebRTC)

*(Nederlandse versie hieronder / Dutch version below)*

A completely anonymous, secure, and lightning-fast Peer-to-Peer chat application built with WebRTC, React, and Node.js.

There are no accounts, no phone numbers, and **absolutely zero logs or messages are stored** on any server. Once the connection is established, the devices communicate directly (Peer-to-Peer) with each other, secured by state-of-the-art encryption standards.

## 🟢 Live Demo
You can test the application right now using this live instance:
👉 **[https://anonieme-chat.onrender.com/](https://anonieme-chat.onrender.com/)**

*Tip: Open this link on two different devices (or share it with a friend), agree on a secret code (like "1234"), and click "Connect".*

## ✨ Features
- **100% End-to-End Encrypted (E2EE):** Messages flow directly between the two users via a secure WebRTC Data Channel (DTLS/SCTP).
- **No Identity:** You share a temporary, self-made pairing code with your chat partner. No one knows who you are.
- **No Database:** No data is stored anywhere.
- **4G & WiFi Support:** Uses free public STUN and TURN servers (OpenRelay) for robust NAT-traversal, even on strict mobile networks.
- **Progressive Web App (PWA) Ready:** Add the webpage to your home screen on iOS or Android, and it feels like a native app.

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

---

# 🕵️‍♂️ Anonieme P2P Chat (Nederlands)

Een volledig anonieme, veilige en snelle Peer-to-Peer chat applicatie. Gebouwd met WebRTC, React, en Node.js. 

Er zijn geen accounts, geen telefoonnummers en er worden **absoluut nul logs of berichten opgeslagen** op een server. Zodra de verbinding tot stand is gekomen, communiceren de apparaten direct (Peer-to-Peer) met elkaar, beveiligd via de modernste encryptiestandaarden.

## 🟢 Live Testen
Je kunt de applicatie direct uitproberen via deze live versie:
👉 **[https://anonieme-chat.onrender.com/](https://anonieme-chat.onrender.com/)**

*Tip: Open deze link op twee verschillende apparaten (of deel hem met een vriend), spreek een geheime code af (bijv. "1234") en druk op "Verbinden".*

## ✨ Features
- **100% End-to-End Encrypted (E2EE):** Berichten lopen direct tussen de twee gebruikers via een beveiligd WebRTC Data Channel (DTLS/SCTP).
- **Geen identiteit:** Je deelt een tijdelijke, zelfbedachte koppelcode met je gesprekspartner. Niemand weet wie je bent.
- **Geen database:** Er wordt geen enkele vorm van data opgeslagen.
- **4G & WiFi Support:** Maakt gebruik van gratis publieke STUN en TURN servers (OpenRelay) voor robuuste NAT-traversal, zelfs op strenge mobiele netwerken.
- **Progressive Web App (PWA) Ready:** Voeg de webpagina toe aan je startscherm op iOS of Android en het voelt als een native app.

## 🚀 Zelf hosten (Deploy)

De makkelijkste manier om deze app zelf te draaien is via Render. Het is 100% gratis en kost slechts 2 minuten.
1. Maak een account op [Render.com](https://render.com).
2. Maak een nieuwe **Web Service** aan.
3. Koppel deze GitHub repository.
4. Stel de volgende configuratie in:
   - **Language:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
5. Klik op Deploy! Je krijgt nu een unieke link (bijv. `jouw-chat.onrender.com`) die je met iedereen kunt delen.
