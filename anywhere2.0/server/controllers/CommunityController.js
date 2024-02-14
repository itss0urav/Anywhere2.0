const Community = require("../models/Community");
const Post = require("../models/Post");
const CommunityController = {
  createCommunity: async (req, res) => {
    const { communityName, logoUrl, isNSFW } = req.body;

    try {
      const existingCommunity = await Community.findOne({ communityName });
      if (existingCommunity) {
        console.log(`Community with name ${communityName} already exists.`);
        return res.status(400).json({ message: "Community already exists" });
      }

      const community = new Community({
        communityName,
        logoUrl,
        isNSFW,
      });

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

  getCommunities: async (req, res) => {
    try {
      const communities = await Community.find({});
      console.log(`Fetched ${communities.length} communities.`);
      res.status(200).json(communities);
    } catch (error) {
      console.error(`Error fetching communities: ${error}`);
      res.status(500).json({ message: "Server error" });
    }
  },
  getPostsByCommunity: async (req, res) => {
    try {
      console.log("Fetching posts for community:", req.params.communityName);
      const posts = await Post.find({
        community: req.params.communityName,
      });
      console.log("Posts fetched successfully:", posts);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts by community:", error);
      res.status(500).json({ error: "Failed to fetch posts by community" });
    }
  },
};

module.exports = CommunityController;
