/* global describe, it */
'use strict'

import { expect } from 'chai'
import axios from 'axios' 

describe('Consumir  /api/persona/2',() =>{
  it('GET: Obtener datos Persona', done => { 
    axios({
      method: 'GET',
      url: 'http://localhost:3000/api/persona/2'
    }).then(res => {
      expect(res.data[0].per_id).to.equal(2)
      done()
    })
  })

  it('POST: Crear una nueva Persona', done => { 
    axios({
      method: 'POST',
      url: 'http://localhost:3000/api/persona/2'
    }).then(res => {
      expect(res.data[0].message).to.equal('POST: Inserta una Persona')
      done()
    })
  })
})

describe('Ejemplos:',() =>{
  it('Se espera que Retorne 3',() => {
    const suma = 1+5
    const resultado = 6
    expect(suma).to.equal(resultado)
  })

  it('Se espera que Retorne 6',() => {
    const suma = 1+5
    const resultado = 6
    expect(suma).to.equal(resultado)
  })
})
