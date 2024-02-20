import EventForm from "@/components/shared/EventForm";
import { getEventDetail } from "@/lib/actions/event.action";
import { auth } from "@clerk/nextjs";
import React from "react";
type paramsType = {
  params: { id: string };
};
const UpdateEvent = async ({ params: { id } }: paramsType) => {
  const event = await getEventDetail(id);

  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="bg-slate-100 py-5 md:py-10">
        <h3 className="wrapper text-center md:text-left font-bold text-2xl ">
          Update Event
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm
          eventId={event._id}
          event={event}
          userId={userId!}
          type="Update"
        />
      </div>
    </>
  );
};

export default UpdateEvent;
