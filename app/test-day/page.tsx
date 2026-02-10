import Image from 'next/image';

export default function StickerPage() {
  // The URL you extracted
  const stickerUrl = 'https://media1.giphy.com/media/v1.Y2lkPTI2MmQ0YzRlb3locGRtZGJpb3c2bTMyM2tjZzQwdGZycG5wZzJiZ2k0cmcwamk2ZSZlcD12MV9naWZzX2dpZklkJmN0PXM/MGS5vaOVCFMBmjB8Ej/200.webp';

  return (
    

        <div className="bg-white/10 p-8 rounded-xl backdrop-blur-sm border border-white/20">
          <Image
            src={stickerUrl}
            alt="Anime couple sticker"
            width={200}
            height={200}
            className="object-contain hover:scale-110 transition-transform duration-300"
            unoptimized={true} // Keeps animation crisp and bypasses server optimization
            priority // Loads this image immediately
          />
        </div>
  );
}