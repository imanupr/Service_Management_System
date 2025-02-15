const Service = require('../models/Service'); // Import the service model

// Create a new service
exports.createService = async (req, res) => {
  try {
    const { name, description, price, category, duration, availability } = req.body;

    // Create a new service instance
    const newService = new Service({
      name,
      description,
      price,
      category,
      duration,
      availability
    });

    // Save the service to the database
    await newService.save();

    // Respond with the newly created service
    res.status(201).json({
      message: 'Service created successfully!',
      service: newService
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating the service' });
  }
};

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find(); // Retrieve all services from the database
    res.status(200).json(services); // Send services in the response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching services' });
  }
};

// Get a service by ID
exports.getServiceById = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const service = await Service.findById(serviceId); // Find the service by ID

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json(service); // Return the service found
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching the service' });
  }
};

// Update a service
exports.updateService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const { name, description, price, category, duration, availability } = req.body;

    // Find the service and update its details
    const updatedService = await Service.findByIdAndUpdate(serviceId, {
      name,
      description,
      price,
      category,
      duration,
      availability,
      updatedAt: Date.now() // Automatically update the 'updatedAt' timestamp
    }, { new: true });

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({
      message: 'Service updated successfully!',
      service: updatedService
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating the service' });
  }
};

// Delete a service
exports.deleteService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const deletedService = await Service.findByIdAndDelete(serviceId); // Find and delete the service

    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting the service' });
  }
};
