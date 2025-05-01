import express, { Request, Response, Router } from "express";
import { Progress } from "../models/Progress";

const router: Router = express.Router();

router.get(
  "/:userId/:videoId",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, videoId } = req.params;
      if (!userId || !videoId) {
        res.status(400).json({ error: "All fields are required" });
        return;
      }
      const data = await Progress.findOne({ userId, videoId });
      res.json(data);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Error getting User Progress", details: err });
    }
  }
);

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, videoId, intervals, lastPosition, percentage } = req.body;
    if (!userId || !videoId || !intervals || lastPosition == null) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }
    const updated = await Progress.findOneAndUpdate(
      { userId, videoId },
      { intervals, lastPosition, percentage },
      { upsert: true, new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error saving User Progress", details: err });
  }
});

export default router;
