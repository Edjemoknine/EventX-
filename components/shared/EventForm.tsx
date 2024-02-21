"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DatePicker from "react-datepicker";
import { Checkbox } from "@/components/ui/checkbox";

import "react-datepicker/dist/react-datepicker.css";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Locate, CalendarRange, DollarSign, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EventFormSchema } from "@/lib/validator";
import { eventDefaultValues } from "@/constants";
import DropDown from "./DropDown";
import FileUploader from "./FileUploader";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { createEvent, updateEvent } from "@/lib/actions/event.action";
import { IEvent } from "@/lib/database/schema/event.model";
type FormProps = {
  userId: string;
  type: "Create" | "Update";
  event?: IEvent;
  eventId?: string;
};

const EventForm = ({ userId, type, event, eventId }: FormProps) => {
  const initialValues =
    event && type === "Update"
      ? {
          ...event,
          startDateTime: new Date(event.startDateTime),
          endDateTime: new Date(event.endDateTime),
        }
      : eventDefaultValues;

  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof EventFormSchema>>({
    resolver: zodResolver(EventFormSchema),
    defaultValues: initialValues,
  });
  const [files, setFiles] = useState<File[]>([]);
  const Router = useRouter();

  async function onSubmit(values: z.infer<typeof EventFormSchema>) {
    let uploadImageUrl = values.imageUrl;
    if (files.length > 0) {
      const uploadImges = await startUpload(files);
      if (!uploadImges) return;
      uploadImageUrl = uploadImges[0].url;
    }

    if (type === "Create") {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadImageUrl },
          userId,
          path: "/profile",
        });

        if (newEvent) {
          form.reset();
          Router.push(`/events/${newEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (type === "Update") {
      console.log(eventId);
      // if (!eventId) {
      //   Router.back();
      //   return;
      // }
      try {
        const upEvent = await updateEvent({
          event: {
            ...values,
            imageUrl: uploadImageUrl,
            _id: eventId as string,
          },
          userId,

          path: `/events/${eventId}`,
        });

        if (upEvent) {
          form.reset();
          Router.push(`/events/${upEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    className="input-field"
                    placeholder="Title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <DropDown
                    onchangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    className="textarea rounded-2xl"
                    placeholder="Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full bg-slate-100 rounded-xl">
                <FormControl>
                  <FileUploader
                    onFieldeChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="flex items-center pl-4 input-field">
                  <Locate />
                  <Input
                    className="input-field"
                    placeholder="Location"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col md:flex-row gap-5">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center gap-3 text-slate-600 pl-4 input-field">
                    <CalendarRange />
                    <p>Start Date:</p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat={"MMM dd, yyyy h:mm a"}
                      wrapperClassName="dataPicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex gap-3 text-slate-600 items-center pl-4 input-field">
                    <CalendarRange />
                    <p>End Date:</p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center gap-3 justify-between text-slate-600 pl-4 input-field">
                    <div className="flex items-center gap-3">
                      <DollarSign />
                      <Input
                        type="number"
                        {...field}
                        placeholder="Price"
                        className="input-field"
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex gap-3 text-slate-600 items-center pl-4 input-field">
                              <label htmlFor="free">isFree</label>
                              <Checkbox
                                className="h-5 w-5 border-2"
                                onCheckedChange={field.onChange}
                                value={field.value}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex gap-3 text-slate-600 items-center pl-4 input-field">
                    <Link />
                    <Input
                      className="input-field"
                      placeholder="URL"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          className="py-6 text-lg rounded-full"
          disabled={form.formState.isSubmitting}
          size={"lg"}
          type="submit"
        >
          {form.formState.isSubmitting ? "Submitting" : type + " Event"}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
