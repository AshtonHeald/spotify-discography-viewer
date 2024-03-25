import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import useAccessToken from "./useAccessToken";

const useAlbumData = (albumId) => {
  const accessToken = useAccessToken();
  const [albumData, setAlbumData] = useState(null);
  const [trackData, setTrackData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const headers = useMemo(() => ({
    Authorization: `Bearer ${accessToken}`,
  }), [accessToken]);

  useEffect(() => {
    const fetchData = async () => {
      // Clear the old data and set loading to true before fetching new data
      setAlbumData(null);
      setTrackData(null);
      setLoading(true);
      setError(null);
  
      try {
        const albumResponse = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, { headers });
        setAlbumData(albumResponse.data);

        let offset = 0;
        let allTracks = [];
        let tracksResponse;

        do {
          tracksResponse = await axios.get(`https://api.spotify.com/v1/albums/${albumId}/tracks?limit=50&offset=${offset}`, { headers });
          allTracks = [...allTracks, ...tracksResponse.data.items];
          offset += 50;
        } while (tracksResponse.data.next);

        setTrackData({ ...tracksResponse.data, items: allTracks });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
  
    if (accessToken) {
      fetchData();
    }
  }, [albumId, headers, accessToken]);

  return { albumData, trackData, loading, error };
};

export default useAlbumData;