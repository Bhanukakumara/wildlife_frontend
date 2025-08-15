import MuiButton from '@mui/material/Button';

interface CustomButtonProps {
  text: string;
  style?: React.CSSProperties; // Accept style prop as optional
}

const CustomButton = ({text, style}: CustomButtonProps) => {
  return (
    <MuiButton variant="contained" style={style}>{text}</MuiButton>
  )
}

export default CustomButton