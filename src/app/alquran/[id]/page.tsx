import AyatListClient from "@/components/ayatListClient";

export default async function Page({ params }) {
  const { id } = await params;
  const res = await fetch(`https://equran.id/api/v2/surat/${id}`);
  const data = await res.json();

  if (!data.data?.ayat) return <p>Data tidak ditemukan</p>;

  return (
    <div className="min-h-screen w-full px-4">
      <AyatListClient ayatList={data.data.ayat} />
    </div>
  );
}
