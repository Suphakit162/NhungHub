// ก๊อปปี้
exports.startStream = (req, res) => {
  // ตัวอย่าง: สร้างลิงก์ชั่วคราวสำหรับดูหนัง
  const { movieId } = req.body;
  if (!movieId) {
    return res.status(400).json({ error: 'movieId is required' });
  }

  // สมมติสร้าง tokenized link
  const streamUrl = `https://example.com/stream/${movieId}?token=abc123`;
  res.json({ streamUrl });
};

exports.saveProgress = (req, res) => {
  const { movieId, progress } = req.body;
  if (!movieId || progress === undefined) {
    return res.status(400).json({ error: 'movieId and progress are required' });
  }

  // TODO: บันทึก progress ลง DB
  res.json({ message: 'Progress saved', movieId, progress });
};

exports.getContinueWatching = (req, res) => {
  // TODO: ดึงรายการหนังที่ user ดูค้างอยู่
  const continueWatching = [
    { movieId: 1, title: 'Inception', progress: 45 },
    { movieId: 2, title: 'Titanic', progress: 80 }
  ];
  res.json({ continueWatching });
};
