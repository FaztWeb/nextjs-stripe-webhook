import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const body = await request.json();

  const session = await stripe.checkout.sessions.create({
    success_url: `${process.env.DOMAIN_URL}/success`,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: body.name,
            images: [body.image],
          },
          unit_amount: body.price,
        },
        quantity: 1,
      },
    ],
    metadata: {
       productId: body.id 
    },
    mode: "payment",
  });


  return NextResponse.json(session);
}
