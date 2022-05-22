import Link from "next/link";
import MainLayout from "../components/MainLayout";


export default function Index() {
  return (
    <MainLayout>
    <h1>Добро пожаловать</h1>

      <Link href="/about"><a>О нас</a></Link>
      <Link href="/posts"><a>Посмотреть статьи</a></Link>
    </MainLayout>
  )
}
