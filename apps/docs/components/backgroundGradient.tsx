"use client";
import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import { IconAppWindow } from "@tabler/icons-react";
import Image from "next/image";
import moment from "moment";
import { CheckIcon } from "lucide-react";
import Link from "next/link";

export function BackgroundGradientDemo({dateJoined,membershipDetails}:any) {
  let JoinedDate=moment(dateJoined).format('DD/MM/YYYY')
  
  const originalDate = moment(dateJoined);

const monthsToSubtract = membershipDetails.duration;
const addMonths = originalDate.clone().add(monthsToSubtract,'months') 
console.log(moment(addMonths).format('DD/MM/YYYY'))// Number of months to subtract




// Calculate the difference in days
const differenceInDays = addMonths.diff(moment(), 'days');
console.log(moment().format('DD/MM/YY'))
  return (
    <div>
      <BackgroundGradient containerClassName="" className="rounded-[22px] w-auto  p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <Image
          src={`https://mir-s3-cdn-cf.behance.net/project_modules/1400/00d3e180778075.5ceb8de957e85.jpg`}
          alt="jordans"
          height="400"
          width="400"
          className="object-cover rounded-lg"
        />
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          {membershipDetails.gym.name}
        </p>

        <p className="text-sm text-neutral-600 dark:text-neutral-400">
        {membershipDetails.gym.address}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
        +91 {membershipDetails.gym.phoneNumber}
        </p>
        <p className="text-md font-bold mt-5">
          Membership Details
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
       <b className="text-black"> Duration:</b> {membershipDetails.duration} months
        </p>

        <p className="text-sm text-neutral-600 dark:text-neutral-400">
       <b className="text-black"> Price:</b> Rs. {membershipDetails.price} 
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex space-x-2">
          <b className="text-black"> isActive :</b> 
       <div className="flex items-center bg-green-500 h-5 w-30 text-white font-semibold px-2 rounded-full">
      <CheckIcon className="h-5 w-5 mr-2" />
      <span>{differenceInDays} Days Left</span>
    </div>
          </div>

        </p>
        <Link target="_blank" href={`/user/view/${membershipDetails.gymId}`} className="rounded-full p-2 w-20 text-center text-white flex justify-center items-center  bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
         See More
          {/* <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
            $100
          </span> */}
        </Link>
      </BackgroundGradient>
    </div>
  );
}
