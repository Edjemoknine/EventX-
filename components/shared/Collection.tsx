import { IEvent } from "@/lib/database/schema/event.model";
import React from "react";
import EventCard from "./EventCard";
import Pagination from "./Pagination";
type CollectionProps = {
  data: IEvent[];
  emptyTitle: string;
  emptyStateSubtext: string;
  collectionType: "Events_Organised" | "My_Tickets" | "All_Events";
  limit: number;
  page: number;
  total?: number;
  urlPramasName?: string;
};
const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  collectionType,
  urlPramasName,
  limit,
  page,
  total = 0,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="wrapper flex flex-col gap-10 items-center">
          <ul className="grid w-full grid-cols-1 gap-5 lg:grid-cols-3 xl:gap-10 sm:grid-cols-2">
            {data.map((event) => {
              const hasOrderLink = collectionType === "Events_Organised";
              const hidePrice = collectionType === "My_Tickets";

              return (
                <li key={event._id} className="flex justify-center">
                  <EventCard
                    event={event}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />
                  ;
                </li>
              );
            })}
          </ul>
          {total > 1 && (
            <Pagination
              urlPramasName={urlPramasName!}
              page={page}
              total={total}
            />
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-gray-100 py-28 text-center ">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Collection;
