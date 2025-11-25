'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { z } from 'zod'
import { useCart } from '@/lib/store/cart'
import { generateWhatsAppLink } from '@/lib/generate-whatsapp-link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { toast } from 'sonner'
import { CircleNotch } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

const formSchema = z.object({
  nome: z.string().min(3, 'Nome completo é obrigatório'),
  telefone: z
    .string()
    .min(15, 'Telefone inválido')
    .max(15, 'Telefone inválido')
    .regex(/^\(\d{2}\)\s\d\s\d{4}-\d{4}$/, 'Formato inválido. Use (99) 9 9999-9999'),
  cep: z.string().min(8, 'CEP inválido').max(9, 'CEP inválido'),
  endereco: z.string().min(5, 'Endereço é obrigatório'),
  numero: z.string().min(1, 'Número é obrigatório'),
  bairro: z.string().min(3, 'Bairro é obrigatório'),
  cidade: z.string().min(3, 'Cidade é obrigatória'),
  referencia: z.string().optional(),
  pagamento: z.string().min(1, 'Forma de pagamento é obrigatória'),
  observacoes: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface CheckoutFormProps {
  onSuccess?: () => void
}

export function CheckoutForm({ onSuccess }: CheckoutFormProps) {
  const { getItems, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [isCepLoading, setIsCepLoading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      telefone: '',
      cep: '',
      endereco: '',
      numero: '',
      bairro: '',
      cidade: '',
      referencia: '',
      pagamento: '',
      observacoes: '',
    },
  })

  const handleCepBlur = async () => {
    const cep = form.getValues('cep').replace(/\D/g, '')

    if (cep.length !== 8) return

    try {
      setIsCepLoading(true)
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

      if (!response.ok) throw new Error('Erro ao buscar CEP')

      const data = await response.json()

      if (data.erro) {
        toast.error('CEP não encontrado. Confira se digitou corretamente.')
        return
      }

      form.setValue('endereco', data.logradouro || '')
      form.setValue('bairro', data.bairro || '')
      form.setValue('cidade', data.localidade || '')
    } catch (error) {
      console.error(error)
      toast.error('Não foi possível buscar o CEP. Tente novamente.')
    } finally {
      setIsCepLoading(false)
    }
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '')

    if (numbers.length <= 2) {
      return `(${numbers}`
    }

    if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 3)} ${numbers.slice(3)}`
    }

    if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 3)} ${numbers.slice(3, 7)}-${numbers.slice(7)}`
    }

    return value
  }

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value)
    form.setValue('telefone', formatted)
  }

  const handleCepChange = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 8) {
      const formatted = numbers.replace(/^(\d{5})(\d{3})$/, '$1-$2')
      form.setValue('cep', formatted)
    }
  }

  async function onSubmit(values: FormValues) {
    const items = getItems()

    if (items.length === 0) {
      toast.error('Seu carrinho está vazio.')
      return
    }

    try {
      setIsLoading(true)

      const url = generateWhatsAppLink({
        itens: items,
        dadosCliente: {
          nome: values.nome,
          telefone: values.telefone,
          cep: values.cep,
          endereco: values.endereco,
          numero: values.numero,
          bairro: values.bairro,
          cidade: values.cidade,
          referencia: values.referencia,
          pagamento: values.pagamento,
          observacoes: values.observacoes,
        },
      })

      if (onSuccess) {
        onSuccess()
      }

      clearCart()

      window.open(url, '_blank')

      toast.success('Pedido enviado para o WhatsApp!')
    } catch (error) {
      console.error(error)
      toast.error('Não foi possível enviar seu pedido. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="rounded-xl border border-purple-100 bg-white/80 p-6 shadow-sm backdrop-blur-sm"
    >
      <h2 className="mb-1 text-lg font-semibold text-purple-900">Finalize seu pedido</h2>
      <p className="mb-6 text-sm text-purple-700">
        Preencha seus dados para montarmos seu pedido e enviar tudo prontinho para o WhatsApp.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4 rounded-lg bg-purple-50/60 p-4">
            <h3 className="text-sm font-semibold text-purple-900">Dados pessoais</h3>

            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Como está no seu WhatsApp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(81) 9 9999-9999"
                      value={field.value}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4 rounded-lg bg-purple-50/60 p-4">
            <h3 className="text-sm font-semibold text-purple-900">Endereço de entrega</h3>

            <div className="grid gap-4 sm:grid-cols-[1.5fr,1fr]">
              <FormField
                control={form.control}
                name="cep"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>CEP</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="00000-000"
                        value={field.value}
                        onChange={(e) => handleCepChange(e.target.value)}
                        onBlur={handleCepBlur}
                      />
                    </FormControl>
                    {isCepLoading && (
                      <CircleNotch className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-purple-600" />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numero"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input placeholder="Número" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="endereco"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Rua, avenida, condomínio..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="bairro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu bairro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Sua cidade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="referencia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ponto de referência</FormLabel>
                  <FormControl>
                    <Input placeholder="Apartamento, portão verde, perto de..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4 rounded-lg bg-purple-50/60 p-4">
            <h3 className="text-sm font-semibold text-purple-900">Pagamento e observações</h3>

            <FormField
              control={form.control}
              name="pagamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Forma de pagamento</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione como prefere pagar" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pix">Pix</SelectItem>
                      <SelectItem value="credito">Cartão de crédito</SelectItem>
                      <SelectItem value="debito">Cartão de débito</SelectItem>
                      <SelectItem value="dinheiro">Dinheiro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="observacoes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alguma observação?</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: entregar na portaria, tirar foto da entrega, alergias..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="flex w-full items-center justify-center gap-2 bg-purple-700 text-white hover:bg-purple-800"
            disabled={isLoading}
          >
            {isLoading && <CircleNotch className="mr-2 h-5 w-5 animate-spin" />}
            <span>Finalizar pedido no WhatsApp</span>
          </Button>

          <p className="text-xs text-purple-600">
            Ao continuar, você será redirecionado para uma conversa no WhatsApp com seu pedido
            montado. Nenhuma cobrança é feita pelo site.
          </p>
        </form>
      </Form>
    </motion.div>
  )
}
