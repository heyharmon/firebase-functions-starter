const get = async (req, res) => {
    const name = req.query.name

    res.status(200).json({
        data: name ? 'Hello ' + name : 'Hello world'
    })
};

module.exports = {
  get
};
