import Feature from "../../models/Feature.js";

export const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;
    const featureImages = new Feature({
      image,
    });

    await featureImages.save();
    return res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (error) {
    console.log("Error in addFeatureImage function", error);
    return res.status(500).json({
      success: false,
      error: "Some error occurred",
    });
  }
};

export const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({});
    return res.status(200).json({
      success: true,
      data: images,
    });
  } catch (error) {
    console.log("Error in getFeatureImages function", error);
    return res.status(500).json({
      success: false,
      error: "Some error occurred",
    });
  }
};
