const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

router.get('/new', (req, res) => {
    return res.render('new')
})

router.post('/', (req, res) => {
    const userId = req.user._id
    const { name, date, categoryId, amount } = req.body
    return Record.create({ name, date, categoryId, amount, userId })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id

    return Record.findOne({ _id, userId })
        .lean()
        .then(record => res.render('detail', { record }))
        .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id

    return Record.findOne({ _id, userId })
        .lean()
        .then(record => res.render('edit', { record }))
        .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    const { name, date, categoryId, amount } = req.body
    return Record.findOne({ _id, userId })
        .then(record => {
            record.name = name
            record.date = date
            record.categoryId = categoryId
            record.amount = amount
            return record.save()
        })
        .then(() => res.redirect(`/records/${_id}`))
        .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
    const userId = req.user._id
    const _id = req.params.id

    return Record.findOne({ _id, userId })
        .then(record => record.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

module.exports = router