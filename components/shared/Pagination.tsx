"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";
type PaginationProps = {
  urlPramasName: string;
  page: number | string;
  total: number;
};
const Pagination = ({ urlPramasName, page, total }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const onclick = (btnType: string) => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1;

    const newURL = formUrlQuery({
      params: searchParams.toString(),
      key: urlPramasName || "page",
      value: pageValue.toString(),
    });
    router.push(newURL, { scroll: false });
  };

  return (
    <div className="flex gap-2">
      <Button
        size={"lg"}
        className=""
        variant={"outline"}
        onClick={() => onclick("prev")}
        disabled={Number(total) <= 1}
      >
        Previous
      </Button>
      <Button
        size={"lg"}
        className="w-28"
        variant={"outline"}
        onClick={() => onclick("next")}
        disabled={Number(total) >= 1}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
