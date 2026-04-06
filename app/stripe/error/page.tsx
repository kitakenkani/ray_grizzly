import { Button } from '@/components/ui/button'
import { CircleX } from 'lucide-react'
import Link from 'next/link'

export default function StripeError () {
  return (
        <div className="h-screen">
            <div className="mt-12 md:max-w-[50vw] mx-auto">
                <CircleX className="text-red-600 w-16 h-16 mx-auto my-6" />
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 dark:text-slate-50 font-semibold text-center">Something went wrong</h3>
                    <p className='text-gray-600 dark:text-slate-300 my-2'>Your payment could not be processed. Please try again.</p>
                    <Button asChild className='mt-5'>
                        <Link href="/">
                            Go back
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
  )
}
