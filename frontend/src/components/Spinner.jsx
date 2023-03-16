import { Backdrop, CircularProgress, Stack, Typography } from "@mui/material";

function Spinner() {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        // open={isLoading}
      >
        <Stack gap={1} justifyContent="center" alignItems="center">
          <CircularProgress color="inherit" />
          <Typography>Loading...</Typography>
        </Stack>
      </Backdrop>
    </div>
  );
}

export default Spinner;
