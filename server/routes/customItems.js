import express from 'express'
import {
  getCustomItems,
  getCustomItemById,
  createCustomItem,
  updateCustomItem,
  deleteCustomItem
} from '../controllers/customItems.js'

const router = express.Router()

router.get('/', async (_req, res) => {
  try {
    const items = await getCustomItems()
    res.json(items)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch custom items' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const item = await getCustomItemById(req.params.id)

    if (!item) {
      return res.status(404).json({ error: 'Custom item not found' })
    }

    res.json(item)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch custom item' })
  }
})

router.post('/', async (req, res) => {
  try {
    const item = await createCustomItem(req.body)
    res.status(201).json(item)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create custom item' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const item = await updateCustomItem(req.params.id, req.body)

    if (!item) {
      return res.status(404).json({ error: 'Custom item not found' })
    }

    res.json(item)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update custom item' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const item = await deleteCustomItem(req.params.id)

    if (!item) {
      return res.status(404).json({ error: 'Custom item not found' })
    }

    res.json({ message: 'Custom item deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to delete custom item' })
  }
})

export default router
