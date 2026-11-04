import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { Check, Phone } from "@/components/Icons";

export const metadata: Metadata = { title: "Thank you | Triple SR Commercial Cleaning", robots: { index: false, follow: false } };

export default function ThankYou() {
  return (
    <section className="py-20">
      <div className="container-x max-w-2xl text-center">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green text-white shadow-xl"><Check className="h-10 w-10" /></span>
        <h1 className="mt-6 text-4xl font-extrabold">Thanks. We've got your request.</h1>
        <p className="mt-4 text-lg text-muted">{site.responseSla}</p>
        <ol className="mx-auto mt-8 max-w-md space-y-3 text-left">
          {["We review your details", "We call or email to arrange a free site inspection", "You receive a clear written quote"].map((t, i) => (
            <li key={t} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4 font-semibold text-navy"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy text-sm text-white">{i + 1}</span> {t}</li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={`tel:${site.phoneTel}`} className="btn btn-primary"><Phone className="h-5 w-5" /> Call {site.phoneDisplay}</a>
          <Link href="/" className="btn btn-outline">Back to home</Link>
        </div>
      </div>
    </section>
  );
}
