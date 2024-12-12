import React, { useState } from 'react';
import {
  TextField,
  Button,
  CircularProgress,
  List,
  ListItem,
  Avatar,
  Typography,
  Container,
  Card,
  CardContent,
  Box,
  Grid2,
  Pagination,
  CardActions,
  Tooltip,
  useTheme,
} from '@mui/material';
import useCharacters from '../api/hooks/useCharacters';

const CharacterList: React.FC = () => {
  const { characters, loading, error, setParams, info } = useCharacters();
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const handleSearch = () => {
    setParams({ name: search });
    setPage(1); // Reset page to 1 on new search
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);

    // Se o nome de busca existir, adiciona ele aos parâmetros, senão apenas altera a página
    const params = search ? { page: newPage, name: search } : { page: newPage };
    setParams(params);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Rick and Morty Characters
      </Typography>

      {/* Campo de busca */}
      <TextField
        label="Search Character"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        style={{ marginBottom: '20px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        style={{ marginBottom: '20px' }}
      >
        Search
      </Button>

      {/* Exibindo loading */}
      {loading && <CircularProgress />}

      {/* Exibindo erro */}
      {error && <Typography color="error">{error}</Typography>}

      {/* Exibindo a lista de personagens */}
      {!loading && !error && (
        <>
          <List>
            <Grid2 container spacing={2}>
              {characters.map((character) => (
                <Grid2 key={character.id} size={{ xs: 12, sm: 4 }}>
                  <ListItem>
                    <CharacterCard
                      name={character.name}
                      image={character.image}
                      species={character.species}
                    />
                  </ListItem>
                </Grid2>
              ))}
            </Grid2>
          </List>

          {/* Paginação */}
          <Pagination
            count={info?.pages || 1}
            page={page}
            onChange={handlePageChange}
            color="primary"
            style={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'center',
            }}
          />
        </>
      )}
    </Container>
  );
};

function CharacterCard({
  name,
  image,
  species,
}: {
  name: string;
  image: string;
  species: string;
}) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        width: '100%',
        background: `linear-gradient(135deg, #1e1e2f, #3f3f5a)`,
        color: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.8)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.9)',
          cursor: 'pointer',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Avatar
          sx={{
            width: '150px',
            height: 'auto',
            my: 2,
            border: '2px solid #ffffff',
            boxShadow: '0 0 10px #ffffff',
          }}
          alt={name}
          src={image}
        />
      </Box>
      <CardContent>
        <Tooltip title={name}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
              textAlign: 'center',
              color: '#ffffff',
              fontWeight: 'bold',
            }}
          >
            {name}
          </Typography>
        </Tooltip>
        <Typography variant="body2" textAlign="center" color="text.secondary">
          {species}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button size="small" sx={{ color: theme.palette.primary.dark }}>
          Detalhes
        </Button>
      </CardActions>
    </Card>
  );
}

export default CharacterList;