const { createWebModel, findWebModelByNamespace } = require('../dao/webModelDao.ts');

export const handleInitialization = async (req, res) => {
  try {
    const { namespace, URL, firstName, lastName, mobile, city, postalCode, streetAddress, country, region, about } =
      req.body;

    if (!namespace || !URL || !firstName || !lastName) {
      return res.status(400).json({ message: 'Required fields are missing.' });
    }

    // Check if the namespace already exists
    const existingRecord = await findWebModelByNamespace(namespace);
    if (existingRecord) {
      return res.status(400).json({ message: 'Namespace already exists.' });
    }

    // Create a new WebModel record using the DAO
    const webModel = await createWebModel({
      namespace,
      URL,
      'first-name': firstName,
      'last-name': lastName,
      mobile,
      city,
      'postal-code': postalCode,
      'street-address': streetAddress,
      country,
      region,
      about,
    });

    res.status(201).json({ message: 'Bot initialized successfully.', data: webModel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during bot initialization.', error: error.message });
  }
};
