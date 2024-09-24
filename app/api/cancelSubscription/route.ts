import { updateUserPayment, updateUserSubscriptionID } from "@/app/actions";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {user} = await req.json();

    if (!user.SubscriptionID) {
      return new Response('Invalid or missing SubscriptionID', { status: 400 });
    }
    const authHeaders = new Headers();
    authHeaders.append("Content-Type", "application/json");

    const authBody = JSON.stringify({
        "api_key": process.env.PAYMOB_API_KEY, 
    });

    const authResponse = await fetch("https://accept.paymob.com/api/auth/tokens", {
        method: 'POST',
        headers: authHeaders,
        body: authBody,
    });
    
    const authResult = await authResponse.json();

    if (!authResult.token) {
    throw new Error('Failed to obtain auth token');
    }

    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${authResult.token}`);
    myHeaders.append('Content-Type', 'application/json'); // Optional, if you need to specify content type

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };

    const response = await fetch(
      `https://accept.paymob.com/api/acceptance/subscriptions/${user.SubscriptionID}/cancel`,
    //   @ts-ignore
      requestOptions
    );

    const cancelSubResult = await response.json();
    if (response.status === 404) {
        return NextResponse.json({ error: 'Subscription not found', details: cancelSubResult }, { status: 404 });
      }
    if (response.ok) {
      // @ts-ignore
      await updateUserPayment(user.id, null, null)
      await updateUserSubscriptionID(user.id,  null)
      revalidatePath('/')
      return NextResponse.json({ message: 'Subscription Cancelled Successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Failed to cancel subscription', details: cancelSubResult }, { status: response.status });
    }

  } catch (error) {
    console.error('Error Canceling Subscription:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
