const Community = require("../models/Community");

const CommunityController = {
  createCommunity: async (req, res) => {
    const { communityName, logoUrl, isNSFW } = req.body;

    try {
      // Check if a community with the same name already exists
      const existingCommunity = await Community.findOne({ communityName });
      if (existingCommunity) {
        console.log(`Community with name ${communityName} already exists.`);
        return res.status(400).json({ message: "Community already exists" });
      }

      // Create a new community
      const community = new Community({
        communityName,
        logoUrl,
        isNSFW,
      });

      // Save the community to the database
      const savedCommunity = await community.save();
      console.log(
        `Community ${savedCommunity.communityName} created successfully.`
      );
      res.status(201).json(savedCommunity);
    } catch (error) {
      console.error(`Error creating community: ${error}`);
      res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = CommunityController;
