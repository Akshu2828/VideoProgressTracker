import { useRef, useState, useEffect } from "react";
import { getProgress, saveProgress } from "../utils/api";

type Interval = [number, number];

export const useVideoTracker = (
  videoRef: React.RefObject<HTMLVideoElement>,
  userId: string,
  videoId: string
) => {
  const [watchedIntervals, setWatchedIntervals] = useState<Interval[]>([]);
  const [progress, setProgress] = useState<number>(0);

  const lastTimeRef = useRef<number>(0);
  const updateIntervalRef = useRef<number | null>(null);
  const watchedRef = useRef<Interval[]>([]);

  const mergeIntervals = (intervals: Interval[]): Interval[] => {
    if (intervals.length === 0) return [];
    const sorted = intervals.sort((a, b) => a[0] - b[0]);
    const merged: Interval[] = [sorted[0]];

    for (let i = 1; i < sorted.length; i++) {
      const prev = merged[merged.length - 1];
      const curr = sorted[i];

      if (curr[0] <= prev[1]) {
        prev[1] = Math.max(prev[1], curr[1]);
      } else {
        merged.push(curr);
      }
    }

    return merged;
  };

  useEffect(() => {
    const load = async () => {
      const data = await getProgress(userId, videoId);
      if (data) {
        setProgress(data.percentage);
        if (videoRef.current) videoRef.current.currentTime = data.lastPosition;

        const merged = mergeIntervals(data.intervals);
        watchedRef.current = merged;
        setWatchedIntervals(merged);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const lastTime = lastTimeRef.current;

      const diff = currentTime - lastTime;
      if (Math.abs(diff) < 1) return;

      const newInterval: Interval = [
        Math.min(currentTime, lastTime),
        Math.max(currentTime, lastTime),
      ];

      const updated = mergeIntervals([...watchedRef.current, newInterval]);
      watchedRef.current = updated;
      setWatchedIntervals(updated);
      lastTimeRef.current = currentTime;

      const totalWatched = updated.reduce(
        (sum, [start, end]) => sum + (end - start),
        0
      );

      if (video.duration && video.duration > 0) {
        setProgress((totalWatched / video.duration) * 100);
      }
    };

    const handleSeeked = () => {
      lastTimeRef.current = video.currentTime;
    };

    const handlePause = () => {
      saveProgress({
        userId,
        videoId,
        intervals: watchedRef.current,
        lastPosition: video.currentTime,
        percentage: progress,
      });
    };

    updateIntervalRef.current = window.setInterval(handleTimeUpdate, 1000);
    video.addEventListener("seeked", handleSeeked);
    video.addEventListener("pause", handlePause);

    return () => {
      if (updateIntervalRef.current) clearInterval(updateIntervalRef.current);
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("pause", handlePause);
    };
  }, [videoRef, progress]);

  return { progress };
};
