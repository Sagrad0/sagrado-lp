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
  telefone: z.string().optional(),
  cep: z.string().min(8, 'CEP inválido').max(9, 'CEP inválido'),
  rua: z.string().min(3, 'Endereço é obrigatório'),
  numero: z.string().min(1, 'Número é obrigatório'),
  bairro: z.string().min(3, 'Bairro é obrigatório'),
  cidade: z.string().min(3, 'Cidade é obrigatória'),
  uf: z.string().min(2, 'UF inválida').max(2, 'UF inválida'),
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
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      uf: '',
      referencia: '',
      pagamento: '',
      observacoes: '',
    },
  })

  const onSubmit = async (data: FormValues) => {
    const items = getItems()
    if (items.length === 0) {
      toast.error('❌ Carrinho vazio', {
        description: 'Adicione itens antes de finalizar',
      })
      return
    }

    setIsLoading(true)
    
    try {
      const link = generateWhatsAppLink(items, data)
      
      toast.success('📱 Abrindo WhatsApp...', {
        description: 'Aguarde um momento',
      })
      
      window.location.href = link
      
      setTimeout(() => {
        clearCart()
        onSuccess?.()
      }, 2000)
      
    } catch (error) {
      toast.error('❌ Erro', {
        description: 'Tente novamente',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const buscarCEP = async (cep: string) => {
    if (cep.replace(/\D/g, '').length !== 8) return
    
    setIsCepLoading(true)
    
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await res.json()
      
      if (!data.erro) {
        form.setValue('rua', data.logradouro || '')
        form.setValue('bairro', data.bairro || '')
        form.setValue('cidade', data.localidade || '')
        form.setValue('uf', data.uf || '')
        
        toast.success('✅ CEP encontrado!', {
          description: 'Endereço preenchido automaticamente',
        })
      } else {
        toast.error('❌ CEP não encontrado', {
          description: 'Verifique o CEP digitado ou preencha manualmente',
        })
      }
    } catch (error) {
      toast.error('❌ Erro ao buscar CEP', {
        description: 'Verifique sua conexão e tente novamente',
      })
    } finally {
      setIsCepLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome completo *</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome completo" {...field} />
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
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input placeholder="(00) 00000-0000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="cep"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CEP *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      placeholder="00000-000" 
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        if (e.target.value.length === 9) {
                          buscarCEP(e.target.value)
                        }
                      }}
                      disabled={isCepLoading}
                      className={isCepLoading ? 'pr-10' : ''}
                    />
                    {isCepLoading && (
                      <CircleNotch className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-purple-600" />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_100px]">
          <FormField
            control={form.control}
            name="rua"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rua *</FormLabel>
                <FormControl>
                  <Input placeholder="Nome da rua" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="numero"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número *</FormLabel>
                <FormControl>
                  <Input placeholder="Nº" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="bairro"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bairro *</FormLabel>
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
                <FormLabel>Cidade *</FormLabel>
                <FormControl>
                  <Input placeholder="Sua cidade" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="uf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado *</FormLabel>
                <FormControl>
                  <Input placeholder="UF" maxLength={2} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="referencia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Referência</FormLabel>
                <FormControl>
                  <Input placeholder="Ponto de referência" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="pagamento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Forma de pagamento *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PIX">PIX</SelectItem>
                  <SelectItem value="Crédito">Cartão de crédito</SelectItem>
                  <SelectItem value="Débito">Cartão de débito</SelectItem>
                  <SelectItem value="Dinheiro">Dinheiro</SelectItem>
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
              <FormLabel>Observações</FormLabel>
              <FormControl>
                <textarea 
                  placeholder="Alguma observação sobre seu pedido?"
                  className="min-h-[80px] w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            type="submit" 
            className="w-full h-12 text-base font-semibold"
            disabled={isLoading}
          >
            {isLoading && <CircleNotch className="mr-2 h-5 w-5 animate-spin" />}
            <span className="flex items-center gap-2">
              Finalizar pedido no WhatsApp
            </span>
          </Button>
        </motion.div>
      </form>
    </Form>
  )
}