"use client";

export default function Hero() {
  return (
    <section className="bg-[#1A1A2E] relative overflow-hidden px-4 pt-12 pb-0">
      <div className="max-w-4xl mx-auto relative z-10">

        {/* Big headline */}
        <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-3">
          <span className="text-white">Все события</span>
          <br />
          <span className="text-[#99CCFF]">вашего города</span>
        </h1>

        {/* Search bar */}
        <div className="relative max-w-2xl mx-auto mt-8 mb-14">
          <div className="flex rounded-2xl overflow-hidden border border-white/12 bg-white/8 backdrop-blur-sm">
            <input
              type="text"
              placeholder="Концерт, театр, выставка, место..."
              className="flex-1 bg-transparent px-5 py-4 text-white placeholder-gray-500 text-sm focus:outline-none"
            />
            <button className="bg-[#31CDCF] hover:bg-[#28b5b7] text-[#1A1A2E] font-bold text-sm px-7 transition-colors whitespace-nowrap">
              Найти
            </button>
          </div>
        </div>
      </div>

      {/* Haifa cityscape — modern city + Mt. Carmel slope */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none">
        <svg
          viewBox="0 0 1440 150"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMax slice"
          className="w-full block"
        >
          {/* Mountain — smooth Carmel ridge behind everything */}
          <path
            d="M0,150 L0,115
               C100,108 200,98 310,88
               C400,80 470,74 540,70
               C600,67 650,65 700,65
               C750,65 800,68 860,74
               C930,82 1010,94 1100,106
               C1180,116 1300,128 1440,136
               L1440,150 Z"
            fill="#10132a"
            opacity="0.85"
          />

          {/* City buildings — flat-base city center (left & center) */}
          <path
            d="
              M0,150 L0,138
              L50,138 L50,130 L80,130 L80,124 L110,124 L110,130 L130,130
              L130,118 L148,118 L148,108 L162,108 L162,98
              L162,88 L172,88 L172,80 L180,80 L180,72 L188,72 L188,62 L196,62 L196,72 L204,72 L204,80 L212,80 L212,88 L222,88
              L222,98 L236,98 L236,108 L250,108
              L250,118 L265,118 L265,108 L278,108 L278,96 L288,96 L288,84 L298,84 L298,74 L308,74 L308,62 L318,62 L318,52 L326,52 L326,44 L334,44 L334,52 L342,52 L342,62 L350,62 L350,74 L360,74 L360,84 L370,84 L370,96 L380,96
              L380,108 L394,108 L394,118 L408,118
              L408,108 L422,108 L422,96 L432,96 L432,84 L442,84 L442,72 L452,72 L452,60 L462,60 L462,50 L470,50 L470,40 L478,40 L478,50 L486,50 L486,60 L494,60 L494,72 L504,72 L504,84 L514,84
              L514,96 L528,96 L528,108 L542,108
              L542,98 L556,98 L556,86 L566,86 L566,74 L576,74 L576,62 L588,62 L588,50 L598,50 L598,38 L608,38 L608,28 L616,28 L616,20 L624,20 L624,28 L632,28 L632,38 L640,38 L640,50 L650,50 L650,62 L660,62 L660,74 L670,74 L670,86 L680,86
              L680,98 L694,98 L694,108 L708,108
              L708,98 L722,98 L722,86 L732,86 L732,74 L742,74 L742,62 L752,62 L752,50 L762,50 L762,40 L772,40 L772,30 L780,30 L780,22 L788,22 L788,30 L796,30 L796,40 L804,40 L804,50 L812,50 L812,62 L822,62 L822,74 L832,74 L832,86 L842,86
              L842,98 L856,98 L856,108 L870,108
              L870,100 L884,100 L884,90 L894,90 L894,80 L904,80 L904,70 L914,70 L914,60 L924,60 L924,72 L934,72 L934,82 L944,82 L944,92 L954,92
              L954,102 L968,102 L968,112 L982,112
              L982,104 L996,104 L996,95 L1006,95 L1006,87 L1012,87 L1012,95 L1022,95 L1022,106 L1036,106
            "
            fill="#0b0d1c"
            stroke="none"
            opacity="0.97"
          />

          {/* Close the city path + add right hillside buildings as SEPARATE rectangles on slope */}
          <path d="M1036,106 L1036,150 L0,150 Z" fill="#0b0d1c" opacity="0.97" />

          {/* Right hillside — individual buildings ON the slope, NOT connected staircase */}
          {/* Each building: separate rect sitting on the Carmel slope */}
          <rect x="1055" y="90"  width="32" height="24" fill="#0b0d1c" opacity="0.97"/>
          <rect x="1100" y="96"  width="26" height="22" fill="#0b0d1c" opacity="0.97"/>
          <rect x="1138" y="100" width="20" height="18" fill="#0b0d1c" opacity="0.97"/>
          <rect x="1170" y="88"  width="28" height="26" fill="#0b0d1c" opacity="0.97"/>
          <rect x="1212" y="96"  width="22" height="20" fill="#0b0d1c" opacity="0.97"/>
          <rect x="1248" y="104" width="18" height="16" fill="#0b0d1c" opacity="0.97"/>
          <rect x="1280" y="110" width="24" height="15" fill="#0b0d1c" opacity="0.97"/>
          <rect x="1316" y="116" width="18" height="14" fill="#0b0d1c" opacity="0.97"/>
          <rect x="1352" y="122" width="20" height="12" fill="#0b0d1c" opacity="0.97"/>
          <rect x="1388" y="128" width="16" height="10" fill="#0b0d1c" opacity="0.97"/>

          {/* Ground line */}
          <rect x="0" y="147" width="1440" height="3" fill="#07090f" opacity="1" />
        </svg>
      </div>
    </section>
  );
}
