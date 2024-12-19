import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import env from "./env";


const firebaseConfig = {
  apiKey: "AIzaSyC9ufJWSOWEFyZc4YlSqM4c1o7ppHxwPT8",
  authDomain: "blockchain-9034d.firebaseapp.com",
  projectId: "blockchain-9034d",
  storageBucket: "blockchain-9034d.appspot.com",
  messagingSenderId: "1047256488558",
  appId: "1:1047256488558:web:b5dfe8e32d2e1e8823247f",
  measurementId: "G-Q2GZN1PNZM",
};
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const uploadImageToAuctionItem = async (auctionItemId, file) => {
  const auctionItemRef = ref(storage, `${env.auctionCreatorAddress}/${auctionItemId}/${file.name}`);
  await uploadBytes(auctionItemRef, file);
  const uploadedFileRef = ref(storage, auctionItemRef.fullPath);
  return getDownloadURL(uploadedFileRef);
};
