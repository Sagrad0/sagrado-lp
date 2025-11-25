import { CartItem } from './store/cart'
import { WHATSAPP_NUMBER } from './constants/kits'

export interface CheckoutData {
  nome: string
  telefone?: string
  cep: string
  rua: string
  numero: string
  bairro: string
  cidade: string
  uf: string
  referencia?: string
  pagamento: string
  observacoes?: string
}

export function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

export function generateWhatsAppLink(items: CartItem[], data: CheckoutData): string {
  let msg = '🍕 *Novo pedido Sagrado*\n\n'
  msg += '*Produtos:*\n'
  msg += items.map(item => `• ${item.qty}x ${item.name} – ${formatPrice(item.qty * item.price)}`).join('\n')
  msg += `\n\n*Subtotal:* ${formatPrice(getSubtotal(items))}\n\n`
  msg += `*Cliente:* ${data.nome}\n`
  if (data.telefone) {
    msg += `*Telefone:* ${data.telefone}\n`
  }
  msg += '\n'
  
  let enderecoCompleto = `*Endereço:* ${data.rua}, ${data.numero} - ${data.bairro} - ${data.cidade}/${data.uf}`
  if (data.cep) enderecoCompleto += ` – CEP ${data.cep}`
  msg += `${enderecoCompleto}\n`

  if (data.referencia) {
    msg += `*Referência:* ${data.referencia}\n\n`
  }

  msg += `*Forma de pagamento:* ${data.pagamento}\n`
  if (data.observacoes) {
    msg += `\n*Observações:* ${data.observacoes}\n`
  }
  msg += `\n🙏 Obrigado por escolher o Sagrado!`

  const encodedMsg = encodeURIComponent(msg)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`
}

export function getSubtotal(items: CartItem[]): number {
  return items.reduce((acc, item) => acc + item.price * item.qty, 0)
}