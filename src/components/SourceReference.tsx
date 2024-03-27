import React from "react";
import Link from "next/link";

type Props = {
  url: string;
  title: string;
  description: string;
};

export default function SourceReference({ url, title, description }: Props) {
  return (
    <Link
      href={`${url}`}
      target="_blank"
      className="group text-xs rounded-lg border p-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    >
      <h2 className={`mb-1 font-bold`}>{title}</h2>
      <p className={`m-0 max-w-[30ch] opacity-50 text-balance text-ellipsis`}>
        {description}
      </p>
    </Link>
  );
}
