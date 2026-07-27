import Image from "next/image";
import AuthForm from "./auth-form";

const avatars = [
  "/images/avatar-1.jpg",
  "/images/avatar-2.jpg",
  "/images/avatar-3.jpg",
  "/images/avatar-4.jpg",
];

const BG = "/images/biotime.png";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Image
        src={BG}
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#020617]/35" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 gap-6 p-4 md:p-6 lg:grid-cols-[0.95fr_1.15fr] lg:items-stretch lg:gap-10 lg:p-8 xl:gap-12">
        <div className="video-frame-glow h-full min-h-[42vh] shadow-[0_20px_60px_rgba(0,0,0,0.25)] lg:min-h-[calc(100vh-4rem)]">
          <section className="video-frame-inner relative flex h-full min-h-[42vh] flex-col justify-between overflow-hidden border border-white/20 lg:min-h-[calc(100vh-4rem)]">
            <video
              className="absolute inset-0 h-full w-full object-cover object-center"
              autoPlay
              muted
              loop
              playsInline
              poster="/images/biotime.png"
            >
              <source src="/videos/biotime.webm" type="video/webm" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/55" />

            <div className="animate-fade-up relative z-10 flex flex-wrap items-center gap-3 p-6 md:gap-4 md:p-8">
              <div className="flex items-center">
                {avatars.map((src, index) => (
                  <div
                    key={src}
                    className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-md"
                    style={{
                      marginLeft: index === 0 ? 0 : -12,
                      zIndex: avatars.length - index,
                    }}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                ))}
                <div className="animate-drift relative z-20 -ml-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-black shadow-md">
                  12k
                </div>
              </div>
              <div className="text-white">
                <p className="font-display text-sm font-bold tracking-wide md:text-base">
                  JOIN WITH 30k+ USERS!
                </p>
                <p className="text-xs text-white/80 md:text-sm">
                  Let&apos;s see our happy customer
                </p>
              </div>
            </div>

            <div className="animate-fade-up-delay relative z-10 p-6 md:p-8 lg:p-10">
              <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-brand sm:text-5xl lg:text-6xl">
                Back to nature.
              </h1>
              <p className="mt-3 max-w-sm text-sm text-white/90 md:text-base">
                Let get started with your 30 days free trial
              </p>
            </div>
          </section>
        </div>

        <section className="flex items-center justify-center py-2 lg:py-0">
          <AuthForm />
        </section>
      </div>
    </main>
  );
}
