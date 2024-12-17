import { Button, ButtonProps, SxProps } from '@mui/material';

interface ButtonPortalProps extends ButtonProps {
  sx?: SxProps;
}

function ButtonPortal({ children, sx, ...muiProps }: ButtonPortalProps) {
  return (
    <Button
      variant="text"
      sx={{
        marginBottom: '20px',
        width: '150px',
        height: '50px',
        backgroundImage: `url('/portal-rick-morty.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        color: '#fff',
        fontWeight: 'bold',
        textShadow: '2px 2px 3px rgba(0, 0, 0, 0.8)',
        borderRadius: '8px',
        ...sx,
      }}
      {...muiProps}
    >
      {children}
    </Button>
  );
}

export default ButtonPortal;
