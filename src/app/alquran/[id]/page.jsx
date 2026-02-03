import AyatListClient from "@/components/ayatListClient";

export default async function Page({ params }) {
  const { id } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/v2/surat/${id}`, { cache: "no-store" });
  const data = await res.json();

  if (!data.data?.ayat) return <p>Data tidak ditemukan</p>;

  return (
    <div className="min-h-screen w-full px-4">
      <AyatListClient ayatList={data.data.ayat} />
    </div>
  );
}
