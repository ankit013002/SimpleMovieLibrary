import Image from "next/image";

const HeaderBanner = () => {
  return (
    <div className="absolute inset-0">
      <Image
        src="/moviebanner.jpg"
        alt="Film Poster"
        fill
        className="object-cover opacity-40"
        priority
      />
    </div>
  );
};

export default HeaderBanner;
