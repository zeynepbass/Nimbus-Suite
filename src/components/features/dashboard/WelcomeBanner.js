import Image from "next/image";

export default function WelcomeBanner({ name }) {
  return (
    <div className="relative min-h-40">
      <div
        className="min-h-40 rounded-xl bg-cover bg-center"
        style={{ backgroundImage: "url('/images/wave-haikei.png')" }}
      >
        <Image
          src="/images/curve-rafiki.png"
          alt=""
          width={280}
          height={280}
          priority
          className="absolute -top-[80px] left-0 w-70 h-70 z-20 pointer-events-none hidden md:block"
        />

        <div className="relative z-10 min-h-40 flex flex-col justify-center py-4 pl-6 md:pl-75 pr-6">
          <span className="text-sm text-white/80">Hoş geldin 👋</span>
          <h2 className="text-xl md:text-2xl font-semibold text-white">{name}</h2>
          <p className="text-sm text-white/70 mt-1">
            <span className="font-bold text-xl">Doğru yoldasınız!</span>
            <br />
            Son faaliyetleriniz tutarlı ilerleme ve güçlü bir katılım gösteriyor.
            <br />
            Geliştirmeye, iyileştirmeye ve sınırlarınızı zorlamaya devam edin;
            sonuçlar giderek artıyor.
          </p>
        </div>
      </div>
    </div>
  );
}
