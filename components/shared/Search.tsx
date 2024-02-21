"use client";
import { useState, useEffect } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const Search = ({ placeholder }: { placeholder: string }) => {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const debounce = setTimeout(() => {
      let newURl = "";
      if (query) {
        newURl = formUrlQuery({
          params: searchParams.toString(),
          value: query,
          key: "query",
        });
      } else {
        newURl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });
      }
      router.push(newURl, { scroll: false });
    }, 300);
    return () => clearTimeout(debounce);
  }, [query, searchParams]);

  return (
    <div className="flex justify-center items-center w-full overflow-hidden min-h-[54px] rounded-full bg-slate-100 px-4 py-2">
      <SearchIcon />
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="p-regular-16 border-0 bg-slate-100 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default Search;
