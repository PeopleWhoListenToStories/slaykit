'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { z } from 'zod'

import { Button } from '~/components/ui/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/Form'
import { Icon } from '~/components/ui/Icon'
import { Input } from '~/components/ui/Input'
import { toast } from '~/components/ui/Toast/use-toast'
import { AUTH_TOKEN_KEY, AUTH_USER_KEY, getStorage, setStorage } from '~/helpers/storage'
import { cn } from '~/helpers/utils'

interface LoginParams {
  name: string
  password: string
}

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const t = useTranslations('LoginPage')

  const router = useRouter()

  const FormSchema = z.object({
    account: z.string().min(2, {
      message: t('invalidAccount'),
    }),
    password: z.string().min(2, {
      message: t('invalidPassword'),
    }),
  })

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      account: 'admin',
      password: 'admin',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    fetchLogin({ name: data.account, password: data.password })
  }

  const fetchLogin = async ({ name, password }: LoginParams) => {
    setIsLoading(true)
    const data = await (
      await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      })
    ).json()

    const { code, message, data: resData } = data
    setIsLoading(false)
    if (code === 200) {
      const { token, id } = resData
      setStorage(AUTH_TOKEN_KEY, token)
      setStorage(AUTH_USER_KEY, id)
      toast({
        title: `Hello ${name} !`,
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {name} {t('loginSuccessMessage')}
            </code>
          </pre>
        ),
      })
      router.push('/work')
    } else {
      toast({
        title: `Abysmal ${name} !`,
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {name} {t('loginFailMessage')} {'-> '}
              {message}
            </code>
          </pre>
        ),
      })
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
          <FormField
            control={form.control}
            name="account"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('account')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('placeholderAccount')} {...field} />
                </FormControl>
                {/* <FormDescription>This is your public display account.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('password')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('placeholderPassword')} {...field} type="password" />
                </FormControl>
                {/* <FormDescription>This is your public display password.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading && <Icon name={'Loader'} className="mr-2 h-4 w-4" />}
            {t('loginBtn')}
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icon name={'Loader'} className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icon name={'Github'} className="mr-2 h-4 w-4 " />
        )}
        <a href="https://github.com/PeopleWhoListenToStories/slaykit" target="_blank">
          GitHub
        </a>
      </Button>
    </div>
  )
}
