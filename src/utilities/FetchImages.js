import React, { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';

const FetchImages = () => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const folderPath = 'images/';
      const { data, error } = await supabase.storage.from('Evaluation-Project-Bucket').list(folderPath);

      if (error) {
        console.error('Error fetching images:', error.message);
      } else {
        const urls = data.map((file) => {
          return supabase.storage.from('Evaluation-Project-Bucket').getPublicUrl(file.name);
        });

        setImageUrls(urls);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h2>Image Gallery</h2>
      <div>
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Image ${index}`}
            style={{ width: '100px', height: '100px', marginRight: '10px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default FetchImages;
