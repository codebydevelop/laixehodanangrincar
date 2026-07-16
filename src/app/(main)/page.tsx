import type { Metadata } from 'next'
import HomeContainer from '@/components/HomeContainer'

export const metadata: Metadata = {
  title: 'Dịch Vụ Lái Xe Hộ Tại Đà Nẵng Uy Tín 24/7 | Rincar',
  description: 'Dịch vụ lái xe hộ tại Đà Nẵng an toàn, uy tín và chuyên nghiệp của Rincar. Đội ngũ tài xế chuyên nghiệp lái xe hộ 24/7 đưa người say về nhà an toàn.',
  keywords: 'lái xe hộ đà nẵng, tai xe lai xe ho, thue tai xe lai xe ho da nang, rincar lái xe hộ, lái xe hộ rincar đà nẵng',
  alternates: {
    canonical: '/',
  },
}

export default function Home() {
  return <HomeContainer />
}
