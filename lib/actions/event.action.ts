"use server";

import { CreateEventParams } from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/schema/user.model";
import Event from "../database/schema/event.model";

export const createEvent = async ({
  event,
  userId,
  path,
}: CreateEventParams) => {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);
    if (!organizer) {
      throw new Error("Organizer not found");
    }

    const newEvet = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });

    return JSON.parse(JSON.stringify(newEvet));
  } catch (error) {
    console.log(error);
  }
};
