import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from "sonner"
import { Link, useNavigate } from 'react-router-dom'

const signupForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

type SignUpForm = z.infer<typeof signupForm>

export function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>()

  async function handleSignUp(data: SignUpForm) {

    try {
      console.log(data)

      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success('Estabelecimento cadastrado com sucesso.', {
        action: {
          label: 'Login',
          onClick: () => navigate('/sign-in'),
        }
      });

    } catch (error) {
      toast.error('Erro ao cadastrar estabelecimento.');
    }

  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button variant="ghost" asChild>
          <Link to="/sign-in" className='absolute right-8 top-8'>
            Fazer login
          </Link>
        </Button>
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta gratis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>

          <form className='space-y-4' onSubmit={handleSubmit(handleSignUp)}>
            <div className='space-y-2'>
              <Label htmlFor='email'>Nome do estabelecimento</Label>
              <Input id='restaurantName' type='text' {...register('restaurantName')} />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Seu nome</Label>
              <Input id='managerName' type='text' {...register('managerName')} />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Seu e-mail</Label>
              <Input id='email' type='email' {...register('email')} />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Seu celular</Label>
              <Input id='phone' type='tel' {...register('phone')} />
            </div>

            <Button disabled={isSubmitting} className='w-full' type='submit'>
              Finalizar cadastro
            </Button>
            <p className='px-6 text-center text-sm leading-relaxed text-muted-foreground'>
              Ao continuar, voce concorda com nossos{' '}
              <a className='underline underline-offset-4' href=''>
                termos de servico
              </a>
              {' '}e{' '}
              <a className='underline underline-offset-4' href=''>
                politicas de privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  )
}