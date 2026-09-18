# 🕵️‍♂️ Anonymous P2P Chat

Een volledig anonieme, veilige en snelle Peer-to-Peer chat applicatie. Gebouwd met WebRTC, React, en Node.js. 

Er zijn geen accounts, geen telefoonnummers en er worden **absoluut nul logs of berichten opgeslagen** op een server. Zodra de verbinding tot stand is gekomen, communiceren de apparaten direct (Peer-to-Peer) met elkaar, beveiligd via de modernste encryptiestandaarden.

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

*(Let op: Op de gratis tier van Render kan het 30-50 seconden duren voordat de app laadt als hij een tijdje niet gebruikt is).*

## 🛠️ Hoe werkt het onder de motorkap?

WebRTC vereist initieel een "Signaling Server" om de IP-gegevens (SDP offers/answers en ICE candidates) tussen twee apparaten uit te wisselen. 
- Deze repository bevat in `index.js` een uiterst simpele Socket.io server die uitsluitend dient als doorgeefluik voor deze handshake. 
- De frontend (React) wordt statisch geserveerd via de map `public/`.
- Zodra de handshake is afgerond, verbreekt de chat-afhankelijkheid van de Signaling Server en loopt het verkeer rechtstreeks P2P of via een TURN relay.

## 📄 Licentie
Dit project is open-source en beschikbaar onder de MIT Licentie. Voel je vrij om de code aan te passen en te verbeteren!
