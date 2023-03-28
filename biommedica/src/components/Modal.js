import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';    
import DialogTitle from '@mui/material/DialogTitle';

export default function BasicModal({ open, handleClose, onSave, children}) {

    const guardar = () => {
        onSave();
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Objecto Inventario</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={guardar} variant="contained">Guardar</Button>
                <Button onClick={handleClose} color="error" >Cancelar</Button>
            </DialogActions>
        </Dialog>
    );
}