type SearchParams = Promise<{
  query: string | "baba";
  page: string | "1";
  sort?: string;
}>

export default async function List({searchParams}: {searchParams: SearchParams}) {


  const param = await searchParams

  return (
    <div>
    <h1>Résultats pour : {param.query}</h1>
    <p>Page actuelle : {param.page}</p>
    <p>Trier par : {param.sort}</p>
  </div>
  )
}
