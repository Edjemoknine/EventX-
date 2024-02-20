import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/event.action";
import { auth } from "@clerk/nextjs";

import Link from "next/link";
import React from "react";

const Profile = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const organizedEvents = await getEventsByUser({ userId, page: 1 });

  return (
    <>
      <section className="py-5 md:py-10 bg-slate-100 ">
        <div className="wrapper flex flex-col items-center sm:flex-row justify-center sm:justify-between ">
          <h3 className="h3-bold text-center md:text-left ">My Tickets</h3>
          <Button asChild>
            <Link href={`/#events`} className="hidden sm:flex">
              Explore More Events
            </Link>
          </Button>
        </div>
      </section>
      {/* <section className="wrapper my-6">
        <Collection
          data={relatedEvents?.data}
          emptyTitle="No Events tickets pusrched yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={6}
          page={1}
          total={2}
          urlPramasName="ordersPage"
        />
      </section> */}
      <section className="py-5 md:py-10 bg-slate-100 ">
        <div className="wrapper flex flex-col items-center justify-center sm:flex-row sm:justify-between ">
          <h3 className="h3-bold text-center md:text-left ">
            Events Organized
          </h3>
          <Button asChild>
            <Link href={`/#events`} className="hidden sm:flex">
              Create New Event
            </Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-6">
        <Collection
          data={organizedEvents?.data}
          emptyTitle="No Events created yet"
          emptyStateSubtext="Go Create some new events"
          collectionType="My_Tickets"
          limit={6}
          page={1}
          total={2}
          urlPramasName="eventsPage"
        />
      </section>
    </>
  );
};

export default Profile;
