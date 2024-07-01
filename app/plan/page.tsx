"use client";
import { BottomGradient, VanishInput } from "@/components/ui";
import React from "react";

function Plan() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const planData = (new FormData(e.currentTarget)).get("plan") as string;
    console.log(planData);
    const response = await fetch("/api/plan", {
      method: "POST",
      body: JSON.stringify({ plan: planData }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };
  const placeholders = [
    "Create a plan to build a house",
    "How to develop a mobile game",
    "Increase the revenue of a business",
  ];
  return (
    <div className="max-w-xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <div className="h-[20vh] flex flex-col justify-center  items-center px-4">
        <h2 className="mb-2 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
          Share your Plan
        </h2>
      </div>
      <VanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
        name="plan"
      />

      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
    </div>
  );
}

export default Plan;
