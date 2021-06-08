const Table = require('cli-table');


function renderData(headers, data, widths){
  const header = [...headers];
  const colWidths = [...widths]
  const tableData = [...data]
 
  const table = new Table({
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
    , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
    , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
    , 'right': '║' , 'right-mid': '╢' , 'middle': '│' } ,
    head: header,
    colWidths: colWidths,
  });
  
  table.push(tableData)
  console.log(table.toString())
}


// renderData(['nome','ano','id'], ["Resident evil 1 Director's cut ",'1998','2'],[40,10,10])

module.exports = renderData();