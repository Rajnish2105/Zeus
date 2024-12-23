import { HoverEffect } from './ui/card-hover-effect';
import { Gym } from '@/types/types';

export const ManageGyms = ({ gyms }: { gyms: Gym[] }) => {
  return (
    <div className=" bg-muted/40 border shadow-sm transition-shadow animate-slide-up rounded-xl px-4 py-14 h-auto">
      <HoverEffect items={gyms} />
    </div>
  );
};
