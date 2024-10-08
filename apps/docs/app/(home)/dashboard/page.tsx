import { Navbar } from "@/components/Navbar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
export default async function () {
  const session = await getServerSession(authOptions);
  if(!session?.user){
    redirect('/signin')
  }
  
  return (
    
    <div>
      <Navbar title={"Dashboard"}></Navbar>
    </div>
  );
}
