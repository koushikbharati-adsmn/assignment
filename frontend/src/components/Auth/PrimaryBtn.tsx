import { Button } from '@/components/ui/button'
import { LucideLoader } from 'lucide-react'

interface PrimaryBtnProps {
  isLoading: boolean
  text: string
}
export default function PrimaryBtn({ isLoading, text }: PrimaryBtnProps) {
  return (
    <Button
      className='h-10 w-full bg-[#EE3425] font-medium hover:cursor-pointer hover:bg-[#EE3425]/90'
      variant='default'
      disabled={isLoading}
    >
      {isLoading ? <LucideLoader className='size-5 animate-spin' /> : text}
    </Button>
  )
}
