const Makler = require('../models/Makler');
const logger = require('../utils/logger');

exports.getAllMakler = async (req, res, next) => {
  try {
    const maklerList = await Makler.find();
    res.json(maklerList);
  } catch (error) {
    logger.error('Error fetching Makler list:', error);
    next(error);
  }
};

exports.getMaklerById = async (req, res, next) => {
  try {
    const makler = await Makler.findById(req.params.id);
    if (!makler) {
      return res.status(404).json({ error: 'Makler not found' });
    }
    res.json(makler);
  } catch (error) {
    logger.error('Error fetching Makler by ID:', error);
    next(error);
  }
};

exports.createMakler = async (req, res, next) => {
  try {
    const maklerData = req.body;
    const makler = new Makler(maklerData);
    await makler.save();
    res.status(201).json(makler);
  } catch (error) {
    logger.error('Error creating Makler:', error);
    next(error);
  }
};

exports.updateMakler = async (req, res, next) => {
  try {
    const maklerData = req.body;
    const makler = await Makler.findByIdAndUpdate(req.params.id, maklerData, { new: true });
    if (!makler) {
      return res.status(404).json({ error: 'Makler not found' });
    }
    res.json(makler);
  } catch (error) {
    logger.error('Error updating Makler:', error);
    next(error);
  }
};

exports.deleteMakler = async (req, res, next) => {
  try {
    const makler = await Makler.findByIdAndDelete(req.params.id);
    if (!makler) {
      return res.status(404).json({ error: 'Makler not found' });
    }
    res.json({ message: 'Makler deleted successfully' });
  } catch (error) {
    logger.error('Error deleting Makler:', error);
    next(error);
  }
};
