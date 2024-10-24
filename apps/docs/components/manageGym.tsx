import loading from "@/app/(home)/manageGyms/loading";
import { Gym } from "@/types/types";
import { Label } from "@radix-ui/react-dropdown-menu";
import { LoaderCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "./ui/button";
import AddMembership from "./addMembership";
import CardDemo from "./blocks/cards-demo-1";
import { MembershipCard } from "./membershipCards";
import { MembersofGym } from "./membersOfGym";
export const ManageGym = ({ gymDetails,role }: { gymDetails: Gym,role:string}) => {
  console.log("Inside Manage Gym",gymDetails);
  return (
    <div className="flex rounded-3xl p-7 flex-col items-center bg-slate-100 mx-0   scroll-smooth space-y-24 bg-muted/40 border shadow-sm ">
      <div className="flex items-center justify-center font-mono font-bold text-9xl">
        {gymDetails?.name}
      </div>
      <div className="space-y-5">
        <Image
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Description of image"
          width={1000}
          height={1000}
          className=" h-96 w-96 object-cover rounded-xl"
        ></Image>
        <div className="text-xl">{gymDetails?.address}</div>
      </div>
{role!=="user" &&       <div className="flex justify-center">
        
        <AddMembership gymName={gymDetails?.name as string} gymId={gymDetails?.id as string}></AddMembership>
      </div> }


      <div className="space-y-10 p-10 ">
        <div className="text-4xl text-center">
          Memberships
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-center">
          {gymDetails?.memberships?.map((data:any,i:any)=>{
            return <MembershipCard key={i} index={1} color={data.color} duration={data.duration} price={data.price} description={data.description as string[]}></MembershipCard>
          })}
          </div>

      </div>

     {role!=="user" && <div className="w-[70%]">
      <div className="text-4xl w-full space-y-7  ">
        <div className="text-center text-primary font-bold">
        Members of this Gym
        </div>
          
          
          <MembersofGym membersDetails={gymDetails?.members}></MembersofGym>
         
        </div>

      </div> } 
    </div>
  );
};