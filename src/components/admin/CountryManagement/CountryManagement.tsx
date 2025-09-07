import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  IconButton,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import countryService from "../../../services/countryService";

interface Country {
  id?: number;
  name: string;
  countryCode: string;
}

interface CountryManagementProps {}

const CountryManagement: React.FC<CountryManagementProps> = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [formData, setFormData] = useState<Country>({
    name: "",
    countryCode: "",
  });
  const [errors, setErrors] = useState<{ name?: string; countryCode?: string }>(
    {}
  );
  const [alertMessage, setAlertMessage] = useState<{
    type: "success" | "error" | "info" | "warning";
    message: string;
  } | null>(null);

  const showAlert = (
    type: "success" | "error" | "info" | "warning",
    message: string
  ) => {
    setAlertMessage({ type, message });
    setTimeout(() => {
      setAlertMessage(null);
    }, 5000); // Hide alert after 5 seconds
  };

  const fetchCountries = async () => {
    try {
      const data = await countryService.getAllCountries();
      console.log(data);
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
      showAlert("error", "Failed to fetch countries.");
    }
  };

  const handleAddCountry = async (country: Country) => {
    try {
      await countryService.createCountry(country);
      showAlert("success", "Country added successfully!");
      await fetchCountries();
    } catch (error: any) {
      console.error("Error adding country:", error);
      showAlert(
        "error",
        error.response?.data?.message || "Failed to add country."
      );
    }
  };

  const handleUpdateCountry = async (country: Country) => {
    try {
      await countryService.updateCountry(country.id!, country);
      showAlert("success", "Country updated successfully!");
      await fetchCountries();
    } catch (error: any) {
      console.error("Error updating country:", error);
      showAlert(
        "error",
        error.response?.data?.message || "Failed to update country."
      );
    }
  };

  const handleDeleteCountry = async (id: number) => {
    try {
      await countryService.deleteCountry(id);
      showAlert("success", "Country deleted successfully!");
      await fetchCountries();
    } catch (error: any) {
      console.error("Error deleting country:", error);
      showAlert(
        "error",
        error.response?.data?.message || "Failed to delete country."
      );
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleOpenDialog = (country: Country | null = null) => {
    setCurrentCountry(country);
    if (country) {
      setFormData({ name: country.name, countryCode: country.countryCode });
    } else {
      setFormData({ name: "", countryCode: "" });
    }
    setErrors({}); // Clear previous errors
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentCountry(null);
    setFormData({ name: "", countryCode: "" });
    setErrors({}); // Clear errors on close
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors: { name?: string; countryCode?: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = "Country name is required";
    }
    if (!formData.countryCode.trim()) {
      newErrors.countryCode = "Country code is required";
    } else if (!/^[A-Z]{2}$/.test(formData.countryCode.trim())) {
      newErrors.countryCode =
        "Country code must be exactly 2 uppercase letters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    if (currentCountry) {
      await handleUpdateCountry({ ...currentCountry, ...formData });
    } else {
      await handleAddCountry(formData);
    }
    handleCloseDialog();
  };
  return (
    <Box sx={{ padding: 3, bgcolor: "var(--wildlife-bg-light)" }}>
      {alertMessage && (
        <Alert
          severity={alertMessage.type}
          sx={{ mb: 2, bgcolor: "var(--wildlife-bg-light)" }}
        >
          {alertMessage.message}
        </Alert>
      )}

      <h2 style={{ color: "var(--wildlife-primary-dark)" }}>
        Country Management
      </h2>

      <Button
        variant="contained"
        sx={{
          mb: 2,
          bgcolor: "var(--wildlife-primary)",
          color: "var(--wildlife-text-light)",
          "&:hover": { bgcolor: "var(--wildlife-primary-dark)" },
          boxShadow: "var(--wildlife-shadow)",
        }}
        onClick={() => handleOpenDialog()}
      >
        Add New Country
      </Button>

      <TableContainer
        component={Paper}
        sx={{ boxShadow: "var(--wildlife-shadow)" }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: "var(--wildlife-primary-light)" }}>
            <TableRow>
              <TableCell sx={{ color: "var(--wildlife-text-light)" }}>
                ID
              </TableCell>
              <TableCell sx={{ color: "var(--wildlife-text-light)" }}>
                Name
              </TableCell>
              <TableCell sx={{ color: "var(--wildlife-text-light)" }}>
                Code
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "var(--wildlife-text-light)" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ bgcolor: "var(--wildlife-bg-light)" }}>
            {countries.map((country) => (
              <TableRow
                key={country.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": {
                    bgcolor: "var(--wildlife-bg-forest) !important",
                    color: "var(--wildlife-text-light)",
                  },
                }}
              >
                <TableCell sx={{ color: "var(--wildlife-text-dark)" }}>
                  {country.id}
                </TableCell>
                <TableCell sx={{ color: "var(--wildlife-text-dark)" }}>
                  {country.name}
                </TableCell>
                <TableCell sx={{ color: "var(--wildlife-text-dark)" }}>
                  {country.countryCode}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => handleOpenDialog(country)}
                    sx={{ color: "var(--wildlife-accent-green)" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteCountry(country.id!)}
                    sx={{ color: "var(--wildlife-error)" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            bgcolor: "var(--wildlife-bg-light)",
            boxShadow: "var(--wildlife-shadow)",
            color: "var(--wildlife-text-dark)",
          },
        }}
      >
        <DialogTitle sx={{ color: "var(--wildlife-primary-dark)" }}>
          {currentCountry ? "Edit Country" : "Add New Country"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Country Name"
            type="text"
            fullWidth
            variant="standard"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name}
            sx={{
              "& .MuiInput-underline:after": {
                borderBottomColor: "var(--wildlife-primary)",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "var(--wildlife-primary)",
              },
            }}
          />
          <TextField
            margin="dense"
            label="Country Code"
            type="text"
            fullWidth
            variant="standard"
            name="countryCode"
            value={formData.countryCode}
            onChange={handleInputChange}
            error={!!errors.countryCode}
            helperText={errors.countryCode}
            sx={{
              "& .MuiInput-underline:after": {
                borderBottomColor: "var(--wildlife-primary)",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "var(--wildlife-primary)",
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            sx={{
              color: "var(--wildlife-secondary-dark)",
              "&:hover": { bgcolor: "var(--wildlife-bg-light)" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            sx={{
              bgcolor: "var(--wildlife-primary)",
              color: "var(--wildlife-text-light)",
              "&:hover": { bgcolor: "var(--wildlife-primary-dark)" },
            }}
          >
            {currentCountry ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CountryManagement;
