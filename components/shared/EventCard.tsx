import { IEvent } from "@/lib/database/schema/event.model";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { ArrowUpRight, Edit } from "lucide-react";
import { auth } from "@clerk/nextjs";
import DeleteConfirmation from "./DeleteConfirmation";
type CardProps = {
  event: IEvent;
  hasOrderLink: boolean;
  hidePrice: boolean;
};
const EventCard = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event.organizer._id.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px]  flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px] ">
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex justify-center items-center flex-grow bg-slate-100 bg-cover bg-center text-gray-500"
      />
      {isEventCreator && !hidePrice && (
        <div className="absolute right-2 top-2 p-3 shadow-sm flex flex-col gap-4 rounded-xl bg-white ">
          <Link href={`/events/${event._id}/update`}>
            <Edit className="text-blue-500" />
          </Link>

          <DeleteConfirmation eventId={event._id} />
        </div>
      )}
      <Link
        href={`/events/${event._id}`}
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
      >
        {/* {hidePrice && ( */}
        <div className="flex gap-2">
          <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-600">
            {event.isFree ? "FREE" : `$${event.price}`}
          </span>
          <p className="p-semibold-14 px-4 py-1 w-min rounded-full bg-gray-500/10 text-gray-500">
            {event.category.name}
          </p>
        </div>
        {/* )} */}
        <p className="p-medium-16 text-gray-500 ">
          {formatDateTime(event.startDateTime).dateTime}
        </p>
        <p className="p-medium-16 line-clamp-2 flex-1 text-black md:p-medium-20">
          {event.title}
        </p>
        <div className="flex justify-between ">
          <p className="p-medium-14 ">
            {event.organizer.firstName} {event.organizer.lastName}
          </p>

          {hasOrderLink && (
            <Link href={`/orders?eventId=${event._id}`} className="flex gap-2 ">
              <p className="text-blue-600 ">Order Details</p>
              <ArrowUpRight />
            </Link>
          )}
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
