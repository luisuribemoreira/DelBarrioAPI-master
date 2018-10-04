import express from 'express'
import fs from 'fs'
import PdfDocument from 'pdfkit'
import PdfTable from 'voilab-pdf-table'
import emailer from './emailer'

const app = express.Router()

function generatePDF (req, res) {
  try {
    let items = create(req.body.titles, req.body.items, req.body.type)
    let options = {
      to: req.body.user,
      subject: 'Reporte',
      text: 'Se ha adjuntado un PDF con el reporte pedido.',
      filename: items.fileName,
      path: 'public/'+items.fileURL
    }
    emailer.sendWithAttachment(options, req, res)
  } catch (err) {
    res.status(500).send({error: true, data: { message: 'Internal Error'}})
  }
}

function create (headers, data, type) {
  // Se crea documento PDF y su página inicial
  let pdf = new PdfDocument({
      autoFirstPage: false
  })
  pdf.addPage()
  let fileName = new Date().getTime()
  let fileURL = `reports/REPORTE_${fileName}.pdf`
  pdf.pipe(fs.createWriteStream('public/' + fileURL))

  if (type === 'valoracion' || type === 'visitas') {
    type === 'valoracion' ? pdf.fontSize(18).text('Productos Por Valoración') : pdf.fontSize(18).text('Productos Por Visitas')
    pdf.fontSize(12)
    generateViewValueReports(pdf, headers, data)
  }
  if (type === 'comentarios') {
    pdf.fontSize(18).text('Comentarios por Producto en el último mes')
    pdf.fontSize(12)
    pdf = generateCommentsReport(pdf, headers, data)
  }
  if (type === 'aprobadas' || type === 'rechazadas') {
    type === 'aprobadas' ?  pdf.fontSize(18).text('Publicaciones Aprobadas') : ''
    type === 'rechazadas' ?  pdf.fontSize(18).text('Publicaciones Rechazadas') : ''
    pdf.fontSize(12)
    generateApprovalReport(pdf, headers, data)
  }
  if (type === 'denuncias') {
    pdf.fontSize(18).text('Denuncias por Publicación')
    pdf.fontSize(12)
    pdf = generateDenouncesReport(pdf, headers, data)
  }

  pdf.end()
  return {
    pdf,
    fileName,
    fileURL
  }
}

function generateViewValueReports (pdf, headers, data) {
  let columns = []
  let body = []
  // Se crea la tabla principal
  let table = new PdfTable(pdf, {
      bottomMargin: 30
  });

  // Se asignan cabeceras para la tabla principal
  headers.forEach((header, index) =>{
    if (index === 1) columns.push({ id: 'a', header: header, width: 100, align: 'center'})
    if (index === 2) columns.push({ id: 'b', header: header, width: 300})
    if (index === 3) columns.push({ id: 'c', header: header, width: 80, align: 'center'})
    if (index === 4) columns.push({ id: 'd', header: header, width: 80})
    if (index === 5) columns.push({ id: 'e', header: header, width: 100})
  })

  // Se asignan los datos para las cabeceras de las columnas de la tabla principal
  table.addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))
  (
    {
      column: 'b'
    }
  )).setColumnsDefaults({
    headerBorder: 'B',
    align: 'left'
  }).addColumns(columns).onPageAdded(function (tb) {
    tb.addHeader();
  });

  // Se agregan los datos para la tabla principal al arreglo body
  data.forEach((item, index) => {
    if (index === 0) {
      body.push({'a': '-', 'b': '-', 'c': '-', 'd': '-', 'e': '-'})
    }
    body.push({
      'a': item[1].toString(),
      'b': item[2],
      'c': item[3].toString(),
      'd': item[4],
      'e': item[5]
    })
  })

  // Se agregan los datos a la tabla.
  table.addBody(body)
}

