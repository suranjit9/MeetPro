"use server";


import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_KEY;
const apiSecret = process.env.STREAM_KEY_SECRET;

export const tokenProvider = async () => {
    const user = await currentUser();
    if (!user) {
        throw new Error("User not found");
    }
    if (!apiKey ) {
        throw new Error("Missing Stream API key");
        
    }
    if (!apiSecret) {
        throw new Error("Missing Stream API secret");
    }

    const streamClient = new StreamClient(apiKey, apiSecret);
    const expirationTime = Math.floor(Date.now() / 1000) + 3600;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;
    const token = streamClient.createToken(user.id, expirationTime, issuedAt);
    return token;
}