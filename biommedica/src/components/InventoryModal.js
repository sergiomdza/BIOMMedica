import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Modal from './Modal';
import { TextField } from '@mui/material';

const style = {

};



export default function InventoryModal({ open, handleClose, selectedData, onSave}) {

    const [localData, setlocalData] = useState(selectedData)

    const onChange = (field, value) => {
        setlocalData((localData) => ({ ...localData, [field]: value }))
    }

    useEffect(() => {
        setlocalData(selectedData)
      }, [selectedData])
    

    return (
        <Modal open={open} handleClose={handleClose} onSave={() => onSave(localData)}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                ID: {localData?._id || ""}
            </Typography>
            <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                onChange={(event) => onChange('name', event.target.value)}
                value={localData?.name || ""}
            />
        </Modal>
    );
}