import { Facebook } from './ui/facebook';
import { Instagram } from './ui/instagram';
import { cn } from '@/lib/utils';

function SocMed() {
  return (
    <div className="m-[15px] flex h-[25px] gap-[15px]">
      <Facebook />
      <Instagram />
    </div>
  );
}

export default SocMed;