function generateCommentsReport (pdf, headers, data) {
  let columns = []
  let subColumns = []
  let headersSubTable = []
  let body = []
  let subTableBody = []

  // Se crea la tabla principal
  let table = new PdfTable(pdf, {
      bottomMargin: 30
  });

  // Se crea la sub tabla para los datos extra
  let subTable = new PdfTable(pdf, {
      bottomMargin: 30
  });
  // Se asignan los datos de cabecera para las columnas de la tabla principal
  // Y a su ves se asignan al arreglo de cabeceras de la sub tabla los valores correspondientes
  headers.forEach((header, index) =>{
    if (index === 1) { columns.push({ id: 'a', header: header, width: 100, align: 'center'}); headersSubTable.push(header) }
    if (index === 2) { columns.push({ id: 'b', header: header.split('/')[0].trim(), width: 300}); headersSubTable.push(header.split('/')[1].trim()) }
    if (index === 3) { columns.push({ id: 'c', header: header.split('/')[0].trim(), width: 100}); headersSubTable.push(header.split('/')[1].trim()) }
    if (index === 4) { columns.push({ id: 'd', header: header, width: 80}); headersSubTable.push(header) }
    if (index === 5) { columns.push({ id: 'e', header: header, width: 100}); headersSubTable.push(header) }
  })

  // Se asignan los datos para las cabeceras de las columnas de la tabla principal
  table.addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))
  (
    {
      column: 'b'
    }
  )).setColumnsDefaults({
    headerBorder: 'B',
    align: 'left'
  }).addColumns(columns).onPageAdded(function (tb) {
    tb.addHeader();
  });


  // Se asignan los datos de cabecera para las columnas de la sub tabla
  headersSubTable.forEach((header, index) => {
    if (index === 0) subColumns.push({ id: 'a', header: header, width: 100, align: 'center'})
    if (index === 1) subColumns.push({ id: 'b', header: header, width: 100})
    if (index === 2) subColumns.push({ id: 'c', header: header, width: 300})
    if (index === 3) subColumns.push({ id: 'd', header: header, width: 80})
    if (index === 4) subColumns.push({ id: 'e', header: header, width: 100})
  })

  // Se asignan las columnas a la sub tabla
  subTable.addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))
  (
    {
      column: 'c'
    }
  )).setColumnsDefaults({
    headerBorder: 'B',
    align: 'left'
  }).addColumns(subColumns).onPageAdded(function (tb) {
    tb.addHeader();
  });


  // Se agregan los datos para la tabla principal al arreglo body
  data.forEach((item, index) => {
    if (index === 0) {
      body.push({'a': '-', 'b': '-', 'c': '-', 'd': '-', 'e': '-'})
    }

    body.push({
      'a': item[1].toString(),
      'b': item[2],
      'c': item[3].toString(),
      'd': item[4],
      'e': item[5]
    })
  })

  // Se ingresan los datos para la sub tabla al arreglo subTableBody
  data.forEach((item, index) => {
    if (index === 0) {
      subTableBody.push({'a': '-', 'b': '-', 'c': '-', 'd': '-', 'e': '-'})
    }
    if (item[6] && item[6].length > 0) {
      item[6].forEach(val => {
        subTableBody.push({
          'a': item[1],
          'b': val[2],
          'c': val[3],
          'd': val[4],
          'e': val[5]
        })
      })
    }
  })
  // Se agregan los datos a la tabla principal y a la sub tabla
  table.addBody(body)
  pdf.addPage() // Se agrega una página extra al PDF
  pdf.fontSize(18).text('Comentarios De cada Publicación')
  pdf.fontSize(12)
  subTable.addBody(subTableBody)
  return pdf // Se retorna el PDF ya que se le agregó una nueva página
}

function generateApprovalReport (pdf, headers, data) {
  let columns = []
  let body = []
  // Se crea la tabla principal
  let table = new PdfTable(pdf, {
      bottomMargin: 30
  });

  // Se asignan cabeceras para la tabla principal
  headers.forEach((header, index) =>{
    if (index === 1) columns.push({ id: 'a', header: header, width: 100, align: 'center'})
    if (index === 2) columns.push({ id: 'b', header: header, width: 300})
    if (index === 3) columns.push({ id: 'c', header: header, width: 100})
  })
  // Se asignan los datos para las cabeceras de las columnas de la tabla principal
  table.addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))
  (
    {
      column: 'b'
    }
  )).setColumnsDefaults({
    headerBorder: 'B',
    align: 'left'
  }).addColumns(columns).onPageAdded(function (tb) {
    tb.addHeader();
  });

  // Se agregan los datos para la tabla principal al arreglo body
  data.forEach((item, index) => {
    if (index === 0) {
      body.push({'a': '-', 'b': '-', 'c': '-'})
    }
    body.push({
      'a': item[1].toString(),
      'b': item[2],
      'c': item[3]
    })
  })
  // Se agregan los datos a la tabla.
  table.addBody(body)
}

