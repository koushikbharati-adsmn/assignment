import { Button } from '@/components/ui/button'

interface SecondaryBtnProps {
  icon: string
  label: string
  onClick: () => void
}

export default function SecondaryBtn({ icon, label, onClick }: SecondaryBtnProps) {
  return (
    <Button
      className='relative h-10 w-full items-center font-normal shadow-none hover:cursor-pointer hover:opacity-90'
      variant='outline'
      type='button'
      onClick={onClick}
    >
      <img className='absolute left-8 size-5' src={icon} alt='google' />
      {label}
    </Button>
  )
}
