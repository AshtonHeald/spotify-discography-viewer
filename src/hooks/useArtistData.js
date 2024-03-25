import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import useAccessToken from "./useAccessToken";

const useArtistData = (artistId) => {
  const accessToken = useAccessToken();
  const [artistData, setArtistData] = useState(null);
  const [topTracksData, setTopTracksData] = useState(null);
  const [albumsData, setAlbumsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const headers = useMemo(() => ({
    Authorization: `Bearer ${accessToken}`,
  }), [accessToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artistResponse, topTracksResponse] = await Promise.all([
          axios.get(`https://api.spotify.com/v1/artists/${artistId}`, { headers }),
          axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`, { headers }),
        ]);

        setArtistData(artistResponse.data);
        setTopTracksData(topTracksResponse.data);

        const allAlbums = [];
        let offset = 0;
        const limit = 50;
        let albumsResponse;

        do {
          albumsResponse = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&market=US&limit=${limit}&offset=${offset}`, { headers });
          allAlbums.push(...albumsResponse.data.items);
          offset += limit;
        } while (albumsResponse.data.items.length === limit);

        setAlbumsData({ ...albumsResponse.data, items: allAlbums });
      } catch (error) {
        setError(error);
        setArtistData(null);
        setTopTracksData(null);
        setAlbumsData(null);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchData();
    }
  }, [artistId, headers, accessToken]);

  return { artistData, topTracksData, albumsData, loading, error };
};

export default useArtistData;