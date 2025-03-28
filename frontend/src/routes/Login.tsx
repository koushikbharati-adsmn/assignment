import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginFormSchema } from '@/lib/validations'
import { Checkbox } from '@/components/ui/checkbox'
import { Link } from 'react-router'
import { useLoginMutation } from '@/hooks/mutations/useLoginMutation'
import AuthLayout from '@/components/Auth/AuthLayout'
import { toast } from 'sonner'
import SecondaryBtn from '@/components/Auth/SecondaryBtn'
import PrimaryBtn from '@/components/Auth/PrimaryBtn'

export default function LoginPage() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false
    }
  })

  const { mutateAsync, isPending } = useLoginMutation()

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    mutateAsync({
      email: values.email,
      password: values.password
    })
  }

  const handleOtherLogins = () => {
    toast.info("This feature isn't available yet. Please try logging with email and password.")
  }
  return (
    <AuthLayout>
      <div className='relative z-1 w-full max-w-md rounded-t-3xl bg-[#FAFAFA] p-8'>
        <p className='mb-1 text-sm font-semibold uppercase'>Welcome Back!</p>
        <h3 className='mb-10 text-3xl font-bold'>Log in to your Account</h3>
        <Form {...form}>
          <form id='login-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className='h-10 bg-white shadow-none' type='text' placeholder='Type here...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className='h-10 bg-white shadow-none'
                      type='password'
                      placeholder='Type here...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center justify-between'>
              <FormField
                control={form.control}
                name='remember'
                render={({ field }) => (
                  <FormItem className='flex items-center'>
                    <FormControl>
                      <Checkbox
                        className='bg-white shadow-none'
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Remember me</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Link to='/' className='text-primary text-sm font-medium hover:underline'>
                Forgot password?
              </Link>
            </div>

            <PrimaryBtn isLoading={isPending} text='Log In' />

            <div className='relative flex items-center font-bold before:mr-4 before:flex-1 before:border-b before:border-neutral-200 after:ml-4 after:flex-1 after:border-b after:border-neutral-200'>
              Or
            </div>

            <div className='flex flex-col gap-2'>
              <SecondaryBtn icon='/google.svg' label='Log in with Google' onClick={handleOtherLogins} />
              <SecondaryBtn icon='/facebook.svg' label='Log in with Facebook' onClick={handleOtherLogins} />
              <SecondaryBtn icon='/apple.svg' label='Log in with Apple' onClick={handleOtherLogins} />
            </div>

            <div className='mt-10 mb-8 text-center text-sm'>
              New User?&nbsp;
              <Link className='font-bold uppercase underline' to='/signup'>
                Sign Up Here
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </AuthLayout>
  )
}
