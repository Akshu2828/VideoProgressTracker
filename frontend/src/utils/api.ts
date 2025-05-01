export const getProgress = async (userId: string, videoId: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_WEB_URL}/api/progress/${userId}/${videoId}`
  );
  return res.json();
};

export const saveProgress = async (data: {
  userId: string;
  videoId: string;
  intervals: [number, number][];
  lastPosition: number;
  percentage: number;
}) => {
  await fetch(`${import.meta.env.VITE_WEB_URL}/api/progress`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};
