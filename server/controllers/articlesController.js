const Articles = require("../models/articlesModel");

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Articles.find();
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: articles.length,
      data: {
        articles: articles,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "No Articles found",
      message: err,
    });
  }
};

exports.getArticle = async (req, res) => {
  console.log(req.params,'params');
  console.log(req.requestTime);
  const id = req.params.id;
  try {
    const article = await Articles.findById(id);
    res.status(200).json({
      status:"success",
      requestedAt: req.requestTime,
      results: article.length,
      data: {
        articles: article,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed!",
      message: [err, "Article not found"],
    });
  }
};

exports.createArticle = async (req, res) => {
  try {
    const newArticle = await Articles.create(req.body);
    res.status(201).json({
      status: "success",
      message: "data created sussessfully!",
      data: {
        articles: newArticle,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: [err, "invalid Article send"],
    });
  }
};

exports.updateArticle = async (req, res) => {
  const id = req.params.id;
  try {
    const article = await Articles.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      message: "data updated sussessfully!",
      data: {
        article,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: [err, "oops something wrong happened! while update"],
    });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    await Articles.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      message: "data deleted successfully!",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: [err, "oops something wrong happened! while delete"],
    });
  }
};
