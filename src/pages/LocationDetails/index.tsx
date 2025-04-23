import React, { useState, useEffect, useMemo, useRef } from "react";
import apiClient from "../../api/apiClient";
import useGetCharactersByIds from "../../api/hooks/useGetCharactersByIds";
import type { Location } from "../../interfaces/Location";
import {
  Box,
  CircularProgress,
  Avatar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
  useTheme,
  alpha,
  Grid2,
} from "@mui/material";
import { useParams } from "react-router";
import AppBarCustom from "../../components/AppBar";

const PAGE_SIZE = 20;

const LocationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();

  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Busca os dados da localização pelo ID
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    apiClient
      .get<Location>(`/location/${id}`)
      .then((res) => setLocation(res.data))
      .catch((err) => setError(err.message || "Erro ao carregar localização"))
      .finally(() => setLoading(false));
  }, [id]);

  // IDs de todos os moradores
  const residentsIds = useMemo(
    () => location?.residents.map((url) => Number(url.split("/").pop())) ?? [],
    [location]
  );

  // Controle de quantos carregar por vez (infinite scroll)
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const visibleIds = useMemo(
    () => residentsIds.slice(0, displayCount),
    [residentsIds, displayCount]
  );

  const {
    charactersMap,
    loading: charsLoading,
    error: charsError,
  } = useGetCharactersByIds(visibleIds);

  // Infinite scroll: amplia displayCount ao chegar no final
  const bottomRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    const el = bottomRef.current;
    if (!el) return;
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && displayCount < residentsIds.length) {
        setDisplayCount((prev) =>
          Math.min(prev + PAGE_SIZE, residentsIds.length)
        );
      }
    });
    observerRef.current.observe(el);
    return () => observerRef.current?.disconnect();
  }, [displayCount, residentsIds]);

  // Diálogo de detalhes do personagem
  const [selectedCharId, setSelectedCharId] = useState<number | null>(null);
  const selectedChar =
    selectedCharId != null ? charactersMap[selectedCharId] : null;

  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (error || charsError)
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 4 }}>
        {error}
      </Typography>
    );

  return (
    <>
      <AppBarCustom />
      <Box
        sx={{
          p: 4,
          backdropFilter: "blur(10px)",
          borderRadius: 2,
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          sx={{ mb: 4, color: theme.palette.text.primary }}
        >
          {location?.name}
        </Typography>

        <Grid2 container spacing={2}>
          {visibleIds.map((charId) => {
            const char = charactersMap[charId];
            return (
              <Grid2 size={{ xs: 4, sm: 3, md: 2 }} key={charId}>
                {char ? (
                  <Tooltip
                    title={`${char.name} - ${char.status}`}
                    placement="top"
                  >
                    <Avatar
                      src={char.image}
                      alt={char.name}
                      sx={{
                        width: 80,
                        height: 80,
                        cursor: "pointer",
                        border: `2px solid ${theme.palette.secondary.main}`,
                        transition: "transform 0.2s",
                        "&:hover": { transform: "scale(1.1)" },
                      }}
                      onClick={() => setSelectedCharId(charId)}
                    />
                  </Tooltip>
                ) : (
                  <Box sx={{ textAlign: "center" }}>
                    <CircularProgress size={40} />
                  </Box>
                )}
              </Grid2>
            );
          })}
        </Grid2>

        {charsLoading && (
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Elemento para disparar o infinite scroll */}
        <div ref={bottomRef} />

        {/* Modal com detalhes do personagem */}
        <Dialog
          open={!!selectedChar}
          onClose={() => setSelectedCharId(null)}
          PaperProps={{
            sx: {
              backgroundColor: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: "blur(20px)",
              borderRadius: 3,
            },
          }}
        >
          {selectedChar && (
            <>
              <DialogTitle>{selectedChar.name}</DialogTitle>
              <DialogContent sx={{ textAlign: "center" }}>
                <Avatar
                  src={selectedChar.image}
                  alt={selectedChar.name}
                  sx={{ width: 200, height: 200, mb: 2 }}
                />
                <Typography>
                  <strong>Status:</strong> {selectedChar.status}
                </Typography>
                <Typography>
                  <strong>Species:</strong> {selectedChar.species}
                </Typography>
                <Typography>
                  <strong>Gender:</strong> {selectedChar.gender}
                </Typography>
              </DialogContent>
            </>
          )}
        </Dialog>
      </Box>
    </>
  );
};

export default LocationDetails;
