import Image from "next/image";
import type { StaffMember } from "@/data/staff";
import { resolveImageUrl } from "@/lib/uploads-shared";

export function StaffCard({ member }: { member: StaffMember }) {
  const photo = resolveImageUrl(member.photo);
  return (
    <article className="overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex justify-center bg-mountie-blue/5 p-2">
        <Image
          src={photo}
          alt={member.name}
          width={800}
          height={1000}
          className="h-auto w-full max-h-[520px] object-contain object-[top_center]"
          sizes={member.featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
          unoptimized={photo.startsWith("/api/uploads/")}
        />
      </div>
      <div className="p-6">
        <h2 className="font-display text-xl font-bold uppercase text-deep-navy md:text-2xl">
          {member.name}
        </h2>
        <p className="mt-1 font-semibold text-electric-blue">{member.role}</p>
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="mt-3 block text-sm text-mountie-blue/70 hover:text-electric-blue"
          >
            {member.email}
          </a>
        )}
        {member.phone && (
          <a
            href={`tel:${member.phone.replace(/\D/g, "")}`}
            className="block text-sm text-mountie-blue/70 hover:text-electric-blue"
          >
            {member.phone}
          </a>
        )}
      </div>
    </article>
  );
}
