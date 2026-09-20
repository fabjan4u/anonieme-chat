// Web Crypto API Helper for E2E Signaling Encryption

const SALT = new TextEncoder().encode("AnoniemeChatSalt2026!P2P");

/**
 * Derives an AES-GCM 256-bit key from a plain text password.
 */
async function getPasswordKey(password) {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );
  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: SALT,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}

/**
 * Encrypts an object (SDP or ICE candidate) using AES-GCM and the shared password.
 */
export async function encryptData(data, password) {
  const key = await getPasswordKey(password);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(JSON.stringify(data));
  const cipherText = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    key,
    encoded
  );
  return {
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(cipherText))
  };
}

/**
 * Decrypts the encrypted signaling payload back into an object.
 */
export async function decryptData(payload, password) {
  try {
    const key = await getPasswordKey(password);
    const iv = new Uint8Array(payload.iv);
    const cipherData = new Uint8Array(payload.data);
    const decrypted = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv },
      key,
      cipherData
    );
    return JSON.parse(new TextDecoder().decode(decrypted));
  } catch (error) {
    console.error("Decryption failed. Incorrect password or corrupted data.", error);
    throw new Error("Ongeldig wachtwoord of corrupte data");
  }
}

/**
 * Generates a short Visual Session Code based on Room ID and Password.
 * Both peers should see the exact same code if they use the same credentials.
 */
export async function generateSessionCode(roomId, password) {
  const enc = new TextEncoder();
  const data = enc.encode(roomId + ":" + password);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  // Convert bytes to hex string
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  // Return the first 8 characters as uppercase for easy comparison
  return hashHex.substring(0, 8).toUpperCase();
}