function generateDenouncesReport (pdf, headers, data) {
  let columns = []
  let subColumns = []
  let headersSubTable = []
  let body = []
  let subTableBody = []

  // Se crea la tabla principal
  let table = new PdfTable(pdf, {
      bottomMargin: 30
  });

  // Se crea la sub tabla para los datos extra
  let subTable = new PdfTable(pdf, {
      bottomMargin: 30
  });
  // Se asignan los datos de cabecera para las columnas de la tabla principal
  // Y a su ves se asignan al arreglo de cabeceras de la sub tabla los valores correspondientes
  headers.forEach((header, index) =>{
    if (index === 1) { columns.push({ id: 'a', header: header, width: 100, align: 'center'}); headersSubTable.push(header) }
    if (index === 2) { columns.push({ id: 'b', header: header, width: 300, align: 'center'}); headersSubTable.push(header) }
    if (index === 3) { columns.push({ id: 'c', header: header.split('/')[0].trim(), width: 100}); headersSubTable.push(header.split('/')[1].trim()) }
    if (index === 4) { columns.push({ id: 'd', header: header.split('/')[0].trim(), width: 80}); headersSubTable.push(header.split('/')[1].trim()) }
  })

  // Se asignan los datos para las cabeceras de las columnas de la tabla principal
  table.addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))
  (
    {
      column: 'b'
    }
  )).setColumnsDefaults({
    headerBorder: 'B',
    align: 'left'
  }).addColumns(columns).onPageAdded(function (tb) {
    tb.addHeader();
  });


  // Se asignan los datos de cabecera para las columnas de la sub tabla
  headersSubTable.forEach((header, index) => {
    if (index === 0) subColumns.push({ id: 'a', header: header, width: 80, align: 'center'})
    if (index === 1) subColumns.push({ id: 'b', header: header, width: 200, align: 'center'})
    if (index === 2) subColumns.push({ id: 'c', header: header, width: 300})
    if (index === 3) subColumns.push({ id: 'd', header: header, width: 100})
  })

  // Se asignan las columnas a la sub tabla
  subTable.addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))
  (
    {
      column: 'c'
    }
  )).setColumnsDefaults({
    headerBorder: 'B',
    align: 'left'
  }).addColumns(subColumns).onPageAdded(function (tb) {
    tb.addHeader();
  });


  // Se agregan los datos para la tabla principal al arreglo body
  data.forEach((item, index) => {
    if (index === 0) {
      body.push({'a': '-', 'b': '-', 'c': '-', 'd': '-'})
    }

    body.push({
      'a': item[1].toString(),
      'b': item[2],
      'c': item[3].toString(),
      'd': item[4]
    })
  })

  // Se ingresan los datos para la sub tabla al arreglo subTableBody
  data.forEach((item, index) => {
    if (index === 0) {
      subTableBody.push({'a': '-', 'b': '-', 'c': '-', 'd': '-'})
    }
    if (item[5] && item[5].length > 0) {
      item[5].forEach(val => {
        subTableBody.push({
          'a': item[1],
          'b': item[2],
          'c': val[4],
          'd': val[5]
        })
      })
    }
  })
  // Se agregan los datos a la tabla principal y a la sub tabla
  table.addBody(body)
  pdf.addPage() // Se agrega una página extra al PDF
  pdf.fontSize(18).text('Denunciante por Publicación')
  pdf.fontSize(12)
  subTable.addBody(subTableBody)
  return pdf // Se retorna el PDF ya que se le agregó una nueva página
}

app.route('/generate')
  .post((req, res) => generatePDF(req, res))

export default app
