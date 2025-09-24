// src/components/sections/TeamSection.tsx
"use client";

import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

export default function TeamSection() {
  const team: TeamMember[] = [
    {
      name: "サラ・キム",
      role: "創設者 & CEO",
      description:
        "皮膚科医として15年間のスキンケア研究と自然由来成分開発の経験を持つ専門家です。",
      image:
        "https://readdy.ai/api/search-image?query=Professional%20Korean%20woman%20CEO%20in%20elegant%20business%20attire%2C%20confident%20smile%2C%20natural%20beauty%2C%20minimalist%20background%2C%20professional%20portrait%20lighting%2C%20sophisticated%20appearance%2C%20natural%20makeup%2C%20modern%20corporate%20style&width=400&height=500&seq=team-1&orientation=portrait",
    },
    {
      name: "ジェームス・パク",
      role: "製品開発責任者",
      description:
        "自然由来成分の抽出と処方を専門とする生化学者として、美容業界で12年以上の経験を持ちます。",
      image:
        "https://readdy.ai/api/search-image?query=Professional%20Korean%20man%20scientist%20in%20lab%20coat%2C%20friendly%20expression%2C%20natural%20lighting%2C%20clean%20modern%20laboratory%20background%2C%20professional%20portrait%2C%20confident%20demeanor%2C%20skincare%20research%20environment&width=400&height=500&seq=team-2&orientation=portrait",
    },
    {
      name: "エミリー・チェン",
      role: "サステナビリティ責任者",
      description:
        "優れた製品を提供しながら地球環境を保護する取り組みに専念している環境科学者です。",
      image:
        "https://readdy.ai/api/search-image?query=Professional%20Asian%20woman%20environmental%20scientist%2C%20warm%20smile%2C%20natural%20beauty%2C%20sustainable%20background%20with%20plants%2C%20eco-friendly%20atmosphere%2C%20professional%20portrait%2C%20modern%20office%20environment&width=400&height=500&seq=team-3&orientation=portrait",
    },
  ];

  return (
    <section className="py-20 px-6 bg-white" aria-labelledby="team-heading">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            id="team-heading"
            className="text-4xl font-serif text-stone-800 mb-6"
          >
            私たちのチーム
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            最高品質の自然派スキンケア製品をお届けするという使命に情熱を注ぐ専門家たちをご紹介します。
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {team.map((member, index) => (
            <article
              key={member.name}
              className="text-center group"
              aria-labelledby={`team-member-${index}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6">
                <Image
                  src={member.image}
                  alt={`${member.name} - ${member.role}のプロフィール写真`}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={85}
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent"></div>
              </div>

              <div className="space-y-2">
                <h3
                  id={`team-member-${index}`}
                  className="text-xl font-medium text-stone-800"
                >
                  {member.name}
                </h3>
                <div className="text-stone-600 font-medium text-sm uppercase tracking-wide">
                  {member.role}
                </div>
                <p className="text-stone-600 leading-relaxed mt-4">
                  {member.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
