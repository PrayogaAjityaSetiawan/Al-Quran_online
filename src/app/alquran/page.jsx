
import CardSurat from '@/components/cardSurat';


export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/v2/surat`);
  const data = await res.json()

  if(res.status !== 200) {
    return <div className="h-[100vh] w-full flex justify-center items-center pt-24">
      <h1 className="text-2xl font-bold text-red-600">Gagal memuat data. Silakan coba lagi nanti.</h1>
    </div>
  }

  return (
    <div className=" w-full flex flex-col justify-center items-center pt-24 max-w-6xl mx-auto">
      <input
          type="text"
          placeholder="Cari surat (nama / arti / nomor)..."
          // value={search}
          // onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring"
        />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full p-4 '>
        {data.data.map((surat) => (
          <CardSurat key={surat.id} surat={surat} />
        ))}
      </div>
    </div>
  )
}
