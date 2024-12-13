import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { Character } from '../../../interfaces/Character';
import { Circle, LocationOn, Map, OndemandVideo } from '@mui/icons-material';
import { useNavigate } from 'react-router';

export default function CharacterCard({ character }: { character: Character }) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      width="100%"
      onClick={() => navigate(`/character-details/${character.id}`)}
    >
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
            boxShadow: '0 8px 20px rgba(102, 255, 102, 0.3)',
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
            alt={character.name}
            src={character.image}
          />
        </Box>
        <CardContent>
          <Tooltip title={character.name}>
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
              {character.name}
            </Typography>
          </Tooltip>
          <Box display="flex" alignItems="center" mt={2} mb={1}>
            <LocationOn
              sx={{
                fontSize: 16,
                mr: 1,
                color: theme.palette.text.secondary,
              }}
            />

            <Typography
              variant="body1"
              textAlign="center"
              color="text.secondary"
            >
              {character.location.name}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box display="flex" alignItems="center">
              <Circle
                sx={{
                  fontSize: 16,
                  mr: 1,
                  color: character.status === 'Alive' ? 'green' : 'red',
                }}
              />

              <Typography
                variant="body1"
                textAlign="center"
                color="text.secondary"
              >
                {character.status}
              </Typography>
            </Box>
            <Typography
              variant="body1"
              textAlign="center"
              color="text.secondary"
            >
              {character.species}
            </Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Box>
            <Tooltip title="Ver localização do personagem">
              <IconButton sx={{ color: theme.palette.primary.light, mr: 1 }}>
                <Map />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={`Ver episódios que ${
                character.name.split(' ')[0]
              } participou`}
            >
              <IconButton sx={{ color: theme.palette.primary.light }}>
                <OndemandVideo />
              </IconButton>
            </Tooltip>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
}
