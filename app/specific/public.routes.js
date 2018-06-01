import express from 'express'
import search from './public/search_posts'
import index from './public/index'

const app = express.Router()

app.route('/search')
  .get   ((req,res) => search.GET(req, res))

app.route('/index')
  .get   ((req,res) => index.GET(req, res))

export default app
