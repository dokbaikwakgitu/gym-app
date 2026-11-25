function Image() {
  return (
    <section className="relative isolate h-dvh overflow-hidden bg-[#111]">
      <img
        src="/hdcat.jpg"
        alt=""
        className="absolute inset-0 block size-full object-cover object-center"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-linear-to-b from-black/50 to-black/20 p-8 text-center text-white">
        <h1 className="m-0 text-[clamp(2rem,6vw,4.5rem)] font-bold leading-[1.1] tracking-[-0.02em] [text-shadow:0_2px_16px_rgb(0_0_0/0.45)]">
          Train hard. Purr harder.
        </h1>
        <p className="m-0 max-w-[44ch] text-[clamp(1rem,1.6vw,1.35rem)] leading-[1.5] opacity-[0.94]">
          "Think you're the one? Train like one. Eat like one. Be one—at
          CatGym."!
        </p>
      </div>
    </section>
  );
}

export default Image;
