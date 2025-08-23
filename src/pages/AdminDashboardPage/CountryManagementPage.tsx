import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import countryService from '../../services/countryService';

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
  const [formData, setFormData] = useState<Country>({ name: '', countryCode: '' });
  const [errors, setErrors] = useState<{ name?: string; countryCode?: string }>({});
  const [alertMessage, setAlertMessage] = useState<{ type: 'success' | 'error' | 'info' | 'warning'; message: string } | null>(null);

  const showAlert = (type: 'success' | 'error' | 'info' | 'warning', message: string) => {
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
      showAlert('error', 'Failed to fetch countries.');
    }
  };

  const handleAddCountry = async (country: Country) => {
    try {
      await countryService.createCountry(country);
      showAlert('success', 'Country added successfully!');
      await fetchCountries();
    } catch (error: any) {
      console.error("Error adding country:", error);
      showAlert('error', error.response?.data?.message || 'Failed to add country.');
    }
  };
 const handleUpdateCountry = async (country: Country) => {
    try {
      await countryService.updateCountry(country.id!, country);
      showAlert('success', 'Country updated successfully!');
      await fetchCountries();
    } catch (error: any) {
      console.error("Error updating country:", error);
      showAlert('error', error.response?.data?.message || 'Failed to update country.');
    }
  };

  const handleDeleteCountry = async (id: number) => {
    try {
      await countryService.deleteCountry(id);
      showAlert('success', 'Country deleted successfully!');
      await fetchCountries();
    } catch (error: any) {
      console.error("Error deleting country:", error);
      showAlert('error', error.response?.data?.message || 'Failed to delete country.');
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
      setFormData({ name: '', countryCode: '' });
    }
    setErrors({}); // Clear previous errors
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentCountry(null);
    setFormData({ name: '', countryCode: '' });
    setErrors({}); // Clear errors on close
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors: { name?: string; countryCode?: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Country name is required';
    }
    if (!formData.countryCode.trim()) {
      newErrors.countryCode = 'Country code is required';
    } else if (!/^[A-Z]{2}$/.test(formData.countryCode.trim())) {
      newErrors.countryCode = 'Country code must be exactly 2 uppercase letters.';
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

  const handleDelete = (id?: number) => {
    // Confirmation dialog could be added here
    if (id !== undefined) {
      handleDeleteCountry(id);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      {alertMessage && (
        <Alert severity={alertMessage.type} sx={{ mb: 2 }}>{alertMessage.message}</Alert>
      )}

      <h2>Country Management</h2>
      <Button variant="contained" sx={{ mb: 2 }} onClick={() => handleOpenDialog()}>
        Add New Country
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Code</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countries.map((country) => (
              <TableRow key={country.id}>
                <TableCell>{country.id}</TableCell>
                <TableCell>{country.name}</TableCell>
                <TableCell>{country.countryCode}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenDialog(country)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteCountry(country.id!)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{currentCountry ? 'Edit Country' : 'Add New Country'}</DialogTitle>
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit}>{currentCountry ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CountryManagement;