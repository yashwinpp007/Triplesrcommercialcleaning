import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-24">
      <div className="container-x max-w-xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-2 text-4xl font-extrabold">That page isn't here</h1>
        <p className="mt-3 text-muted">It may have moved. Try one of these instead.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">Home</Link>
          <Link href="/services" className="btn btn-outline">Services</Link>
          <Link href="/contact" className="btn btn-outline">Contact</Link>
        </div>
      </div>
    </section>
  );
}
