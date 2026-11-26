import { cn } from '@/lib/utils';
import FootNav from './FootNav';

function Footer({ className }) {
  return (
    <footer className={cn('flex flex-col justify-end bg-[#ad9405]', className)}>
      <FootNav />
      <p className="mx-auto flex w-[99%] flex-col items-center border-t-2 border-black bg-[var(--color-dark--1)] p-[15px] text-[13px]">
        &copy; Copyright {new Date().getFullYear()} by CatGym Inc.
      </p>
    </footer>
  );
}

export default Footer;
