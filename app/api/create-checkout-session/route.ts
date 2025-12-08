import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Received request body:", body);

    const {
      items,
      currency,
      shippingFee,
      tax,
      deliveryMethod,
      selectedCountry,
      language,
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    if (!currency) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (item: any) => ({
        price_data: {
          currency: currency.toLowerCase(),
          product_data: {
            name: item.name,
            images: item.image.startsWith("http")
              ? [item.image]
              : [`${process.env.NEXT_PUBLIC_APP_URL}${item.image}`],
          },
          unit_amount: Math.round(item.price * (currency === "JPY" ? 1 : 100)),
        },
        quantity: item.quantity,
      })
    );

    if (shippingFee > 0) {
      lineItems.push({
        price_data: {
          currency: currency.toLowerCase(),
          product_data: {
            name:
              deliveryMethod === "delivery" ? "Shipping Fee" : "Delivery Fee",
          },
          unit_amount: Math.round(shippingFee * (currency === "JPY" ? 1 : 100)),
        },
        quantity: 1,
      });
    }

    if (tax > 0) {
      lineItems.push({
        price_data: {
          currency: currency.toLowerCase(),
          product_data: {
            name: "Tax",
          },
          unit_amount: Math.round(tax * (currency === "JPY" ? 1 : 100)),
        },
        quantity: 1,
      });
    }

    console.log("Creating session with line items:", lineItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
      locale: language === "ja" ? "ja" : "en",
      metadata: {
        deliveryMethod,
        selectedCountry,
        currency,
      },
      ...(deliveryMethod === "delivery" && {
        shipping_address_collection: {
          allowed_countries: [
            selectedCountry,
          ] as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[], // ✅ 選択した国のみ許可
        },
      }),
      phone_number_collection: {
        enabled: true,
      },
    });

    console.log("Session created successfully:", session.id);

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error: any) {
    console.error("Stripe error details:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 }
    );
  }
}
