import { useParams } from 'react-router';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import useCharacterDetails from '../../api/hooks/useCharacterDetails';

function CharacterDetails() {
  const { id = '' } = useParams<{ id: string }>();
  const { character, loading, error } = useCharacterDetails(id);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Alert severity="error">Erro: {error}</Alert>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      {character ? (
        <Card sx={{ maxWidth: 400 }}>
          <CardMedia
            component="img"
            height="300"
            image={character.image}
            alt={character.name}
          />
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {character.name}
            </Typography>
            <Typography variant="body1">Status: {character.status}</Typography>
            <Typography variant="body1">
              Espécie: {character.species}
            </Typography>
            <Typography variant="body1">Gênero: {character.gender}</Typography>
            <Typography variant="body1">
              Origem: {character.origin?.name}
            </Typography>
            <Typography variant="body1">
              Localização Atual: {character.location?.name}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Alert severity="info">Personagem não encontrado</Alert>
      )}
    </Box>
  );
}

export default CharacterDetails;
