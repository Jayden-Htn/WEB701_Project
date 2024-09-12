// Get config
const getConfig = async (req, res) => {
    try {
        const result = "Getting token config"
        res.send(result).status(200);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update config
const updateConfig = async (req, res) => {
    try {
        const result = "Updating token config"
        res.send(result).status(200);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export default {
    getConfig,
    updateConfig
};