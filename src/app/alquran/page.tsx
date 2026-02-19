
import { surat } from '@/types/surat';
import CardList from '@/components/suratList';


export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/v2/surat`);
  const resData = await res.json();
  const data : surat[] = resData.data;

  if(res.status !== 200) {
    return <div className="h-[100vh] w-full flex justify-center items-center pt-24">
      <h1 className="text-2xl font-bold text-red-600">Gagal memuat data. Silakan coba lagi nanti.</h1>
    </div>
  }

  return (
    <div className=" w-full flex flex-col justify-center items-center pt-24 max-w-6xl mx-auto">
      <CardList data={data} />
    </div>
  )
}
