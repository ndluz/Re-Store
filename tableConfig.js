const tableMainConfig = {
  chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
  , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
  , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
  , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
  
  head:['Name', 'Year','Price','ID'],
  colWidths: [30,10,15,10]
}

const tablePaymentConfig = {
  chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
  , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
  , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
  , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
  
  head:['Name', 'Price'],
  colWidths: [30,20]
}

const totalPriceTableConfig = {
  chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
  , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
  , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
  , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
  
  head:['Total Price'],
  colWidths: [20]
}

module.exports = {tableMainConfig, tablePaymentConfig, totalPriceTableConfig } ;