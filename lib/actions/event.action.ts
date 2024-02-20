"use server";

import { CreateEventParams } from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/schema/user.model";
import Event from "../database/schema/event.model";
import Category from "../database/schema/category.model";

const populateEvent = async (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

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

export const getEventDetail = async (id: string) => {
  try {
    await connectToDatabase();

    const event = await populateEvent(Event.findById(id));

    if (!event) {
      throw new Error("Could not find event");
    }
    return JSON.parse(JSON.stringify(event));
  } catch (error) {}
};
