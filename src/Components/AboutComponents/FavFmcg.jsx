"use client";

import React from "react";
import Image from "next/image";
import Slider from "react-slick";

const brands = [
  { name: "Cadbury",  src: "/images/about/brands/cadbury.png"  },
  { name: "Dove",     src: "/images/about/brands/dove.png"     },
  { name: "CocaCola", src: "/images/about/brands/cocacola.png" },
  { name: "E45",      src: "/images/about/brands/e45.png"      },
  { name: "Fairy",    src: "/images/about/brands/fairy.png"    },
  { name: "Gillette", src: "/images/about/brands/gillete.png"  },
  { name: "Haribo",   src: "/images/about/brands/haribo.png"   },
  { name: "L'Oréal",  src: "/images/about/brands/loreal.png"   },
  { name: "Mars",     src: "/images/about/brands/mars.png"     },
  { name: "Monster",  src: "/images/about/brands/monster.png"  },
  { name: "Nestlé",   src: "/images/about/brands/nestle.png"   },
  { name: "Oral‑B",   src: "/images/about/brands/oralb.png"    },
  { name: "Red Bull", src: "/images/about/brands/redbull.png"  },
  { name: "Surf",     src: "/images/about/brands/surf.png"     },
  { name: "Britvic",  src: "/images/about/brands/britvic.png"  },
];

export default function FmcgBrands() {
  /* — slick settings — */
  const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 6000,          // bigger = slower, smaller = faster (with cssEase:"linear")
    autoplaySpeed: 0,     // must be 0 for seamless linear scroll
    cssEase: "linear",
    arrows: false,
    dots: false,
    pauseOnHover: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768,  settings: { slidesToShow: 3 } },
      { breakpoint: 640,  settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <section className="w-full py-16 bg-gradient-to-br from-[#fbd3e9] via-[#c6c2ff] to-[#d4ecff]">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#3e0074] mb-12">
        All your favourite <br className="hidden md:block" /> FMCG brands
      </h2>

      {/* Slider */}
      <div className="max-w-6xl mx-auto px-4">
        <Slider {...settings}>
          {brands.map(({ name, src }) => (
            <div key={name} className="px-4">
              <div className="w-[120px] h-[120px] mx-auto flex items-center justify-center">
                <Image
                  src={src}
                  alt={name}
                  width={110}
                  height={110}
                  priority
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
