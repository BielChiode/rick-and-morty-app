import React, { useState, useMemo } from "react";
import {
  TextField,
  CircularProgress,
  List,
  ListItem,
  Typography,
  Container,
  Box,
  Pagination,
  Grid2,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import AppBarCustom from "../../components/AppBar";
import ButtonPortal from "../../components/ButtonPortal";
import useGetLocations from "../../api/hooks/useGetLocations";
import useGetCharactersByIds from "../../api/hooks/useGetCharactersByIds";
import { useNavigate } from "react-router";

const LocationList: React.FC = () => {
  const { locations, loading, error, setParams, info } = useGetLocations();
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const navigate = useNavigate();

  // Extrai IDs únicos dos 4 primeiros moradores de cada localização
  const characterIds = useMemo(() => {
    const ids =
      locations?.flatMap((loc) =>
        loc.residents.slice(0, 4).map((url) => Number(url.split("/").pop()))
      ) ?? [];
    return Array.from(new Set(ids));
  }, [locations]);

  const {
    charactersMap,
    loading: charsLoading,
    error: charsError,
  } = useGetCharactersByIds(characterIds);

  const handleSearch = () => {
    setParams({ name: search });
    setPage(1);
  };

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
    setParams(search ? { page: newPage, name: search } : { page: newPage });
  };

  return (
    <>
      <AppBarCustom />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <TextField
          label="Find a location"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
          <ButtonPortal onClick={handleSearch}>Search</ButtonPortal>
        </Box>

        <Typography variant="h2" textAlign="center" gutterBottom>
          Locations
        </Typography>

        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}

        {!loading && !error && (
          <>
            <List>
              {locations.map((location) => (
                <ListItem
                  onClick={() => navigate(`/location-details/${location.id}`)}
                  key={location.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    pb: 2,
                    borderBottom: "1px solid rgba(255,255,255,0.2)",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                      transform: "scale(1.02)",
                      borderRadius: "4px",
                      boxShadow: "0px 4px 10px rgba(255,255,255,0.2)",
                    },
                  }}
                >
                  <Grid2 container sx={{ width: "100%" }}>
                    <Grid2 size={{ xs: 12, md: 6 }} sx={{ pr: 2 }}>
                      <Typography variant="h6" fontWeight="bold">
                        {location.name}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Type:</strong> {location.type}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Dimension:</strong> {location.dimension}
                      </Typography>
                    </Grid2>
                    <Grid2
                      size={{ xs: 12, md: 6 }}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      {charsLoading ? (
                        <CircularProgress size={24} />
                      ) : charsError ? (
                        <Typography color="error">{charsError}</Typography>
                      ) : (
                        <AvatarGroup max={4}>
                          {location.residents.slice(0, 4).map((url) => {
                            const id = Number(url.split("/").pop());
                            const char = charactersMap[id];
                            return char ? (
                              <Avatar
                                key={id}
                                alt={char.name}
                                src={char.image}
                              />
                            ) : null;
                          })}
                        </AvatarGroup>
                      )}
                    </Grid2>
                  </Grid2>
                </ListItem>
              ))}
            </List>

            <Pagination
              count={info?.pages || 1}
              page={page}
              onChange={handlePageChange}
              color="primary"
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "center",
                "& .MuiPaginationItem-root": {
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.5)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                },
              }}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default LocationList;
