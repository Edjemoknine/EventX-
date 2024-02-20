import { getEventDetail } from "@/lib/actions/event.action";
import Image from "next/image";
import React from "react";
import { Calendar, LocateFixedIcon } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
type paramsType = {
  params: {
    id: string;
  };
};
const EventDetail = async ({ params: { id } }: paramsType) => {
  const event = await getEventDetail(id);
  console.log(event);

  return (
    <section className="flex justify-center bg-slate-100  ">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-6xl">
        <Image
          src={event.imageUrl}
          width={1000}
          height={1000}
          alt="image Detail"
          className="h-full min-h-[300px] object-cover object-center"
        />

        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="h2-bold">{event.title}</h2>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex  gap-3 ">
                <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700 ">
                  {event.isFree ? "FREE" : `$${event.price}`}
                </p>
                <p className="p-medium-16 rounded-full bg-gray-500/10 px-4 py-2 text-gray-500 ">
                  {event.category.name}
                </p>
              </div>

              <p className="p-medium-18 ml-2 mt-2 sm:mt-0 ">
                By{" "}
                <span>
                  {event.organizer.firstName} {event.organizer.lastName}
                </span>
              </p>
            </div>
          </div>

          {/* {"CHECKOUT"} */}

          <div className=" flex flex-col gap-5">
            <div className="flex gap-2">
              <Calendar className="text-blue-700" />
              <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center ">
                <p>
                  {formatDateTime(event.startDateTime).dateOnly} -{" "}
                  {formatDateTime(event.startDateTime).timeOnly}
                </p>

                <p className="ml-2">
                  / {formatDateTime(event.endDateTime).dateOnly} -{" "}
                  {formatDateTime(event.endDateTime).timeOnly}
                </p>
              </div>
            </div>

            <div className="p-regular-20 flex items-center gap-3 ">
              <LocateFixedIcon className="text-blue-700" />
              <p className="p-medium-16 lg:p-regular-20">{event.location}</p>
            </div>
          </div>
          <div className="flex-col flex gap-2">
            <p className="p-bold-20 text-gray-600">What You'll learn</p>
            <p className="p-medium-16 lg:p-medium-18">{event.description}</p>
            <p className="p-medium-16 lg:p-medium-18 truncate">{event.url}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetail;
