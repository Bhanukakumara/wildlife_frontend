import { Breadcrumbs, Link, Typography } from "@mui/material";

const Breadcrumb = () => {
  return (
    <div className="py-4">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/gallery"
        >
          Gallery
        </Link>
        <Typography sx={{ color: "text.primary" }}>Photo Details</Typography>
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
