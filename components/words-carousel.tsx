import { WordsCarouselClient } from "./words-carousel/words-carousel-client";

const WORDS = [
  "DESPERTAR", "SENTIR", "CALIDEZ", "NOSTALGIA", "MOMENTO",
  "AUTENTICIDAD", "DISFRUTAR", "COMPARTIR", "RECONECTAR"
];

export function WordsCarousel() {
  return (
    <section className="py-12 bg-[#570B0A] overflow-hidden w-full" style={{ contain: "content" }}>
      <div className="w-full overflow-hidden">
        <div className="inline-block whitespace-nowrap words-track">
          {WORDS.map((word, index) => (
            <div
              key={index}
              className="inline-block mx-8 text-5xl md:text-7xl font-bold font-display tracking-tight text-[#F2BC57] word"
            >
              {word}
            </div>
          ))}
        </div>
      </div>
      <WordsCarouselClient />
    </section>
  );
}
