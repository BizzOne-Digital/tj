import { redirect } from "next/navigation";

/** Legacy path from migration checklist — points to the families speak page. */
export default function TestimonialsRedirectPage() {
  redirect("/little-mounties-families-speak");
}
