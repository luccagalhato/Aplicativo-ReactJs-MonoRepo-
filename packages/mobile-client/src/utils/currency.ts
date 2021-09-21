import { Platform } from 'react-native'
import { MaskService } from 'react-native-masked-text'

if (Platform.OS === 'android') {
  require('intl')
  require('intl/locale-data/jsonp/pt-BR')
}

export function toCurrency(value: any) {
  return MaskService.toMask(
    'money',
    new Intl.NumberFormat('pt-BR', {
      style: 'decimal',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value),
    {
      unit: 'R$ ',
      separator: ',',
      delimiter: '.'
    }
  )
}
