import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
export async function POST(request: NextRequest) {
    const body = await request.json()
    const sig = (await headers()).get('Stripe-signature') as string;
    let event :Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body, 
            sig, 
            process.env.STRIPE_WEBHOOK_SECRET as string
        );
    } catch (err) {
        return new NextResponse( 'Webhook Error '+err, { status: 400 });
    }
    console.log(event);
    
    const session = event.data.object as Stripe.Checkout.Session;
    console.log(session);
    if (event.type === 'checkout.session.completed') {
        console.log('Payment was successful');
    }
    return new NextResponse('Webhook received', { status: 200 });

    
}
