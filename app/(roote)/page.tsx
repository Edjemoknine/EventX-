import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className=" bg-slate-100  py-5 md:py-10">
        <div className="wrapper grid md:grid-cols-2 grid-cols-1 gap-5 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="font-bold text-[40px] leading-[48px] lg:text-[48px] lg:leading-[50px]  xl:text-[50px] xl:leading-[74px] ">
              Host, Connect, Celebrate: Your Events, Our Platform!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Book and learn helpful tips from 3,168+ mentors in world-class
              companies with our global community.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">Explore Now</Link>
            </Button>
          </div>
          <Image
            src={"/bento.jfif"}
            alt="hero"
            priority
            width={900}
            height={900}
            className="max-h-[600px] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>
      <section
        id="#events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12 "
      >
        <h2 className="font-bold text-[32px] leading-[40px] lg:text-[36px] lg:leading-[44px] xl:text-[40px] xl:leading-[48px]">
          Trust by <br /> Thousands of Events
        </h2>
        <div className="flex flex-col w-full md:flex-row gap-6">search gap</div>
      </section>
    </>
  );
}
