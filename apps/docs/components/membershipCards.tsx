'use client';
import { CheckCheckIcon, Zap } from 'lucide-react';
import { CardHeader, CardContent, Card, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';
import { MembershipCardProps } from '@/types/types';
import { joinMembership } from '@/actions/joinMembership';
import { toast } from 'sonner';
import { useWebSocket } from '@/context/socketContext';
import { usePathname } from 'next/navigation';
import { ChoosePlan } from './choosePlan';
import { addNotifications } from '@/actions/addNotifications';
import { useRecoilState } from 'recoil';
import { warningNotificationsState } from '@/states/notifications';

export function MembershipCard({
  id,
  price,
  duration,
  description,
  color,
  index,
  gymId,
  membershipUserDetails,
}: MembershipCardProps) {
  const url = usePathname();

  const isUser = url.startsWith('/user/');

  const [warningNotification, setWarningNotifications] = useRecoilState(
    warningNotificationsState
  );
  const { sendMessage, user } = useWebSocket();

  async function handleChoosePlan() {
    const response = await joinMembership(id, gymId);
    if (response.data) {
      if (response.warningNotifications.length > 0) {
        const resolvedIds = new Set(
          response.warningNotifications.map((n) => n.id)
        );
        setWarningNotifications((prev) =>
          prev.filter((data) => !resolvedIds.has(data.id!))
        );
      }
      let message = `${user?.name} with Id ${user?.id} joined at ${response.gymDetails.name}`;
      const { data } = await addNotifications(
        message,
        new Date(),
        response.gymDetails.ownerId
      );
      sendMessage('membership-purchased', {
        userId: user?.id,
        userName: user?.name,
        gymId: gymId,
        gymName: response.gymDetails.name,
        notificationMetaData: data,
      });

      toast.success('Membership sucessfully purchased', {
        closeButton: true,
        position: 'top-center',
      });
    } else {
      toast.error(`${response.error}`, {
        closeButton: true,
        position: 'top-center',
      });
    }
  }

  const gifUrls = [
    'https://media1.tenor.com/m/MxTl6a26CpAAAAAC/lr-agl-super-saiyan-god-ss-goku-and-vegeta-lr-agl-ssb-goku-and-vegeta.gif',
    'https://media1.tenor.com/m/899ZxzqJhs0AAAAC/lr-agl-goku-carnival.gif',
    'https://media1.tenor.com/m/AtiBkSK7X3IAAAAC/dokkan-dokkan-battle.gif',
  ];

  const getGifUrl = (index: any) => gifUrls[index % gifUrls.length];
  const gifUrl = getGifUrl(index);
  const activeMembership =
    membershipUserDetails?.find(
      (details) => details.membershipId === id && details.expired === false
    ) || false;

  return (
    <div
      className="relative bg-black rounded-md"
      style={{
        boxShadow: `3px 10px 6px -1px black, 3px 8px 4px -1px black`,

        // Shadow on container
      }}
    >
      <Card
        className={cn(
          'group  w-full cursor-pointer overflow-hidden relative card rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border-2 border-black dark:border-neutral-800 bg-gray-300',

          // Preload hover image by setting it in a pseudo-element
          'before:bg-[url(https://media1.tenor.com/m/h04_fXuPkZQAAAAC/dbz-goku.gif)] before:fixed before:inset-0 before:opacity-0 before:z-[-1]',
          'hover:bg-[url(https://media1.tenor.com/m/h04_fXuPkZQAAAAC/dbz-goku.gif)]  hover:translate-x-[-50px] hover:translate-y-[-50px] hover:scale-110 hover:z-10',
          "hover:after:content-[''] hover:after:absolute  hover:after:bg-black hover:after:opacity-10",
          'transition-all duration-500',
          //text
          'hover:text-[rgba(0,0,0,0.7)] hover:shadow-[1px_1px_2px_rgba(0,0,0,0.3)]'
        )}
      >
        {activeMembership && (
          <div className="flex text-green-500 ">
            <CheckCheckIcon className="text-green-500"></CheckCheckIcon>Active
          </div>
        )}
        {/* Card content here */}
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{duration.toString()} months</CardTitle>
            <Zap fill={color}></Zap>
          </div>
        </CardHeader>
        <CardContent className="font-bold">
          <ul className="list-disc list-inside space-y-2">
            {description.map((x, i) => {
              return <li key={i}>{x}</li>;
            })}
          </ul>

          <p className="mt-4 text-2xl font-bold">₹ {price}</p>
          {isUser && (
            <ChoosePlan
              handleChoosePlan={handleChoosePlan}
              activeMembership={activeMembership ? true : false}
            />
            // <Button
            // onClick={handleChoosePlan}
            // className="mt-4  pointer-events-auto  z-30 w-full"
            // disabled={activeMembership}
            // >
            //   {activeMembership ? <span className="text-green-400" >Active plan</span> : "Choose Plan"}
            // </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
