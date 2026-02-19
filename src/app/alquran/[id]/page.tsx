import AyatListClient from "@/components/ayatListClient";

export default async function Page({ params }) {
  const { id } = await params;
  const res = await fetch(`https://equran.id/api/v2/surat/${id}`);
  const data = await res.json();

  if (!data.data?.ayat) return <p>Data tidak ditemukan</p>;

  return (
    <div className="min-h-screen w-full px-4">
      <AyatListClient ayatList={data.data.ayat} suratInfo={
        {
          nomor: data.data.nomor,
          nama: data.data.nama,
          namaLatin: data.data.namaLatin,
          jumlahAyat: data.data.jumlahAyat,
          tempatTurun: data.data.tempatTurun,
          arti: data.data.arti,
          deskripsi: data.data.deskripsi,
          audioFull: data.data.audioFull,
        }
      } />
    </div>
  );
}
