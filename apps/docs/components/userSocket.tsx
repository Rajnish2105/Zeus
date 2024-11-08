"use client"

import { getGymsOfOwner } from "@/actions/getGymsOfOwner";
import { getPurchasedGymsOfUser } from "@/actions/getPurchasedGyms";
import { useWebSocket } from "@/context/socketContext";
import { useState, useEffect } from "react";
import { toast } from "sonner";


export function UserSocket({children}:any){
    const { socket, user } = useWebSocket();
    const [gymIds, setGymIds] = useState<string[]>([]);
  
    useEffect(() => {
      async function fetchGymIds() {
        const response = await getPurchasedGymsOfUser();
        if (response.error) {
          toast.error(`${response.error}`, {
            closeButton: true,
            position: "top-center",
          });
        } else {
          setGymIds(response.data as []);
        }
      }
      fetchGymIds();
    }, []);
  
    useEffect(() => {
      if (user && socket && gymIds?.length > 0) {
        socket.send(
          JSON.stringify({
            type: "join-notifications-user",
            data: {
              gymIds: gymIds,
              userId:user.id
            },
          })
        );
      }
    }, [user, socket, gymIds]);

    return <>{children}</>
}