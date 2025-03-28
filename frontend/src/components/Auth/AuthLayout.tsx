import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router'

export default function AuthLayout({ children }: PropsWithChildren) {
  const token = localStorage.getItem('token')

  if (token) return <Navigate to='/' />

  return (
    <div className='relative flex min-h-screen w-full items-end justify-center gap-40 bg-[url("/bg-img.png")] bg-cover bg-center bg-no-repeat'>
      <div className='relative z-1 self-center'>
        <img className='mb-16 h-16' src='/logo_highbridge.png' alt='logo' />

        <div className='max-w-sm'>
          <h2 className='mb-6 text-2xl font-bold text-white'>Building the future...</h2>
          <p className='leading-loose font-light text-white'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
        </div>
      </div>
      {children}
      <div className='bg-overlay absolute inset-0' />
    </div>
  )
}
