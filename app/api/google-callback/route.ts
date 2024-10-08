import { addUser, createUserSession } from "@/app/actions";
import { generateHashString, generateRandomString } from "@/utils/utils";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

interface TokenResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
    refresh_token?: string; // Optional, in case it's returned
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    // Check if the code is null
    if (!code) {
        console.error('Authorization code is missing');
        return new Response('missing Code from the Callback', { status: 400 });
    }

    const tokenResponse = await fetch(`https://oauth2.googleapis.com/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            code, // guaranteed to be a string here
            client_id: process.env.GOOGLE_CLIENT_ID as string,
            client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI as string, 
            grant_type: 'authorization_code',
        }),
    });

    if (!tokenResponse.ok) {
        console.error('Token exchange failed:', await tokenResponse.text());
        return new Response('token exchange Response not ok', { status: 400 });

    }

    const tokenData: TokenResponse = await tokenResponse.json();
    
    const accessToken = tokenData.access_token;

    const userResponse = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!userResponse.ok) {
        console.error('User info fetch failed:', await userResponse.text());
        return new Response('user data fetch Response not ok', { status: 400 });
    }

    const userData = await userResponse.json();
    const result = await addUser(userData.email, generateHashString(generateRandomString()), userData.picture, true);
    
    if ('error' in result) {
        return NextResponse.json(
            { message: result.error },
            { status: 500 }
        );
    }

    // @ts-ignore
    await createUserSession(result.id, true);
    revalidatePath('/');

    const redirectUrl = process.env.NODE_ENV === 'development'
        ? new URL('http://localhost:3001/payment?plan=Hoppy')
        : new URL('/payment?plan=Hoppy', url.origin);

    return NextResponse.redirect(redirectUrl);
}
