import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { encryptData, decryptData, generateSessionCode } from './crypto';
import './App.css';

// We use the same host since the server will serve this app
const SIGNALING_URL = '/';

function App() {
  const [roomId, setRoomId] = useState('');
  const [password, setPassword] = useState('');
  const [sessionCode, setSessionCode] = useState('');
  const [status, setStatus] = useState('Niet verbonden');
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const socketRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const dataChannelRef = useRef(null);
  
  // Wachtwoord opslaan in een ref om binnen de socket callbacks te gebruiken
  const passwordRef = useRef('');

  // WebRTC config: FORCED TURN (relay) to prevent IP leaks. No STUN servers.
  const configuration = {
    iceTransportPolicy: 'relay',
    iceServers: [
      {
        urls: 'turn:openrelay.metered.ca:80',
        username: 'openrelayproject',
        credential: 'openrelayproject'
      },
      {
        urls: 'turn:openrelay.metered.ca:443',
        username: 'openrelayproject',
        credential: 'openrelayproject'
      },
      {
        urls: 'turn:openrelay.metered.ca:443?transport=tcp',
        username: 'openrelayproject',
        credential: 'openrelayproject'
      }
    ],
  };

  useEffect(() => {
    return () => {
      if (dataChannelRef.current) dataChannelRef.current.close();
      if (peerConnectionRef.current) peerConnectionRef.current.close();
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  const handleConnect = async () => {
    if (!roomId.trim() || !password.trim()) {
      alert('Vul een koppelcode én wachtwoord in');
      return;
    }
    
    passwordRef.current = password;
    const code = await generateSessionCode(roomId, password);
    setSessionCode(code);
    
    setStatus('Verbinden...');
    
    socketRef.current = io(SIGNALING_URL);
    const socket = socketRef.current;

    socket.on('connect', () => {
      setStatus('Verbonden met server, wachten op peer...');
      socket.emit('join-room', roomId);
    });

    socket.on('user-joined', async () => {
      setStatus('Andere gebruiker verbonden, WebRTC opzetten...');
      await createOffer();
    });

    socket.on('offer', async (data) => {
      setStatus('Verbinding (offer) accepteren...');
      try {
        const offer = await decryptData(data.offer, passwordRef.current);
        await handleOffer(offer);
      } catch (err) {
        setStatus('Fout: Sleutel/Wachtwoord ongeldig');
        console.error(err);
      }
    });

    socket.on('answer', async (data) => {
      setStatus('Verbinding (answer) afronden...');
      try {
        const answer = await decryptData(data.answer, passwordRef.current);
        await handleAnswer(answer);
      } catch (err) {
        setStatus('Fout: Sleutel/Wachtwoord ongeldig');
        console.error(err);
      }
    });

    socket.on('ice-candidate', async (data) => {
      if (peerConnectionRef.current) {
        try {
          const candidate = await decryptData(data.candidate, passwordRef.current);
          await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (e) {
          console.error('Error decrypting or adding ICE candidate', e);
        }
      }
    });
  };

  const createPeerConnection = () => {
    const pc = new RTCPeerConnection(configuration);
    
    pc.onicecandidate = async (event) => {
      if (event.candidate) {
        try {
          const encryptedCandidate = await encryptData(event.candidate, passwordRef.current);
          socketRef.current.emit('ice-candidate', { candidate: encryptedCandidate, roomId });
        } catch (e) {
          console.error('Failed to encrypt ICE candidate', e);
        }
      }
    };

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'connected') {
        setStatus('P2P Verbonden!');
        setIsConnected(true);
      } else if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed') {
        setStatus('Verbinding verbroken');
        setIsConnected(false);
      }
    };

    pc.ondatachannel = (event) => {
      dataChannelRef.current = event.channel;
      setupDataChannel();
    };

    peerConnectionRef.current = pc;
    return pc;
  };

  const setupDataChannel = () => {
    const dc = dataChannelRef.current;
    dc.onopen = () => {
      setStatus('P2P Verbonden!');
      setIsConnected(true);
    };
    dc.onmessage = (event) => {
      setMessages((prev) => [...prev, { text: event.data, isMe: false }]);
    };
  };

  const createOffer = async () => {
    const pc = createPeerConnection();
    dataChannelRef.current = pc.createDataChannel('chat');
    setupDataChannel();

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    
    // Encrypt the offer before sending to the signaling server
    const encryptedOffer = await encryptData(offer, passwordRef.current);
    socketRef.current.emit('offer', { offer: encryptedOffer, roomId });
  };

  const handleOffer = async (offer) => {
    const pc = createPeerConnection();
    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    
    // Encrypt the answer before sending
    const encryptedAnswer = await encryptData(answer, passwordRef.current);
    socketRef.current.emit('answer', { answer: encryptedAnswer, roomId });
  };

  const handleAnswer = async (answer) => {
    await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const handleSend = () => {
    if (inputText.trim() && isConnected && dataChannelRef.current?.readyState === 'open') {
      dataChannelRef.current.send(inputText);
      setMessages((prev) => [...prev, { text: inputText, isMe: true }]);
      setInputText('');
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Anonieme Chat</h1>
        <p className="status">{status}</p>
        {isConnected && sessionCode && (
          <div className="session-code" title="Vergelijk deze code met je chatpartner om afluisteren (MITM) uit te sluiten">
            🔒 Sessie: <strong>{sessionCode}</strong>
          </div>
        )}
      </header>

      {!isConnected ? (
        <div className="connect-container">
          <p>Koppelcode & Wachtwoord:</p>
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Kamer Code (bijv. 1234)"
            className="input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Geheim Wachtwoord"
            className="input"
            style={{ marginTop: '10px' }}
          />
          <button onClick={handleConnect} className="btn" style={{ marginTop: '15px' }}>Veilig Verbinden</button>
          <p className="instruction">
            Spreek een code en wachtwoord af. Het wachtwoord wordt gebruikt voor <strong>E2E encryptie</strong> en verlaat nooit de browser.
          </p>
        </div>
      ) : (
        <div className="chat-container">
          <div className="messages-list">
            {messages.map((m, index) => (
              <div key={index} className={`message-bubble ${m.isMe ? 'my-message' : 'their-message'}`}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="input-container">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Typ een bericht..."
              className="chat-input"
            />
            <button onClick={handleSend} className="btn">Stuur</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
