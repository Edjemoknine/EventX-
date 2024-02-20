"use client";
import { IEvent } from "@/lib/database/schema/event.model";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { checkoutOrder } from "@/lib/actions/order.action";
import { useRouter } from "next/navigation";
type CheckoutType = {
  event: IEvent;
  userId: string;
};

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ event, userId }: CheckoutType) => {
  const router = useRouter();
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const onCheckout = async () => {
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
    };

    const chek = await checkoutOrder(order);
    router.push(chek!);
  };
  return (
    <form action={onCheckout}>
      <Button type="submit" size={"lg"} role="link">
        {event.isFree ? "Get Ticket" : "By Ticket"}
      </Button>
    </form>
  );
};

export default Checkout;
